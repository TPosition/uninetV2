import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Plus, Trash } from 'react-bootstrap-icons'
import Skeleton from 'react-loading-skeleton'

import Layout from '../../components/Layout'

export default function Users() {
    const router = useRouter()
    const [deleting, setDeleting] = useState(false)
    const [user, setUser] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        getApi()
    }, [])

    async function getApi() {
        const res = await fetch('/api/users/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await res.json()
        setData(result)
    }

    if (!data[0]) {
        return <Skeleton count={10} />
    }

    return <Layout setUser={setUser}>
        <title>Users | uniNet</title>
        <div class="d-flex justify-content-between mt-4">
            <h3>Users</h3>
            {user.type && <Button onClick={() => router.push(router.pathname + "/add")}>
                <Plus size='32px' />
            </Button>}
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Anonymous</th>
                    <th>User type</th>
                    <th>Created at</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data[0] && data.map((key0, index) => {
                        return <tr>
                            <td>{index}</td>
                            <td>{key0.id}</td>
                            <td>{key0.anonymous}</td>
                            <td>{key0.type ? "Admin" : "User"}</td>
                            <td>{key0.createdAt}</td>
                            <td><Button disabled={deleting} variant="danger" className="mx-0 my-0 px-2 py-1" onClick={async () => { await deleteApi(key0.id) }}>
                                <Trash size='16px' />
                            </Button></td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
    </Layout>


    async function deleteApi(id) {
        setDeleting(true)
        let res = await fetch(`/api/users/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
        const result = await res.json()
        setDeleting(false)
        getApi()
    }
}