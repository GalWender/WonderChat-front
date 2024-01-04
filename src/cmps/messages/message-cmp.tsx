import { useDispatch, useSelector } from "react-redux"
import { State } from "../../store/store"
import { MessageList } from "./message-list"
import { bindActionCreators } from "redux"
import * as messageActions from "../../store/message/message.action"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Message } from "../../interfaces/message"

interface Props {
    // chatId: string
    messages: Message[];
}

export const MessageCmp = ({ messages }: Props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const { loadMessages } = bindActionCreators(messageActions, dispatch)


    useEffect(() => {
        if (params.chatId) {
            loadMessages({ chatId: params.chatId })
        }
    }, [params.chatId])

    // useEffect(() => {
    //     console.log('Messages have changed:', messages);
    // }, [messages]);

    return <section className="message">
        <MessageList messages={messages} />
    </section>
}