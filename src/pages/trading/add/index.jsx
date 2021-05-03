import { Button, Form } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import ReactFileReader from 'react-file-reader'

export default function Add() {

    const [isLoading, setIsLoading] = useState(false)
    const [hasMsg, setHasMsg] = useState("")
    const router = useRouter()
    const tabOption = ["Books", "Accessories", "Others"]

    const [user, setUser] = useState("")
    const [tag, setTag] = useState("Others")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [contact, setContact] = useState("")
    const [image, setImage] = useState("")

    const formSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)

        const res = await fetch('/api/trading/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.user,
                tag,
                title,
                image,
                description,
                contact
            }),
        })
        const result = await res.json()
        if (result.message) setHasMsg(result.message)

        setDescription("")
        setTitle("")
        setContact("")
        setImage("")
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
            <Form.Group controlId="contact">
                <Form.Label>Contact</Form.Label>
                <Form.Control as='input' value={contact} onChange={e => { setContact(e.target.value) }} placeholder="016-5877885 / b2705@unimy.my" />
            </Form.Group>
            <Form.Group controlId="image">
                <Form.Label>Images</Form.Label>
                <ReactFileReader handleFiles={(files) => setImage(JSON.stringify({ ...files.base64 }))}
                    base64={true} multipleFiles={true} >
                    <div class="custom-file">
                        <label class="custom-file-label">{image ? Object.keys(JSON.parse(image)).length + " image uploaded." : "Choose file..."}</label>
                    </div>
                </ReactFileReader>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control rows={8} as='textarea' value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            </Form.Group>
            <Button disabled={isLoading} className="w-100" variant="primary" type="submit">
                {isLoading ? "Submitting" : "Submit"}
            </Button>
        </Form>
    </Layout >
}