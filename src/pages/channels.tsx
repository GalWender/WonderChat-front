import { useEffect, useState } from "react"
import { ChannelsNav } from "../cmps/channel nav/channels-nav"
import * as channelActions from "../store/channel/channel.action"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { State } from "../store/store"
import { AddChannelModal } from "../cmps/add-channel-modal"
import { Outlet, useParams } from "react-router-dom"

export const Channels = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { loadChannels, addChannel } = bindActionCreators(channelActions, dispatch)
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)
    const channels = useSelector((state: State) => state.channel.channels)
    const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false)
    const [isAddedChannel, setIsAddedChannel] = useState(false)
    const [selected, setSelected] = useState(params.channelId)

    useEffect(() => {
        loadChannels({ userId: loggedinUser?._id })
        setIsAddedChannel(false)
    }, [selected])

    return <section className="channels">
        <ChannelsNav
            channels={channels}
            setIsAddChannelModalOpen={setIsAddChannelModalOpen}
            selected={selected} setSelected={setSelected}
        />
        {isAddChannelModalOpen && <AddChannelModal
            setIsAddChannelModalOpen={setIsAddChannelModalOpen}
            addChannel={addChannel}
            setIsAddedChannel={setIsAddedChannel}
            setSelected={setSelected}
        />}
        <Outlet />
    </section>
}