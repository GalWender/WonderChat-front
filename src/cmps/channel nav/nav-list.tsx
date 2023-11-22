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
    const [selected, setSelected] = useState(channels[0]?._id)
    const [hovered, setHovered] = useState("")

    const handleChannelSelect = (channelId: string) => {
        setSelected(channelId)
        navigate(`/channels/${channelId}`)
    }
    const handleChannelHover = (channelId: string) => {
        setHovered(channelId)
    }
    const handleChannelLeave = () => {
        setHovered("")
    }

    const handleAddChannelBtn = () => {

    }
    console.log(channels);
    
    return <section className="nav-list">
        <section className="channels-container">
            {channels?.length > 0 && channels.map((channel) =>
                <NavPreview 
                key={channel._id} 
                channel={channel} 
                handleChannelSelect={handleChannelSelect} 
                selected={selected}
                handleChannelHover={handleChannelHover}
                handleChannelLeave={handleChannelLeave}
                hovered={hovered}
                />
            )}
        </section>

        <section className="add-channel-container">
            <button className="add-channel-btn nav-btn-hover" onClick={() => setIsAddChannelModalOpen(true)}>
                <PlusIcon />
            </button>
        </section>

    </section>
}