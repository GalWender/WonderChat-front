import { Channel } from "../../interfaces/channel"
import { NavList } from "./nav-list"

interface Props {
    channels: Channel[];
    setIsAddChannelModalOpen: (value: boolean) => void;
    selected: string | undefined;
    setSelected: (value: string) => void;
}
export const ChannelsNav = ({ channels, setIsAddChannelModalOpen, selected, setSelected }: Props) => {
    console.log(channels);
    

    return <section className="channels-nav">
        {channels.length > 0 && <NavList
            channels={channels}
            setIsAddChannelModalOpen={setIsAddChannelModalOpen}
            selected={selected}
            setSelected={setSelected}
        />}
    </section>
}