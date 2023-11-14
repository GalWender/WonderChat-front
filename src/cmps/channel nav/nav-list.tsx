import { useState } from "react";
import { Channel } from "../../interfaces/channel"
import { NavPreview } from "./nav-preview"
import { useNavigate } from "react-router-dom";
import PlusIcon from '../../assets/svg/plus-icon.svg?react'

interface Props {
    channels: Channel[];
}

export const NavList = ({ channels }: Props) => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState("@me")

    const handleChannelSelect = (name: string, channelId: string) => {
        setSelected(name)
        navigate(`/channels/${channelId}`)
    }
    const handleAddChannelBtn = () => {

    }

    return <section className="nav-list">
        {/* <section className={`nav-preview ${"@me" === selected ? "selected" : ""}`} onClick={() => handleChannelSelect("@me")}>

        </section> */}
        {channels?.length > 0 && channels.map((channel) =>
            <NavPreview key={channel._id} channel={channel} handleChannelSelect={handleChannelSelect} selected={selected} />
        )}

        <button className="add-channel-btn" onClick={handleAddChannelBtn}>
            <PlusIcon/>
        </button>

    </section>
}