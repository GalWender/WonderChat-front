import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as chatActions from '../store/chat/chat.action'
import * as messageActions from '../store/message/message.action'
import { useEffect, useRef, useState } from 'react'
import TextIcon from '../assets/svg/text-icon.svg?react'
import { MessageCmp } from './messages/message-cmp'
import { ExpandingInput } from './expanding-input'
import { Message } from '../interfaces/message'
import { utilService } from '../services/util.service'
import { messageService } from '../services/message.service'
import {
  SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL,
  SOCKET_EVENT_ADD_MESSAGE,
  SOCKET_EVENT_UPDATE_MESSAGE,
  SOCKET_EVENT_DELETE_MESSAGE,
  SOCKET_EVENT_MESSAGE_ERROR,
  socketService,
} from '../services/socket.service'
import { MessageActionType } from '../interfaces/message.store'
import { State } from '../store/store'
// TODO: right now the adding message works sockets are as meant to be just need to implement this effect for the rest of it to and other apis
export const ChatContent = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const inputRef = useRef<any>(null)
  // const [pendingMessageId, setPendingMessageId] = useState<string | null>(null)
  const { loggedinUser } = useSelector((state: State) => state.user)
  const { messages } = useSelector((state: State) => state.message)
  const { chat } = useSelector((state: State) => state.chat)
  const { loadChat } = bindActionCreators(chatActions, dispatch)
  const { loadMessages, addMessage, setupMessageSocketListeners } = bindActionCreators(messageActions, dispatch)

  useEffect(() => {
    setupMessageSocketListeners()
  }, [])

  useEffect(() => {
    if (params?.chatId) {
      socketService.emit(SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL, params.chatId)
      loadChat(params?.chatId)
      loadMessages({ chatId: params.chatId })
    }
  }, [params?.chatId])

  const handleAddMessage = () => {
    const tempId = utilService.generateId()

    const toAddMessage = {
      content: inputRef.current.innerHTML.trim(),
      createdAt: new Date(),
      messageBy: { userId: loggedinUser?._id, name: loggedinUser?.name },
      chatId: chat?._id,
      _id: tempId,
    } as Message

    addMessage(toAddMessage)
    inputRef.current.textContent = ''
  }

  const handleMessageRetry = async (message: Message) => {
    if (!message.hasError) return

    // Remove error state
    dispatch({
      type: MessageActionType.UPDATE_MESSAGE,
      payload: { ...message, hasError: false },
    })

    // Try sending again
    try {
      await messageService.add(message)
    } catch (error) {
      console.error('Error retrying message:', error)
      dispatch({
        type: MessageActionType.UPDATE_MESSAGE,
        payload: { ...message, hasError: true },
      })
    }
  }

  return (
    <section className="chat-content">
      <div className="header">
        <div className="left">
          <TextIcon />
          <p>{chat?.name}</p>
        </div>
        <div className="right"></div>
      </div>
      <div className="messages-container">
        <MessageCmp messages={messages} onRetry={handleMessageRetry} />
      </div>
      <div className="message-input-container">
        <ExpandingInput
          placeholder={`Type a message in ${chat?.name} chat...`}
          inputRef={inputRef}
          submitKey="Enter"
          submitFunc={handleAddMessage}
        />
      </div>
    </section>
  )
}
