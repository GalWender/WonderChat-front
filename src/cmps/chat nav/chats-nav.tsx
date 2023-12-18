import { useDispatch, useSelector } from 'react-redux';
import PlusIcon from '../../assets/svg/plus-icon.svg?react'
import ArrowDownIcon from '../../assets/svg/arrow-down.svg?react'
import { Channel } from '../../interfaces/channel';
import { State } from '../../store/store';
import { useEffect } from 'react';
import * as chatActions from "../../store/chat/chat.action"
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';

interface Props {
    channels: Channel[];
    // setIsAddChannelModalOpen: (value: boolean) => void
}

export const ChatsNav = ({ channels }: Props) => { //dont this i need channels too
    const dispatch = useDispatch()
    const { loadChats } = bindActionCreators(chatActions, dispatch)
    const channel = useSelector((state: State) => state.channel.channel) //chack don't think i need this
    const chats = useSelector((state: State) => state.chat.chats)
    console.log('chat nav chanel', channel);
    const params = useParams()

    useEffect(() => {
        if (params.channelId) {
            loadChats({ channelId: params.channelId })
        }
        console.log(chats);
    }, [])

    return <section className="chats-nav">
        {/* <button className="btn-friends btn2">
            <FriendsIcon className="friends-icon"/>
            Friends
        </button> */}
        <div className='text-chat-toggle-container'>
            <div className="left">
                <ArrowDownIcon />
                <small>TEXT CHANNELS</small>
            </div>
            <PlusIcon className='plus-icon' />
        </div>

        {chats.map((chat) => (
            <pre key={chat._id}>
                {JSON.stringify(chat, null, 2)}
            </pre>
        ))}



    </section>
}