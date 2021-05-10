import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, ChannelContext } from 'stream-chat-react';
import { List } from 'react-bootstrap-icons'
import { Trash } from 'react-bootstrap-icons'

export default function ChannelHeader(props) {
    const { user } = props
    const { channel, client } = useContext(ChannelContext);

    const [channelName, setChannelName] = useState(channel?.data.name || '');
    const [title, setTitle] = useState('');

    const deleteChannel = async (e) => {
        if (confirm(`Delete ${channelName}?`))
            channel.delete();
    }


    return (
        <div className='messaging__channel-header'>
            <div id='mobile-nav-icon' onClick={() => props.toggleMobile()}>
                <List className="mx-2" size={32} />
            </div>
            <div className='ml-3 channel-header__name'>{channelName || title}</div>
            {Boolean(user.type) && <button className="messaging__channel-list__header__button" onClick={deleteChannel}><Trash size={20} color="red" /></button>}
        </div>
    );
}