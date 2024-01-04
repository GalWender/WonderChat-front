import { Message } from "../../interfaces/message"

interface Props {
    message: Message
}
export const MessagePreview = ({message}:Props) => {
    return <section className="message-preview">

        <h3>{message.content}</h3>
    </section>
}