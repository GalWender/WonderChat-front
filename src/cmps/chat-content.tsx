import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { State } from "../store/store"
import { bindActionCreators } from "redux"
import * as chatActions from "../store/chat/chat.action"
import * as messageActions from "../store/message/message.action"
import { useEffect, useRef } from "react"
import TextIcon from '../assets/svg/text-icon.svg?react'
import { messageService } from "../services/message.service"
import { Message } from "../interfaces/message"
import { ExpandingInput } from "./expanding-input"
import { MessageCmp } from "./messages/message-cmp"
import { SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL, socketService } from "../services/socket.service"

export const ChatContent = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const inputRef = useRef(null);
    // const channel = useSelector((state: State) => state.channel.channel)
    const chat = useSelector((state: State) => state.chat.chat)
    const messages = useSelector((state: State) => state.message.messages)
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)
    // console.log(channel);
    // const { loadChannel } = bindActionCreators(channelActions, dispatch)
    const { loadChat } = bindActionCreators(chatActions, dispatch)
    const { loadMessages } = bindActionCreators(messageActions, dispatch)


    useEffect(() => {
        // if (params.channelId) {
        //     console.log('checking paramas', params.channelId);
        //     loadChannel(params?.channelId)
        // }
        if (params.chatId) {
            console.log('checking paramas', params.chatId);
            socketService.emit(SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL, params.chatId)
            loadChat(params?.chatId)
            loadMessages({ chatId: params.chatId })
        }
    }, [params])


    const handleAddMessage = async () => {
        try {
            /*// @ts-ignore */
            const toAddMessage = { content: inputRef.current.textContent.trim(), createdAt: new Date(), messageBy: loggedinUser?._id, chatId: chat?._id } as Message;
            if (params.chatId) {
                const res = await messageService.add(toAddMessage, params.chatId);
                // const res = await messageService.add(toAddMessage);
                if (res) {
                    /*// @ts-ignore */
                    inputRef.current.textContent = ""
                    loadMessages({ chatId: params.chatId });
                }
            }
        } catch (error) {
            console.error('Error adding message:', error);
        }
    }

    return <section className="chat-content">
        <div className="header">
            <div className="left">
                <TextIcon />
                <p>{chat?.name}</p>
            </div>
            <div className="right"></div>
        </div>
        <div className="messages-container">
            <MessageCmp messages={messages} />
        </div>
        <div className="message-input-container">

            {/* <div
                ref={inputRef} className="message-input" datatext={`Message ${chat?.name}`} contentEditable suppressContentEditableWarning onKeyDown={(ev) => handleAddMessage(ev)}
            ></div> */}
            <ExpandingInput placeholder={`Message ${chat?.name}`} inputRef={inputRef} submitKey="Enter" submitFunc={handleAddMessage} />
        </div>

    </section>
}