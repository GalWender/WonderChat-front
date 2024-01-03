import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { State } from "../store/store"
import { bindActionCreators } from "redux"
import * as channelActions from "../store/channel/channel.action"
import * as chatActions from "../store/chat/chat.action"
import { useEffect, useRef } from "react"
import TextIcon from '../assets/svg/text-icon.svg?react'
import { messageService } from "../services/message.service"
import { Message } from "../interfaces/message"
import { ExpandingInput } from "./expanding-input"

export const ChatContent = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const inputRef = useRef(null);
    // const channel = useSelector((state: State) => state.channel.channel)
    const chat = useSelector((state: State) => state.chat.chat)
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)
    // console.log(channel);
    // const { loadChannel } = bindActionCreators(channelActions, dispatch)
    const { loadChat } = bindActionCreators(chatActions, dispatch)


    useEffect(() => {
        // if (params.channelId) {
        //     console.log('checking paramas', params.channelId);
        //     loadChannel(params?.channelId)
        // }
        if (params.chatId) {
            console.log('checking paramas', params.chatId);
            loadChat(params?.chatId)
        }
    }, [params])

    const handleAddMessage = async () => {
        // console.log(inputRef.current.textContent.trim());
        // if()
        /*// @ts-ignore */
        const tempMessage = { content: inputRef.current.textContent.trim(), createdAt: new Date(), messageBy: loggedinUser?._id, chatId: chat?._id } as Message
        const res = await messageService.add(tempMessage)
        console.log('res', res);

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

        </div>
        <div className="message-input-container">

            {/* <div
                ref={inputRef} className="message-input" datatext={`Message ${chat?.name}`} contentEditable suppressContentEditableWarning onKeyDown={(ev) => handleAddMessage(ev)}
            ></div> */}
            <ExpandingInput placeholder={`Message ${chat?.name}`} inputRef={inputRef} submitKey="Enter" submitFunc={handleAddMessage} />
        </div>

    </section>
}