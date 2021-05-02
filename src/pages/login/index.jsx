import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button, Form } from 'react-bootstrap'
import Router from 'next/router'
import Cryto from 'crypto-js'

export default function LoginForm() {

    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const formSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)
        const res = await fetch('api/login',
            {
                body: JSON.stringify({
                    id: id,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json()

        //admin priv
        if (id === "admin" && password === "admin") {
            const userObj = {
                isLogged: true,
                user: id,
                type: 0,
                anonymous: "Anonymous"
            }
            localStorage.setItem("user", Cryto.AES.encrypt(JSON.stringify(userObj), process.env.CRYPTO_KEY).toString());
            Router.push('/')
        }

        if (result.id && !result.message) {
            const userObj = {
                isLogged: true,
                user: result.id,
                type: result.type,
                anonymous: result.Anonymous
            }
            localStorage.setItem("user", Cryto.AES.encrypt(JSON.stringify(userObj), process.env.CRYPTO_KEY).toString());
            Router.push('/');
        }
        if (result.message) setAlert(result.message)

        setIsLoading(false)
    }

    return (
        <Card className="mx-auto mt-5 bg-glass w-25">
            <Card.Body>
                {alert && <div class="bg-glass-red alert alert-danger" role="alert">
                    {alert}
                </div>
                }
                <Form onSubmit={formSubmit}>
                    <Form.Group controlId="id">
                        <Form.Label>student ID</Form.Label>
                        <Form.Control value={id} onChange={e => { setId(e.target.value) }} placeholder="DIT08170101" />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Button disabled={isLoading} className="w-100" variant="primary" type="submit">
                        {isLoading ? "Logging In" : "Log In"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}