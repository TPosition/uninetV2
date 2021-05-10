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
    const [commentDeleting, setCommentDeleting] = useState(false)
    const [isAnon, setIsAnon] = useState(false)
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
                user: isAnon ? user.anonymous : user.user,
                msgId: data.id,
                category: path,
                isAnonymous: isAnon
            }),
        })

        const result = await res.json()
        setIsReplying(false)
        setReplyContent("")
        setIsAnon(false)
    }

    if (router.isReady) {
        getReplies()
    }

    return <div>
        {!data && <Skeleton count={10} />}
        <h3>{data.title}{data.unit}{data.position}{data.tag && ` | ${data.tag}`}</h3>
        <title>{data.title}{data.unit}{data.position} | uniNet</title>
        <Modal.Body>
            {(user.type === "1" || data.user === user.user || data.user === user.anonymous) && <Button disabled={isDeleting}
                className="float-right"
                onClick={async () => { await deleteMsg(data.id) }}
                variant="danger">{isDeleting ? "Deleting" : "Delete"}</Button>}
            <pre class="text-grey">{data.isAnonymous ? `Anonymous ${String(data.user).substring(0, 5)} ` : data.user} @ {String(data.createdAt).substring(0, 10)} {String(data.createdAt).substring(11, 16)}</pre>

            {data.salary && <>
                <p>{data.company}</p>
                <pre>{data.address}</pre>
            </>}

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

            <Table striped bordered hover className="table-layout-fixed">
                <tbody>
                    {data.rentFee && <><tr><th>Rental Fee</th><th>Beds</th><th>Bathroom</th></tr>
                        <tr>
                            <td>
                                {data.rentFee}
                            </td>
                            <td>
                                {data.bed}
                            </td>
                            <td>
                                {data.bathroom}
                            </td>
                        </tr>
                        <tr><td colSpan="2">Rental fee including: </td><th>Furnitures</th></tr>
                        <tr>
                            <td colSpan="2" class="w-100 m-0 p-0">
                                <Table className="table-layout-fixed" >
                                    <tr><td >Water</td><td>{data.water ? "Yes" : "No"}</td></tr>
                                    <tr><td>Electricity</td><td>{data.electricity ? "Yes" : "No"}</td></tr>
                                    <tr><td>Wifi</td><td>{data.wifi ? "Yes" : "No"}</td></tr>
                                </Table>
                            </td>
                            <td><p class="white-space-pre" dangerouslySetInnerHTML={{ __html: data.furniture }} ></p></td>
                        </tr>
                    </>}

                    {data.salary && <>
                        <tr><td class="font-weight-bold" colSpan="2">Salary</td><td>{data.salary} {data.perPeriod}</td></tr>
                        <tr><td class="font-weight-bold" colSpan="2">Working hours</td><td>{data.workingHour}</td></tr>
                    </>}

                    {data.contact && <tr ><td class="font-weight-bold">Contact</td><td colSpan="2">{data.contact}</td></tr>}
                </tbody>
            </Table>
            {data.requirement && <><h4>Requirement</h4> <p class="white-space-pre" dangerouslySetInnerHTML={{ __html: data.requirement }} ></p> </>}
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
                            <Button disabled={replying} variant="secondary" className="ml-2" onClick={() => { setIsAnon(true) }} type="submit">
                                {replying ? "Whispering" : "Whisper"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Footer>}

            {replyData[0] && replyData[0].map((key0, index) => {
                return <div key={index}>
                    {(Boolean(user.type) || key0.user === user.user || key0.user.substring(0, 5) === user.anonymous.substring(0, 5)) &&
                        <Button disabled={commentDeleting} className="float-right" variant="danger" onClick={async () => { deleteReply(key0.id) }} type="submit">
                            {commentDeleting ? "Deleting" : "Delete"}
                        </Button>}
                    <pre class="text-grey">{key0.isAnonymous ? `Anonymous ${key0.user.substring(0, 5)}` : key0.user} @ {String(key0.createdAt).substring(0, 10)} {String(key0.createdAt).substring(11, 16)}</pre>
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

    async function deleteReply(id) {
        setCommentDeleting(true)
        let res = await fetch(`/api/replies/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
        const result = await res.json()
        setCommentDeleting(false)
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