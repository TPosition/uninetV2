import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { useRouter } from 'next/router'

import ChannelListItem from './ChannelListItem'
import ChannelHeader from './ChannelHeader'
import { CreateChannel } from './CreateChannel'

export default function Chats(props) {

    const { user, toggleMobile, isAnon = false } = props
    const [chatClient, setChatClient] = useState(null);
    const [creating, setCreating] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance('y8djgvs8wftr');
            const tokenUser = isAnon ? user.anonymous.replace(/[^\w\s]/gi, '') : user.user
            const token = client.devToken(String(tokenUser).replace(/\s/g, ''));
            await client.connectUser(
                {
                    id: isAnon ? String(user.anonymous).replace(/[^\w\s]/gi, '') : String(user.user).replace(/\s/g, ''),
                    name: isAnon ? 'anonymous ' + user.anonymous.substring(0, 5) : user.user,
                    image: isAnon ? "https://picsum.photos/seed/" + tokenUser + "/200" : "https://picsum.photos/seed/" + user.user + "/200",
                },
                token,
            );
            setChatClient(client);
        };
        if (user.isLogged) {
            initChat();
        }
    })

    if (!chatClient) {
        return <LoadingIndicator />;
    }

    return (
        <Chat client={chatClient} theme={isAnon ? "dark messaging" : "light messaging"}>
            <div id='mobile-channel-list' onClick={toggleMobile}>
                <ChannelList List={(listProps) => <ChannelListItem {...listProps} setCreating={setCreating} user={user} />} />
            </div>
            {creating ? <CreateChannel setCreating={setCreating} /> :
                <Channel>
                    <Window>
                        <ChannelHeader {...props} />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>}
        </Chat>
    );
};
