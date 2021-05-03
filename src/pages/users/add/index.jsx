import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton';
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import Crypto from 'crypto-js'

export default function Add() {

    const [user, setUser] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasMsg, setHasMsg] = useState("")
    const router = useRouter()

    const [id, setId] = useState("")
    const [anonymous, setAnonymous] = useState("")
    const [type, setType] = useState("0")
    const [password, setPassowrd] = useState("")
    const [tmpPassword, setTmpPassword] = useState("")

    const formSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)

        const res = await fetch('/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id,
                anonymous,
                type,
                password: tmpPassword
            }),
        })
        const result = await res.json()
        if (result.message) setHasMsg(result.message)

        setId("")
        setPassowrd("")
        setIsLoading(false)
        setTmpPassword("")
        setAnonymous("")
    }

    return <Layout setUser={setUser}>
        <Button variant="light" className="float-right" onClick={() => router.push("/users")}><ArrowLeft /> Back</Button>
        <h3>Add</h3>
        <title>Add | uniNet</title>
        <Form onSubmit={formSubmit}>
            {hasMsg && <div class="alert alert-primary">
                {hasMsg}
            </div>}
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control as='input' value={id} onChange={e => { setId(e.target.value); setAnonymous(Crypto.AES.encrypt(id, process.env.CRYPTO_KEY).toString()); }} placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control as='input' type="password" value={password} onChange={e => { setPassowrd(e.target.value); setTmpPassword(Crypto.AES.encrypt(password, process.env.CRYPTO_KEY).toString()) }} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="type">
                <Form.Label>Account Type</Form.Label>
                <Form.Control as='select' value={type} onChange={e => { setType(e.target.value) }}>
                    <option value="0">User</option>
                    <option value="1">Admin</option>
                </Form.Control>
            </Form.Group>
            <Button disabled={isLoading} className="w-100" variant="primary" type="submit">
                {isLoading ? "Submitting" : "Submit"}
            </Button>
        </Form>
    </Layout>
}