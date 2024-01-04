import { Message } from "../../interfaces/message"
import { MessagePreview } from "./message-preview"

interface Props {
    messages: Message[]
}
export const MessageList = ({ messages }: Props) => {
    
    return <section className="message-list">
        {messages.length > 0 && messages.map((message) => <MessagePreview key={message._id} message={message} />
        )}
    </section>
}