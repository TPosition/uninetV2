import Head from 'next/head'
import { Layout, Menu, Breadcrumb } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ChatDots, House, ArrowLeftRight, Briefcase, ChatLeftDots, BoxArrowInLeft, People, ChatDotsFill } from 'react-bootstrap-icons';
import { Container, Row, Col, Image } from 'react-bootstrap'
import Router from 'next/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Crypto from 'crypto-js'
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';

const { Header, Content, Footer, Sider } = Layout;

function menuItem(name, path, icon, onClick) {
    return <Menu.Item key={path} icon={icon} onClick={onClick}>
        <Link href={{ pathname: path, query: {} }}>
            {name}
        </Link>
    </Menu.Item>
}

export default function GeneralLayout({ children, setUser }) {

    const router = useRouter()
    const pathName = router.pathname
    const [tmpUser, setTmpUser] = useState("")

    useEffect(() => {
        let userTmp = localStorage.getItem("user")

        if (!userTmp)
            router.push("/login")

        const bytes = Crypto.AES.decrypt(userTmp, process.env.CRYPTO_KEY)
        const decryptedData = bytes.toString(Crypto.enc.Utf8);

        if (decryptedData) {
            setUser(JSON.parse(bytes.toString(Crypto.enc.Utf8)))
            setTmpUser(JSON.parse(bytes.toString(Crypto.enc.Utf8)))
        }

        else router.push("/login")
    }, [])

    return <>
        <Layout style={{ minHeight: 722 }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Image src="/logo.svg" height="60" className="my-2 mx-auto d-block" />
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[pathName]}
                    style={{ borderRight: 0 }}
                >
                    {tmpUser.type === 1 && menuItem("Users", "/users", <People />)}
                    {menuItem("Dashboard", "/dashboard", <InfoCircleOutlined />)}
                    {menuItem("Topics", "/topics", <ChatLeftDots />)}
                    {menuItem("Hostels", "/hostels", <House />)}
                    {menuItem("Trading", "/trading", <ArrowLeftRight />)}
                    {menuItem("Jobs", "/jobs", <Briefcase />)}
                    {menuItem("Chats", "/chats", <ChatDots />, () => {
                        let tmpclient = StreamChat.getInstance('y8djgvs8wftr')
                        tmpclient.disconnectUser()
                    })}
                    {menuItem("Whispers", "/whispers", <ChatDotsFill />, () => {
                        let tmpclient = StreamChat.getInstance('y8djgvs8wftr')
                        tmpclient.disconnectUser()
                    })}
                    <Menu.Item key="Log out" icon={<BoxArrowInLeft />} onClick={logOut}>
                        Log out
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background bg-white" style={{ padding: 24 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>uniNet ©2021 </Footer>
            </Layout>
        </Layout>
    </>

    function logOut() {
        localStorage.removeItem("user");
        router.reload();
    }
}