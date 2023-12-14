import FriendsIcon from '../../assets/svg/friends-icon.svg?react'
import { Channel } from '../../interfaces/channel';

interface Props {
    channels: Channel[];
    // setIsAddChannelModalOpen: (value: boolean) => void
}

export const ChatsNav = ({channels}:Props) => {
    return <section className="chats-nav">
        {/* <button className="btn-friends btn2">
            <FriendsIcon className="friends-icon"/>
            Friends
        </button> */}
    </section>
}