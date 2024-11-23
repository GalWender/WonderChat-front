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
  socketService 
} from '../services/socket.service'
import { MessageActionType } from '../interfaces/message.store'
import { State } from '../store/store'

export const ChatContent = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const inputRef = useRef<any>(null)
  const [pendingMessageId, setPendingMessageId] = useState<string | null>(null)
  const { loggedinUser } = useSelector((state: State) => state.user)
  const { messages } = useSelector((state: State) => state.message)
  const { chat } = useSelector((state: State) => state.chat)
  const { loadChat } = bindActionCreators(chatActions, dispatch)
  const { loadMessages } = bindActionCreators(messageActions, dispatch)

  useEffect(() => {
    if (params.chatId) {
      socketService.emit(SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL, params.chatId)
      loadChat(params?.chatId)
      loadMessages({ chatId: params.chatId })

      const handleNewMessage = (message: Message) => {
        console.log('New message:', message);
        
        if (pendingMessageId) {
          // This is our message coming back from the backend
          dispatch({ 
            type: MessageActionType.UPDATE_MESSAGE, 
            payload: { 
              ...message,
              tempId: pendingMessageId // Keep tempId for matching in reducer
            }
          })
          setPendingMessageId(null) // Clear the pending ID
        } else {
          // This is a new message from someone else
          dispatch({ type: MessageActionType.ADD_MESSAGE, payload: message })
        }
      }

      const handleUpdateMessage = (message: Message) => {
        console.log('Updated message:', message);
        dispatch({ type: MessageActionType.UPDATE_MESSAGE, payload: { ...message } })
      }

      const handleDeleteMessage = (messageId: string) => {
        console.log('Deleted message:', messageId);
        dispatch({ type: MessageActionType.REMOVE_MESSAGE, payload: messageId })
      }

      const handleMessageError = (error: any) => {
        console.error('Message error:', error);
        if (pendingMessageId) {
          // Update the message with error state using the stored tempId
          dispatch({ 
            type: MessageActionType.UPDATE_MESSAGE, 
            payload: { 
              tempId: pendingMessageId,
              hasError: true 
            }
          })
          setPendingMessageId(null) // Clear the pending ID
        }
      }

      socketService.on(SOCKET_EVENT_ADD_MESSAGE, handleNewMessage)
      socketService.on(SOCKET_EVENT_UPDATE_MESSAGE, handleUpdateMessage)
      socketService.on(SOCKET_EVENT_DELETE_MESSAGE, handleDeleteMessage)
      socketService.on(SOCKET_EVENT_MESSAGE_ERROR, handleMessageError)

      return () => {
        socketService.off(SOCKET_EVENT_ADD_MESSAGE, handleNewMessage)
        socketService.off(SOCKET_EVENT_UPDATE_MESSAGE, handleUpdateMessage)
        socketService.off(SOCKET_EVENT_DELETE_MESSAGE, handleDeleteMessage)
        socketService.off(SOCKET_EVENT_MESSAGE_ERROR, handleMessageError)
      }
    }
  }, [params.chatId, pendingMessageId]) 

  const handleAddMessage = async () => {
    try {
      const tempId = utilService.generateId()
      setPendingMessageId(tempId) // Store the tempId in state

      const toAddMessage = {
        content: inputRef.current.innerHTML.trim(),
        createdAt: new Date(),
        messageBy: { userId: loggedinUser?._id, name: loggedinUser?.name },
        chatId: chat?._id,
        _id: tempId,
        tempId
      } as Message

      if (params.chatId) {
        // Update UI immediately
        dispatch({ type: MessageActionType.ADD_MESSAGE, payload: { ...toAddMessage} })
        inputRef.current.textContent = ''

        // Then emit to backend
        try {
          await messageService.add(toAddMessage)
        } catch (error) {
          console.error('Error adding message:', error)
          dispatch({ 
            type: MessageActionType.UPDATE_MESSAGE, 
            payload: { ...toAddMessage, hasError: true } 
          })
          setPendingMessageId(null) // Clear the pending ID on error
        }
      }
    } catch (error) {
      console.error('Error in handleAddMessage:', error)
      setPendingMessageId(null) // Clear the pending ID on error
    }
  }

  const handleMessageRetry = async (message: Message) => {
    if (!message.hasError) return
    
    // Remove error state
    dispatch({ 
      type: MessageActionType.UPDATE_MESSAGE, 
      payload: { ...message, hasError: false } 
    })

    // Try sending again
    try {
      await messageService.add(message)
    } catch (error) {
      console.error('Error retrying message:', error)
      dispatch({ 
        type: MessageActionType.UPDATE_MESSAGE, 
        payload: { ...message, hasError: true } 
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
