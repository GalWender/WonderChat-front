import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { State } from "../store/store"
import { bindActionCreators } from "redux"
import * as channelActions from "../store/channel/channel.action"
import * as chatActions from "../store/chat/chat.action"
import { useEffect } from "react"
import TextIcon from '../assets/svg/text-icon.svg?react'

export const ChatContent = () => {
    const dispatch = useDispatch()
    const params = useParams()
    // const channel = useSelector((state: State) => state.channel.channel)
    const chat = useSelector((state: State) => state.chat.chat)
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

        </div>

    </section>
}