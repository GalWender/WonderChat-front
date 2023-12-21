import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { State } from "../store/store"

export const ChatContent = () => {
    // const channel = useSelector((state: State) => state.channel.channel)
    // console.log(channel);
    
    const params = useParams()

    return <section className="chat-content">
        <div className="header">
            {/* <p>{channel?.name}</p> */}
        </div>
        <div className="messages-container">

        </div>
        <div className="message-input-container">

        </div>

    </section>
}