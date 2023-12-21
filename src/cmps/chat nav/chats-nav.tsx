import PlusIcon from '../../assets/svg/plus-icon.svg?react'
import ArrowDownIcon from '../../assets/svg/arrow-down.svg?react'
import { Chat } from '../../interfaces/chat'
import { NavList } from './nav-list';

interface Props {
    chats: Chat[];
}

export const ChatsNav = ({ chats }: Props) => { //dont this i need channels too




    return <section className="chats-nav">
        {/* <button className="btn-friends btn2">
            <FriendsIcon className="friends-icon"/>
            Friends
        </button> */}
        <div className='text-chat-toggle-container'>
            <div className="left">
                <ArrowDownIcon />
                <small>TEXT CHATS</small>
            </div>
            <PlusIcon className='plus-icon' />
        </div>

        <NavList chats={chats} />

    </section>
}