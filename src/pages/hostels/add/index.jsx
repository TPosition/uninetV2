import { Button, Form, Row, Col } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function Add() {

    const [isLoading, setIsLoading] = useState(false)
    const [hasMsg, setHasMsg] = useState("")
    const router = useRouter()
    const tabOption = ["The Arc", "Mutiara Vile", "Other"]

    const [user, setUser] = useState("")
    const [tag, setTag] = useState("The Arc")
    const [rentFee, setRentFee] = useState()
    const [bed, setBed] = useState()
    const [contact, setContact] = useState("")
    const [water, setWater] = useState(0)
    const [electricity, setElectricity] = useState(0)
    const [wifi, setWifi] = useState(0)
    const [bathroom, setBathroom] = useState()
    const [unit, setUnit] = useState("")
    const [furniture, setFurniture] = useState("")
    const [description, setDescription] = useState("")

    const formSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)

        const res = await fetch('/api/hostels/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.user,
                tag,
                rentFee,
                bed,
                contact,
                water,
                electricity,
                wifi,
                bathroom,
                unit,
                furniture,
                description,
            }),
        })
        const result = await res.json()
        if (result.message) setHasMsg(result.message)

        setTag("Other")
        setRentFee()
        setBed()
        setContact()
        setWater()
        setElectricity()
        setWifi()
        setBathroom()
        setUnit()
        setFurniture()
        setDescription()
        setIsLoading(false)
    }

    return <Layout setUser={setUser}>
        <Button variant="light" className="float-right" onClick={() => router.push("/hostels")}><ArrowLeft /> Back</Button>
        <h3>Add</h3>
        <title>Add | uniNet</title>
        <Form onSubmit={formSubmit}>
            {hasMsg && <div class="alert alert-primary">
                {hasMsg}
            </div>}
            <Row>
                <Col>
                    <Form.Group controlId="unit">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control as='input' value={unit} onChange={e => { setUnit(e.target.value) }} placeholder="A2705" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tag">
                        <Form.Label>	&nbsp;</Form.Label>
                        <Form.Control as='select' value={tag} onChange={e => setTag(e.target.value)} >
                            {
                                tabOption.map((key0, index) => {
                                    return <option key={index} value={key0}>{key0}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="rentFee">
                        <Form.Label>Rental Fee</Form.Label>
                        <Form.Control min="0" as='input' type="number" value={rentFee} onChange={e => { setRentFee(e.target.value) }} placeholder="1200" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="bed">
                        <Form.Label>Beds</Form.Label>
                        <Form.Control min="0" as='input' type="number" value={bed} onChange={e => { setBed(e.target.value) }} placeholder="3" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="bathroom">
                        <Form.Label>Bathroom</Form.Label>
                        <Form.Control min="0" as='input' type="number" value={bathroom} onChange={e => { setBathroom(e.target.value) }} placeholder="2" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Label>Rental fee including:</Form.Label>
                    <Form.Group controlId="water">
                        <Col>
                            <Form.Label>Water:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as='select' value={water} onChange={e => setWater(e.target.value)} >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="electricity">
                        <Col>
                            <Form.Label>Electricity:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as='select' value={electricity} onChange={e => setElectricity(e.target.value)} >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="wifi">
                        <Col>
                            <Form.Label>Wifi:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as='select' value={wifi} onChange={e => setWifi(e.target.value)} >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="furniture">
                        <Form.Label>Furnitures</Form.Label>
                        <Form.Control rows={9} as='textarea' value={furniture} onChange={e => setFurniture(e.target.value)} placeholder="TV, Tables, Chairs" />
                    </Form.Group>
                </Col>

            </Row>

            <Form.Group controlId="contact">
                <Form.Label>Contact</Form.Label>
                <Form.Control as='input' value={contact} onChange={e => { setContact(e.target.value) }} placeholder="016-5877885 / b2705@unimy.my" />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control rows={8} as='textarea' value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            </Form.Group>

            <Form.Group className="d-none" controlId="user">
                <Form.Label>user</Form.Label>
                <Form.Control as='input' value={user} />
            </Form.Group>
            <Button disabled={isLoading} className="w-100" variant="primary" type="submit">
                {isLoading ? "Submitting" : "Submit"}
            </Button>
        </Form>
    </Layout >
}