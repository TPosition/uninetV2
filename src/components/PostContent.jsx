import { Container, Row, Col, Card, Button, Modal, Form, Carousel, Table } from 'react-bootstrap'
import Head from 'next/head'
import { Plus } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router'

export default function PostContent(props) {
    const { data, user, path, replies = false } = props
    const [isDeleting, setIsDeleting] = useState(false)
    const [replyContent, setReplyContent] = useState("")
    const [replying, setIsReplying] = useState(false)
    const [replyData, setReplyData] = useState({})
    const router = useRouter()
    const imageData = data.image ? JSON.parse(data.image) : null

    const replyFormSubmit = async event => {
        event.preventDefault()
        setIsReplying(true)
        const res = await fetch('/api/replies/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: replyContent,
                user: user.user,
                msgId: data.id,
                category: path
            }),
        })

        const result = await res.json()
        setIsReplying(false)
        setReplyContent("")
    }

    if (router.isReady) {
        getReplies()
    }

    return <div>
        {!data && <Skeleton count={10} />}
        <h3>{data.title}</h3>
        <title>{data.title} | uniNet</title>
        <Modal.Body>
            {(user.type === "1" || data.user === user.user) && <Button disabled={isDeleting}
                className="float-right"
                onClick={async () => { await deleteMsg(data.id) }}
                variant="danger">{isDeleting ? "Deleting" : "Delete"}</Button>}
            <pre class="text-grey">{data.user} @ {String(data.createdAt).substring(0, 10)} {String(data.createdAt).substring(11, 16)}</pre>
            {imageData && <Carousel className="bg-trans-grey" >
                {imageData[0] && Object.keys(imageData).map((key, index) => {
                    return <Carousel.Item key={index}>
                        <img
                            className="d-block w-50 mx-auto"
                            src={String(imageData[key])}
                            style={{ height: 600 }}
                        />
                    </Carousel.Item>
                })
                }
            </Carousel>}

            <Table striped bordered hover>
                <tbody>
                    {data.contact && <tr><td class="w-25">Contact</td><td>{data.contact}</td></tr>}
                </tbody>
            </Table>

            <p class="white-space-pre" dangerouslySetInnerHTML={{ __html: data.content ? data.content : data.description }} ></p>
        </Modal.Body>
        {replies && replyComponent()}
    </div>

    function replyComponent() {
        return <div>
            {replies && <Modal.Footer>
                <Form className="w-100" onSubmit={replyFormSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="replyContent">
                                <Form.Control as="textarea" rows={1} value={replyContent} onChange={e => { setReplyContent(e.target.value) }} placeholder="comment..." />
                            </Form.Group>
                        </Col>
                        <Col lg="2">
                            <Button disabled={replying} type="submit">
                                {replying ? "Replying" : "Reply"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Footer>}

            {replyData[0] && replyData[0].map((key0, index) => {
                return <div key={index}>
                    <pre class="text-grey">{key0.user} @ {String(key0.createdAt).substring(0, 10)} {String(key0.createdAt).substring(11, 16)}</pre>
                    <p class="white-space-pre" dangerouslySetInnerHTML={{ __html: key0.content }} ></p>
                </div>
            })}

            {(!replyData[0] && !replyData.message) && <Skeleton count={10} />}
        </div>
    }

    async function getReplies() {
        const res = await fetch('/api/replies/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                msgId: data.id,
                category: path
            }),
        })
        let result = await res.json()
        setReplyData(result)
    }

    async function deleteMsg(id) {
        setIsDeleting(true)
        let res = await fetch(`/api/${path}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
        const result = await res.json()
        setIsDeleting(false)
        router.back()
    }
}