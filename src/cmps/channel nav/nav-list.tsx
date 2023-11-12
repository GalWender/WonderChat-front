import { useState } from "react";
import { Channel } from "../../interfaces/channel"
import { NavPreview } from "./nav-preview"

interface Props {
    channels: Channel[];
}

export const NavList = ({ channels }: Props) => {
    const [selected, setSelected] = useState("@me")

    return <section className="nav-list">
        <section className="nav-preview">

        </section>
        {channels?.length > 0 && channels.map((channel) =>
            <NavPreview key={channel._id} channel={channel} />
        )}
    </section>
}