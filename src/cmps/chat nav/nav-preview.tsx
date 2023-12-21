import { Chat } from "../../interfaces/chat"
import TextIcon from '../../assets/svg/text-icon.svg?react'
import SettingsIcon from '../../assets/svg/settings-icon.svg?react'
import AddFriendIcon from '../../assets/svg/add-friend.svg?react'
import { useNavigate } from "react-router-dom";

interface Props {
    chat: Chat;
}

export const NavPreview = ({ chat }: Props) => {
    const navigate = useNavigate()

    const handleChatSelect = () => {
        navigate(`${chat._id}`)
    }

    return <section className="nav-preview" onClick={handleChatSelect}>
        <div className="left">
            <TextIcon />
            <small>{chat.name}</small>
        </div>
        <div className="right">
            <AddFriendIcon className="svg-1"/>
            <SettingsIcon className="svg-2"/>
        </div>
    </section>
}