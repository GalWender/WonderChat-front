import { useState } from "react";
import { Channel } from "../../interfaces/channel"
import { NavPreview } from "./nav-preview"
import { useNavigate } from "react-router-dom";
import PlusIcon from '../../assets/svg/plus-icon.svg?react'

interface Props {
    channels: Channel[];
    setIsAddChannelModalOpen: (value: boolean) => void;
}

export const NavList = ({ channels, setIsAddChannelModalOpen }: Props) => {
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
        <section className="channels-container">
            {channels?.length > 0 && channels.map((channel) =>
                <NavPreview key={channel._id} channel={channel} handleChannelSelect={handleChannelSelect} selected={selected} />
            )}
        </section>

        <button className="add-channel-btn" onClick={()=>setIsAddChannelModalOpen(true)}>
            <PlusIcon />
        </button>

    </section>
}