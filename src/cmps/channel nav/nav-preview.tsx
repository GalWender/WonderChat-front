import { Channel } from "../../interfaces/channel"
import WhiteLogo from '../../assets/svg/whiteLogo.svg?react'

interface Props {
    channel: Channel;
    handleChannelSelect: (channelId: string) => void;
    selected: string;
    handleChannelHover: (channelId: string) => void;
    handleChannelLeave: () => void
    hovered: string
}

export const NavPreview = ({
    channel,
    handleChannelSelect,
    selected,
    handleChannelHover,
    handleChannelLeave,
    hovered
}: Props) => {

    console.log(channel);

    return <section className={`nav-preview`}>
        <div className={`select-indicator ${hovered === channel._id ? "hovered" : ""}`} />
        <button
            className={`channel-btn nav-btn-hover ${channel._id === selected ? "selected" : ""}`}
            onMouseEnter={() => handleChannelHover(channel._id)}
            onMouseLeave={handleChannelLeave}
            onClick={() => handleChannelSelect(channel._id)}
        >
            {channel?.isDirectMessages ? <WhiteLogo /> : channel.name.toLocaleUpperCase()[0]}
        </button>
    </section>
}