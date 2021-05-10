import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Board from '../../components/Board'

import Layout from '../../components/Layout'

export default function Topics() {
    const router = useRouter()
    const [user, setUser] = useState("")
    const [data, setData] = useState([])
    const tabOption = ["Study", "Job", "Skill", "Tips", "Lifestyle", "Other"]
    useEffect(() => {
        getApi()
    }, [])

    async function getApi() {
        const res = await fetch('/api/topics/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await res.json()
        setData(result)
    }

    return <Layout setUser={setUser}>
        <Board boardTitle="Topics" ApiData={data} tabOption={tabOption} plusOnClick={() => router.push(router.pathname + "/add")} ></Board>
    </Layout>
}