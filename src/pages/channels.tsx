import { useEffect, useState } from "react"
import { ChannelsNav } from "../cmps/channel nav/channels-nav"
import * as channelActions from "../store/channel/channel.action"
import * as chatActions from "../store/chat/chat.action"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { State } from "../store/store"
import { AddChannelModal } from "../cmps/add-channel-modal"
import { Outlet, useParams } from "react-router-dom"
import { AddChatModal } from "../cmps/add-chat-modal"

export const Channels = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { loadChannels, loadChannel, addChannel } = bindActionCreators(channelActions, dispatch)
    const { setIsAddChatModalOpen, addChat } = bindActionCreators(chatActions, dispatch)
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)
    const channels = useSelector((state: State) => state.channel.channels)
    const isAddChatModalOpen = useSelector((state: State) => state.chat.isAddChatModalOpen)
    const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false)
    const [selected, setSelected] = useState(params.channelId)

    useEffect(() => {
        if (loggedinUser?._id) {
            loadChannels({ userId: loggedinUser?._id })
        }
        if (params.channelId) {
            console.log('checking paramas', params.channelId);

            loadChannel(params?.channelId)
        }
    }, [])

    return <section className="channels">
        <ChannelsNav
            channels={channels}
            setIsAddChannelModalOpen={setIsAddChannelModalOpen}
            selected={selected} setSelected={setSelected}
        />
        {isAddChannelModalOpen && <AddChannelModal
            setIsAddChannelModalOpen={setIsAddChannelModalOpen}
            addChannel={addChannel}
            setSelected={setSelected}
        />}
        {isAddChatModalOpen && <AddChatModal
            setIsAddChatModalOpen={setIsAddChatModalOpen}
            addChat={addChat}
        // setSelected={setSelected}
        />}
        <Outlet />
    </section>
}