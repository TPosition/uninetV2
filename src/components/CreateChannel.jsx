import React, { useContext, useState } from 'react';
import { ChatContext } from 'stream-chat-react';
import { X } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();
        setChannelName(event.target.value);
    };

    return (
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input onChange={handleChange} placeholder='channel-name' type='text' value={channelName} />
        </div>
    );
};

export const CreateChannel = ({ setCreating }) => {
    const { client, setActiveChannel } = useContext(ChatContext);
    const router = useRouter()

    const [channelName, setChannelName] = useState('');

    const createChannel = async (event) => {
        event.preventDefault();

        if (channelName) {
            const newChannel = await client.channel('messaging', channelName, {
                name: channelName,
            });

            await newChannel.watch();

            setChannelName('');
            setCreating(false);
            setActiveChannel(newChannel);
            router.reload()
        }
    };

    return (
        <div className='create-channel__container'>
            <div className='create-channel__header'>
                <p>Create a New Channel</p>
                <X onClick={() => { setCreating(false) }} size={32} />
            </div>
            <ChannelNameInput {...{ channelName, setChannelName }} />
            <Button variant="primary" size="lg" onClick={createChannel}>
                Create Channel
    </Button>
        </div>
    );
};
