import { useEffect, useState } from "react"
import { ChannelsNav } from "../cmps/channel nav/channels-nav"
import * as channelActions from "../store/channel/channel.action"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { State } from "../store/store"
import { AddChannelModal } from "../cmps/add-channel-modal"

export const Channels = () => {
    const dispatch = useDispatch()
    const { loadChannels } = bindActionCreators(channelActions, dispatch)
    const channels = useSelector((state: State) => state.channel.channels)
    const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false)

    useEffect(() => {
        loadChannels()
    }, [])

    return <section className="channels">
        <ChannelsNav channels={channels} setIsAddChannelModalOpen={setIsAddChannelModalOpen} />
        {isAddChannelModalOpen && <AddChannelModal setIsAddChannelModalOpen={setIsAddChannelModalOpen} />}
    </section>
}