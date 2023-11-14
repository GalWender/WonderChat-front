import { Channel } from "../../interfaces/channel"

interface Props {
    channel: Channel;
    handleChannelSelect: (name: string) => void;
    selected: string;
}

export const NavPreview = ({ channel, handleChannelSelect, selected }: Props) => {
    console.log(channel);

    return <section className={`nav-preview ${channel.name === selected ? "selected" : ""}`} onClick={() => handleChannelSelect(channel.name)}>

    </section>
}