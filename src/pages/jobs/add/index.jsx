import { Button, Form, Row, Col } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { TimePicker } from 'antd';



export default function Add() {

    const [isLoading, setIsLoading] = useState(false)
    const [hasMsg, setHasMsg] = useState("")
    const router = useRouter()
    const tabOption = ["Part Time", "Full Time", "Internship"]

    const [user, setUser] = useState("")
    const [tag, setTag] = useState("Part Time")
    const [contact, setContact] = useState("")
    const [salary, setSalary] = useState()
    const [perPeriod, setPerPeriod] = useState("hour")
    const [fromTime, setFromTime] = useState("00:00")
    const [toTime, setToTime] = useState("00:00")
    const [workingHour, setWorkingHour] = useState("")
    const [workingDuration, setWorkingDuration] = useState("")
    const [position, setPosition] = useState("")
    const [scope, setScope] = useState("")
    const [requirement, setRequirement] = useState("")
    const [description, setDescription] = useState("")
    const [company, setCompany] = useState("")
    const [address, setAddress] = useState("")

    const formSubmit = async event => {
        event.preventDefault()
        setIsLoading(true)

        const res = await fetch('/api/jobs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.user,
                tag, contact, salary, perPeriod, workingHour, workingDuration, position, scope, requirement, description, company, address
            }),
        })
        const result = await res.json()
        if (result.message) setHasMsg(result.message)

        setContact("")
        setSalary()
        setPerPeriod("")
        setWorkingHour("")
        setWorkingDuration("")
        setPosition("")
        setScope("")
        setRequirement("")
        setCompany("")
        setAddress("")
        setDescription("")
        setIsLoading(false)
    }

    useEffect(() => {
        setWorkingHour(`From ${fromTime} To ${toTime}`)
    }, [fromTime, toTime]);

    return <Layout setUser={setUser}>
        <Button variant="light" className="float-right" onClick={() => router.push("jobs")}><ArrowLeft /> Back</Button>
        <h3>Add</h3>
        <title>Add | uniNet</title>
        <Form onSubmit={formSubmit}>
            {hasMsg && <div class="alert alert-primary">
                {hasMsg}
            </div>}
            <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control as='input' value={company} onChange={e => { setCompany(e.target.value) }} placeholder="HiDen Sdn. Bhd." />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Company Address</Form.Label>
                <Form.Control rows={6} as='textarea' value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId="position">
                        <Form.Label>Position</Form.Label>
                        <Form.Control as='input' value={position} onChange={e => { setPosition(e.target.value) }} placeholder="Job Title" />
                    </Form.Group>
                </Col>
                <Col>
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
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="salary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control as='input' type="number" min="0" value={salary} onChange={e => { setSalary(e.target.value) }} placeholder="7" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="perPeriod">
                        <Form.Label>&nbsp;</Form.Label>
                        <Form.Control as='select' value={perPeriod} onChange={e => setPerPeriod(e.target.value)} >
                            <option value="per hour">per hour</option>
                            <option value="per day">per day</option>
                            <option value="per month">per month</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Label>Working hours</Form.Label><br />
                    From <TimePicker use12Hours format="h:mm a" onChange={(time, timeString) => { setFromTime(timeString) }} /> To <TimePicker use12Hours format="h:mm a" onChange={(time, timeString) => { setToTime(timeString) }} />
                </Col>
            </Row>

            <Form.Group controlId="contact">
                <Form.Label>Contact</Form.Label>
                <Form.Control as='input' value={contact} onChange={e => { setContact(e.target.value) }} placeholder="016-5877885 / b2705@unimy.my" />
            </Form.Group>
            <Form.Group controlId="requirement">
                <Form.Label>Requirement</Form.Label>
                <Form.Control rows={8} as='textarea' value={requirement} onChange={e => setRequirement(e.target.value)} placeholder="Description" />
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