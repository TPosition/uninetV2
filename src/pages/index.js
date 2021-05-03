import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Crypto from 'crypto-js'
import Skeleton from 'react-loading-skeleton'

import Particles from 'react-particles-js';
import particlesConfig from '../data/particlesjs-config.json'

export default function Home() {
  const router = useRouter()

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