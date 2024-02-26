import { Message } from "../../interfaces/message";
import { MessagePreview } from "./message-preview";

interface Props {
    messages: Message[]
}
export const MessageList = ({ messages }: Props) => {

    return <section className="message-list">
        {messages.length > 0 && messages.map((message, idx) => 
        <MessagePreview
            key={message._id}
            message={message}
            stillUser={( messages[idx - 1]?.messageBy === message?.messageBy) ? true : false}
        />
        )}
    </section>
}