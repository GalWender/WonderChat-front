import { useSelector } from "react-redux"
import { State } from "../store/store"
import { ChatsNav } from "./chat nav/chats-nav"

interface Props {

}
export const ChannelContent = () => {
    const channels = useSelector((state: State) => state.channel.channels)
    console.log('content channels',channels);
    

    return <section className="channel-content">
        {channels.length>0 && <ChatsNav channels={channels}/>}
    </section>
}