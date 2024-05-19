import { Message } from "../../interfaces/message";
import { utilService } from "../../services/util.service";

interface Props {
    message: Message;
    stillUser: boolean;
}
export const MessagePreview = ({ message, stillUser }: Props) => {

    return <section className="message-preview">
        {!stillUser &&
            <div className="first-preview">
                <div className="left">
                    <h4 className="profile-pic">
                        {message.messageBy.name[0].toUpperCase()}
                    </h4>
                </div>
                <div className="right">
                    <div className="top">
                        <p>{message.messageBy.name}</p>
                        <small>{utilService.getDateAsString(new Date(message.createdAt))}</small>
                        <small>{utilService.getTimeAsString(new Date(message.createdAt))}</small>
                    </div>
                    <pre className="message-txt">{message.content}</pre>
                </div>
            </div>
        }
        {
            stillUser &&
            <div className="right-continue">
                <pre className="message-txt-continue">{message.content}</pre>
            </div>
        }


    </section>
}