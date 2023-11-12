import { Channel } from "../../interfaces/channel"
import { NavList } from "./nav-list"

interface Props {
    channels: Channel[]
}
export const ChannelsNav = ({ channels }: Props) => {

    return <section className="channels-nav">
        <NavList channels={channels} />
    </section>
}