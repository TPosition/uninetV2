import React, { useContext, useEffect } from 'react';
import { Avatar, ChatContext } from 'stream-chat-react';
import { Plus } from 'react-bootstrap-icons'
import { Skeleton } from 'antd';

const ChannelListItem = ({ children, error = false, setCreating, user }) => {
    const { client, setActiveChannel } = useContext(ChatContext);
    const { id, image, name = 'Example User' } =
        client.user || {};

    const ListHeaderWrapper = ({ children }) => {
        return (
            <div className='messaging__channel-list'>
                <div className='messaging__channel-list__header'>
                    <Avatar image={image} name={name} size={40} />
                    <div className='messaging__channel-list__header__name'>{name || id}</div>
                    {Boolean(user.type) && <button className='messaging__channel-list__header__button' onClick={() => { setCreating(true) }}>
                        <Plus size={32} />
                    </button>}
                </div>
                {children}
            </div>
        );
    };

    if (error) {
        return (
            <ListHeaderWrapper>
                <div className='messaging__channel-list__message'>
                    Error loading conversations, please try again momentarily.
        </div>
            </ListHeaderWrapper>
        );
    }

    return <ListHeaderWrapper>{children}</ListHeaderWrapper>;
};

export default React.memo(ChannelListItem);
