import { useEffect, useState } from "react"
import { ChannelsNav } from "../cmps/channel nav/channels-nav"
import * as channelActions from "../store/channel/channel.action"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { State } from "../store/store"
import { AddChannelModal } from "../cmps/add-channel-modal"
import { Outlet } from "react-router-dom"

export const Channels = () => {
    const dispatch = useDispatch()
    const { loadChannels, addChannel } = bindActionCreators(channelActions, dispatch)
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)
    const channels = useSelector((state: State) => state.channel.channels)
    const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false)

    useEffect(() => {
        loadChannels({ userId: loggedinUser?._id })
    }, [])

    return <section className="channels">
        <ChannelsNav channels={channels} setIsAddChannelModalOpen={setIsAddChannelModalOpen} />
        {isAddChannelModalOpen && <AddChannelModal setIsAddChannelModalOpen={setIsAddChannelModalOpen} addChannel={addChannel} />}
        <Outlet/>
    </section>
}