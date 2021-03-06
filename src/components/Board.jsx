import { Row, Col, Card, Button } from 'react-bootstrap'
import Head from 'next/head'
import { Plus } from 'react-bootstrap-icons'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { useRouter } from 'next/router'

export default function Board(props) {
    const {
        boardTitle = "Board title",
        tabOption = [],
        ApiData = {},
        allowAdd = true
    } = props

    const tabList = ["All", ...tabOption]
    const router = useRouter()

    return <>
        <Head>
            <title>{boardTitle} | uniNet</title>
        </Head>
        <div class="d-flex justify-content-between mt-4">
            <h3>{boardTitle}</h3>
            {allowAdd && <Button onClick={() => router.push(router.pathname + "/add")}>
                <Plus size='32px' />
            </Button>}
        </div>
        {(!ApiData[0] && !ApiData.message) && <Skeleton count={10} />}

        {tabOption[0] && <Tabs defaultActiveKey="1" >
            {tabList.map((key0, index) => {
                return <TabPane tab={key0} key={key0} className="pb-2">
                    {ApiData[0] && ApiData.map((key1, jndex) => {
                        return (key1.tag === key0 || key0 === "All") && Listing(key1, jndex)
                    })}
                </TabPane>
            })
            }</Tabs>
        }
        {!tabOption[0] && ApiData[0] && ApiData.map((key1, jndex) => {
            return Listing(key1, jndex)
        })}

    </>

    function Listing(key, dex) {
        return <Row>
            <Col>
                <Card as="a" key={dex} onClick={() => router.push(router.pathname + "/" + key.id)} className="text-grey text-decoration-none w-100 mt-2 pl-2 bg-glass-pure hover-shadow mh-48 cursor-pointer pr-3 pt-1"><Card.Title> {key.title}{key.unit}{key.position}{key.tag ? " | " + key.tag : ""} {key.image && <img class="float-right" height={40} src={JSON.parse(key.image)[0]} />} </Card.Title></Card>
            </Col>
        </Row>
    }
}

