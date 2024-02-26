import PlusIcon from '../../assets/svg/plus-icon.svg?react'
import ArrowDownIcon from '../../assets/svg/arrow-down.svg?react'
import { Chat } from '../../interfaces/chat'
import { NavList } from './nav-list';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../../store/chat/chat.action'

interface Props {
    chats: Chat[];
}

export const ChatsNav = ({ chats }: Props) => { 
    const dispatch = useDispatch()
    const { setIsAddChatModalOpen } = bindActionCreators(chatActions, dispatch)


    return <section className="chats-nav">
        <div className='text-chat-toggle-container'>
            <div className="left">
                <ArrowDownIcon />
                <small>TEXT CHATS</small>
            </div>
            <PlusIcon className='plus-icon' onClick={() => setIsAddChatModalOpen(true)} />
        </div>

        <NavList chats={chats} />

    </section>
}