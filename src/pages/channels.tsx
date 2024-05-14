import { useEffect, useState } from "react"
import { ChannelsNav } from "../cmps/channel nav/channels-nav"
import * as channelActions from "../store/channel/channel.action"
import * as chatActions from "../store/chat/chat.action"
import * as userActions from "../store/user/user.action"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { State } from "../store/store"
import { AddChannelModal } from "../cmps/add-channel-modal"
import { Outlet, useParams } from "react-router-dom"
import { AddChatModal } from "../cmps/add-chat-modal"
import { AddFriendModal } from "../cmps/add-friend-modal"

export const Channels = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { loadChannels, loadChannel, addChannel } = bindActionCreators(channelActions, dispatch)
    const { setIsAddChatModalOpen, addChat } = bindActionCreators(chatActions, dispatch)
    const { setIsAddFriendModalOpen } = bindActionCreators(userActions, dispatch)
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)
    const channels = useSelector((state: State) => state.channel.channels).sort((a) => a.isDirectMessages === true ? -1 : 1)
    const isAddChatModalOpen = useSelector((state: State) => state.chat.isAddChatModalOpen)
    const isAddFriendModalOpen = useSelector((state: State) => state.user.isAddFriendModalOpen)
    const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false)
    const [selected, setSelected] = useState(params.channelId)

    useEffect(() => {
        loadChannels({ userId: loggedinUser?._id })
        if (params.channelId) {
            loadChannel(params?.channelId)
        }
    }, [loggedinUser, params.channelId])

    return <section className="channels">
        <ChannelsNav
            channels={channels}
            setIsAddChannelModalOpen={setIsAddChannelModalOpen}
            selected={selected}
            setSelected={setSelected}
        />
        {isAddChannelModalOpen && <AddChannelModal
            setIsAddChannelModalOpen={setIsAddChannelModalOpen}
            addChannel={addChannel}
            setSelected={setSelected}
        />}
        {isAddChatModalOpen && <AddChatModal
            setIsAddChatModalOpen={setIsAddChatModalOpen}
            addChat={addChat}
        />}
        {isAddFriendModalOpen && <AddFriendModal
            setIsAddFriendModalOpen={setIsAddFriendModalOpen}
        />}
        <Outlet />
    </section>
}