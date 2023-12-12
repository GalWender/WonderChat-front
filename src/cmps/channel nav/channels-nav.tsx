import { Channel } from "../../interfaces/channel"
import { NavList } from "./nav-list"

interface Props {
    channels: Channel[];
    setIsAddChannelModalOpen: (value: boolean) => void
}
export const ChannelsNav = ({ channels, setIsAddChannelModalOpen }: Props) => {

    return <section className="channels-nav">
        {channels.length > 0 && <NavList channels={channels} setIsAddChannelModalOpen={setIsAddChannelModalOpen} />}
    </section>
}