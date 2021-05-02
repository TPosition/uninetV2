import Head from 'next/head'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Crypto from 'crypto-js'
import Board from '../../components/Board'

import Layout from '../../components/Layout'

export default function Dashboard() {
    const router = useRouter()
    const [user, setUser] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        getApi()
    }, [])

    async function getApi() {
        const res = await fetch('/api/dashboard/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await res.json()
        setData(result)
    }

    return <Layout setUser={setUser}>
        <Board boardTitle="Dashboard" ApiData={data} listingOnClick={() => router.push()} plusOnClick={() => router.push(router.pathname + "/add")} ></Board>
    </Layout>
}