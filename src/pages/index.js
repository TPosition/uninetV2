import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import Crypto from 'crypto-js'
import Skeleton from 'react-loading-skeleton'

import Particles from 'react-particles-js';
import particlesConfig from '../data/particlesjs-config.json'
import Layout from '../components/Layout'

export default function Home() {

  const [user, setUser] = useState("")
  const router = useRouter()
  const [page, setPage] = useState(1)

  useEffect(() => {
    let userTmp = localStorage.getItem("user")

    if (!userTmp)
      router.push("/login")

    const bytes = Crypto.AES.decrypt(userTmp, process.env.CRYPTO_KEY)
    const decryptedData = bytes.toString(Crypto.enc.Utf8);

    if (decryptedData)
      router.push("/dashboard")

    else router.push("/login")
  }, [])

  return (
    <>
      <Head>
        <title>uniNet | A network connects UNIMY students.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Skeleton count={10} />
    </>
  )
}