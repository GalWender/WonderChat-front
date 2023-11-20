import { Channel } from "../../interfaces/channel"
import WhiteLogo from '../../assets/svg/whiteLogo.svg?react'

interface Props {
    channel: Channel;
    handleChannelSelect: (channelId: string) => void;
    selected: string;
}

export const NavPreview = ({ channel, handleChannelSelect, selected }: Props) => {
    console.log(channel);

    return <section className={`nav-preview ${channel._id === selected ? "selected" : ""}`} onClick={() => handleChannelSelect(channel._id)}>
        <div className="select-indicator" />
        <button className="channel-btn nav-btn-hover">
            {channel?.isDirectMessages ? <WhiteLogo /> : channel.name.toLocaleUpperCase()[0]}
        </button>
    </section>
}