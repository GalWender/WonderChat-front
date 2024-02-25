import { useEffect, useState } from "react";
import { Channel } from "../../interfaces/channel"
import { NavPreview } from "./nav-preview"
import { useNavigate, useParams } from "react-router-dom";
import PlusIcon from '../../assets/svg/plus-icon.svg?react'
import * as channelActions from "../../store/channel/channel.action"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../store/store";

interface Props {
    channels: Channel[];
    setIsAddChannelModalOpen: (value: boolean) => void;
    selected: string | undefined;
    setSelected: (value: string) => void;
}

export const NavList = ({ channels, setIsAddChannelModalOpen, selected, setSelected }: Props) => {
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)
    const dispatch = useDispatch()
    const { setChannel } = bindActionCreators(channelActions, dispatch)
    const navigate = useNavigate()
    const params = useParams()

    // const [selected, setSelected] = useState(params.channelId)
    const [hovered, setHovered] = useState("")

    useEffect(() => {
        if (!params.channelId) {
            navigate(`/channels/${channels[0]._id}`)
            setSelected(channels[0]._id)
            setChannel(channels[0])
        }
    }, [])

    const handleChannelSelect = (channelId: string) => {
        setSelected(channelId)
        navigate(`/channels/${channelId}`)
        // socketService.emit(SOCKET_EMIT_SET_CHANNEL_ID_CHANNEL,channelId)
        setChannel(channels.find(channel => channel._id === channelId) as Channel)

    }
    const handleChannelHover = (channelId: string) => {
        setHovered(channelId)
        // console.log('hovered', hovered);

    }
    const handleChannelLeave = () => {
        setHovered("")
        // console.log('left');

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

<section className="user-details">
    <p>{loggedinUser?.username}</p>
    <p>{loggedinUser?.email}</p>
    <p>{loggedinUser?._id}</p>
</section>

    </section>
}