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
    const [isLoading, setIsLoading] = useState(false)
    const [hasMsg, setHasMsg] = useState("")
    const router = useRouter()

    const formSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)

        const res = await fetch('/api/dashboard/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
            }),
        })
        const result = await res.json()
        if (result.message) setHasMsg(result.message)

        setTitle("")
        setContent("")
        setIsLoading(false)
    }

    return <Layout setUser={setUser}>
        <Button variant="light" className="float-right" onClick={() => router.back()}><ArrowLeft /> Back</Button>
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
            <Button disabled={isLoading} className="w-100" variant="primary" type="submit">
                {isLoading ? "Submitting" : "Submit"}
            </Button>
        </Form>
    </Layout>
}