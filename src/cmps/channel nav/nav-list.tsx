import { useState } from "react";
import { Channel } from "../../interfaces/channel"
import { NavPreview } from "./nav-preview"
import { useNavigate, useParams } from "react-router-dom";
import PlusIcon from '../../assets/svg/plus-icon.svg?react'

interface Props {
    channels: Channel[];
    setIsAddChannelModalOpen: (value: boolean) => void;
}

export const NavList = ({ channels, setIsAddChannelModalOpen }: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    
    const [selected, setSelected] = useState(params.channelId)
    const [hovered, setHovered] = useState("")

    const handleChannelSelect = (channelId: string) => {
        setSelected(channelId)
        navigate(`/channels/${channelId}`)
        
    }
    const handleChannelHover = (channelId: string) => {
        setHovered(channelId)
        // console.log('hovered', hovered);

    }
    const handleChannelLeave = () => {
        setHovered("")
        // console.log('left');
        
    }

    const handleAddChannelBtn = () => {

    }

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