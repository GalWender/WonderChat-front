import PlusIcon from '../../assets/svg/plus-icon.svg?react'
import ArrowDownIcon from '../../assets/svg/arrow-down.svg?react'
import { Chat } from '../../interfaces/chat'
import { NavList } from './nav-list';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../../store/chat/chat.action'
import ProfilePreview from './profile-preview';

interface Props {
    chats: Chat[];
    selected: string | undefined;
    setSelected: (value: string) => void;
}

export const ChatsNav = ({ chats, selected, setSelected }: Props) => {
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
        <NavList chats={chats} selected={selected} setSelected={setSelected}/>
        <ProfilePreview />
    </section>
}