import { Channel } from "../interfaces/channel"
import { NavPreview } from "./nav-preview"

interface Props {
    channels: Channel[];
}

export const NavList = ({ channels }: Props) => {

    return <section className="nav-list">
        {channels.map((channel) =>
            <NavPreview key={channel._id} channel={channel} />
        )}
    </section>
}