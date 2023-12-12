import FriendsIcon from '../../assets/svg/friends-icon.svg?react'

interface Props {
    // channels: Channel[];
    // setIsAddChannelModalOpen: (value: boolean) => void
}

export const ChatsNav = () => {
    return <section className="chats-nav">
        <button className="btn-friends btn2">
            <FriendsIcon className="friends-icon"/>
            Friends
        </button>
    </section>
}