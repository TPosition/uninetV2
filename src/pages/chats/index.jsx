import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

import Chat from '../../components/Chat'
import Layout from '../../components/Layout'

export default function Chats() {
    const [user, setUser] = useState("")

    //mobile view
    const [isMobileNavVisible, setMobileNav] = useState(false);
    useEffect(() => {
        const mobileChannelList = document.querySelector('#mobile-channel-list');
        if (isMobileNavVisible && mobileChannelList) {
            mobileChannelList.classList.add('show');
        } else if (!isMobileNavVisible && mobileChannelList) {
            mobileChannelList.classList.remove('show');
        }
    }, [isMobileNavVisible]);
    const toggleMobile = () => setMobileNav(!isMobileNavVisible);

    return (
        <Layout setUser={setUser}>
            <title>Chats | uniNet</title>
            <Chat user={user} toggleMobile={toggleMobile} />
        </Layout>
    );

};
