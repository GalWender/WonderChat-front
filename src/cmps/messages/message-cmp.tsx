import { MessageList } from "./message-list";
import { Message } from "../../interfaces/message";

interface Props {
    messages: Message[];
}

export const MessageCmp = ({ messages }: Props) => {

    return <section className="message">
        <MessageList messages={messages} />
    </section>
}