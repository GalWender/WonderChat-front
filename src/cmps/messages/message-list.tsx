import { useEffect, useRef } from "react";
import { Message } from "../../interfaces/message";
import { MessagePreview } from "./message-preview";
import { useParams } from "react-router-dom";

interface Props {
    messages: Message[]
}
export const MessageList = ({ messages }: Props) => {
    const params = useParams()
    const messageListRef = useRef<any>(null)

    useEffect(() => {
        if (messageListRef.current.children.length > 0) {
            messageListRef.current.children[messageListRef.current.children.length - 1].scrollIntoView({
                block: "start"
            })
        }
    }, [messageListRef.current?.children.length,params])

    const calcIsConsecutiveMessage = (currMessage: Message, beforeMessage: Message) => {

        return (beforeMessage?.messageBy.userId === currMessage?.messageBy.userId) &&
            (new Date(currMessage.createdAt).getTime() - new Date(beforeMessage.createdAt).getTime() <= 60000) ? true : false
    }

    return <section ref={messageListRef} className="message-list">
        {messages.length > 0 && messages.map((message, idx, arr) => {

            return <MessagePreview
                key={message._id}
                message={message}
                stillUser={calcIsConsecutiveMessage(message, arr[idx - 1])}
            />
        }
        )}
    </section>
}