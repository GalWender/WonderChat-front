import { useEffect, useState } from 'react'
import { ChannelsNav } from '../cmps/channel nav/channels-nav'
import * as channelActions from '../store/channel/channel.action'
import * as chatActions from '../store/chat/chat.action'
import * as userActions from '../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../store/store'
import { AddChannelModal } from '../cmps/add-channel-modal'
import { Outlet, useParams } from 'react-router-dom'
import { AddChatModal } from '../cmps/add-chat-modal'
import { AddFriendModal } from '../cmps/add-friend-modal'
import { socketService, SOCKET_EVENT_UPDATE_CHANNEL_CHANGES } from '../services/socket.service'
import { ChannelActionType } from '../interfaces/channel.store'
import { Channel } from '../interfaces/channel'

export const Channels = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { loadChannels, loadChannel, addChannel } = bindActionCreators(channelActions, dispatch)
  const { setIsAddChatModalOpen, addChat } = bindActionCreators(chatActions, dispatch)
  const { setIsAddFriendModalOpen } = bindActionCreators(userActions, dispatch)
  const { loggedinUser, isAddFriendModalOpen } = useSelector((state: State) => state.user)
  const channels = useSelector((state: State) => state.channel.channels).sort((a) =>
    a.isDirectMessages === true ? -1 : 1
  )
  const isAddChatModalOpen = useSelector((state: State) => state.chat.isAddChatModalOpen)
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false)
  const [selected, setSelected] = useState(params.channelId)

  useEffect(() => {
    loadChannels({ userId: loggedinUser?._id })
    if (params.channelId) {
      loadChannel(params?.channelId)
    }

    // Set up socket listener for channel updates
    const handleChannelUpdate = (channel: Channel) => {
      dispatch({ type: ChannelActionType.UPDATE_CHANNEL, payload: { ...channel } })
    }
    socketService.on(SOCKET_EVENT_UPDATE_CHANNEL_CHANGES, handleChannelUpdate)

    // Clean up listener when component unmounts
    return () => {
      socketService.off(SOCKET_EVENT_UPDATE_CHANNEL_CHANGES, handleChannelUpdate)
    }
  }, [loggedinUser, params.channelId])

  return (
    <section className="channels">
      <ChannelsNav
        channels={channels}
        setIsAddChannelModalOpen={setIsAddChannelModalOpen}
        selected={selected}
        setSelected={setSelected}
      />
      {isAddChannelModalOpen && (
        <AddChannelModal
          setIsAddChannelModalOpen={setIsAddChannelModalOpen}
          addChannel={addChannel}
          setSelected={setSelected}
        />
      )}
      {isAddChatModalOpen && <AddChatModal setIsAddChatModalOpen={setIsAddChatModalOpen} addChat={addChat} />}
      {isAddFriendModalOpen && <AddFriendModal setIsAddFriendModalOpen={setIsAddFriendModalOpen} />}
      <Outlet />
    </section>
  )
}
