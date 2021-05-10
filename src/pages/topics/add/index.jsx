import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'
import Head from 'next/head'
import { Plus, ArrowLeft } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton';
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function Add() {

    const [user, setUser] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false)
    const tabOption = ["Study", "Job", "Skill", "Tips", "Lifestyle", "Other"]
    const [tag, setTag] = useState("Other")
    const [isLoading, setIsLoading] = useState(false)
    const [hasMsg, setHasMsg] = useState("")
    const router = useRouter()

    const formSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)

        const res = await fetch('/api/topics/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: isAnonymous ? user.anonymous : user.user,
                title,
                content,
                isAnonymous,
                tag
            }),
        })
        const result = await res.json()
        if (result.message) setHasMsg(result.message)

        setTitle("")
        setContent("")
        setIsAnonymous(false)
        setIsLoading(false)
        setTag("Other")
    }

    return <Layout setUser={setUser}>
        <Button variant="light" className="float-right" onClick={() => router.push("/topics")}><ArrowLeft /> Back</Button>
        <h3>Add</h3>
        <title>Add | uniNet</title>
        <Form onSubmit={formSubmit}>
            {hasMsg && <div class="alert alert-primary">
                {hasMsg}
            </div>}
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control as='input' value={title} onChange={e => { setTitle(e.target.value) }} placeholder="Title" />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control rows={8} as='textarea' value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
            </Form.Group>
            <Form.Group controlId="tag">
                <Form.Label>Category</Form.Label>
                <Form.Control as='select' value={tag} onChange={e => setTag(e.target.value)} >
                    {
                        tabOption.map((key0, index) => {
                            return <option key={index} value={key0}>{key0}</option>
                        })
                    }
                </Form.Control>
            </Form.Group>
            <Button disabled={isLoading} className="w-100" variant="primary" type="submit">
                {isLoading ? "Submitting" : "Submit"}
            </Button>
            <br /> <br />
            <Button disabled={isLoading} className="w-100 btn-secondary" variant="secondary" onClick={() => { setIsAnonymous(true) }} variant="primary" type="submit">
                {isLoading ? "Whispering" : "Whisper"}
            </Button>
        </Form>
    </Layout>
}