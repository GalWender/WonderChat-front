import { Message } from "../../interfaces/message";
import { MessagePreview } from "./message-preview";

interface Props {
    messages: Message[]
}
export const MessageList = ({ messages }: Props) => {

    const calcIsConsecutiveMessage = (currMessage: Message, beforeMessage: Message) => {
        console.log();
        
        return (beforeMessage?.messageBy.userId === currMessage?.messageBy.userId) &&
            (new Date(currMessage.createdAt).getTime() - new Date(beforeMessage.createdAt).getTime() <= 60000) ? true : false
    }

    return <section className="message-list">
        {messages.length > 0 && messages.map((message, idx, arr) => {

            return <MessagePreview
                key={message._id}
                message={message}
                stillUser={calcIsConsecutiveMessage(message, arr[idx - 1])}
                isLast={idx === arr.length - 1 ? true : false}
            />
        }
        )}
    </section>
}