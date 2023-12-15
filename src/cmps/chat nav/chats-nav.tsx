import { useSelector } from 'react-redux';
import PlusIcon from '../../assets/svg/plus-icon.svg?react'
import ArrowDownIcon from '../../assets/svg/arrow-down.svg?react'
import { Channel } from '../../interfaces/channel';
import { State } from '../../store/store';

interface Props {
    channels: Channel[];
    // setIsAddChannelModalOpen: (value: boolean) => void
}

export const ChatsNav = ({ channels }: Props) => {
    const channel = useSelector((state: State) => state.channel.channel)
    console.log('chat nav chanel', channel);

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
            <PlusIcon className='plus-icon'/>
        </div>
        
    </section>
}