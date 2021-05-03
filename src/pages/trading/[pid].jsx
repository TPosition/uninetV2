import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import PostContent from '../../components/PostContent'


export default function Post() {
    const router = useRouter()
    const [user, setUser] = useState("")
    const [data, setData] = useState("")
    const { pid } = router.query

    async function findApi() {
        const res = await fetch('/api/trading/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pid
            }),
        })
        const result = await res.json()
        setData(result[0])
    }

    if (router.isReady) {
        findApi()
    }

    return <Layout setUser={setUser}>
        <PostContent data={data} user={user} path="trading" replies={true} />
    </Layout>

}
