import { Chat } from "../../interfaces/chat"
import TextIcon from '../../assets/svg/text-icon.svg?react'
import SettingsIcon from '../../assets/svg/settings-icon.svg?react'

interface Props {
    chat: Chat;
}

export const NavPreview = ({ chat }: Props) => {
    return <section className="nav-preview">
        <div className="left">
            <TextIcon />
            <small>{chat.name}</small>
        </div>
        <div className="right">
            <SettingsIcon/>
        </div>
    </section>
}