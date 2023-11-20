import { Channel } from "../../interfaces/channel"
import { NavList } from "./nav-list"

interface Props {
    channels: Channel[];
    setIsAddChannelModalOpen: (value: boolean) => void
}
export const ChannelsNav = ({ channels, setIsAddChannelModalOpen }: Props) => {
console.log(channels);

    return <section className="channels-nav">
        <NavList channels={channels} setIsAddChannelModalOpen={setIsAddChannelModalOpen}/>
    </section>
}