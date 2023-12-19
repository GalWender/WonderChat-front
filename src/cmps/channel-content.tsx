import { useDispatch, useSelector } from "react-redux"
import { State } from "../store/store"
import { ChatsNav } from "./chat nav/chats-nav"
import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import * as chatActions from "../store/chat/chat.action"

interface Props {

}

export const ChannelContent = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { loadChats } = bindActionCreators(chatActions, dispatch)
    const chats = useSelector((state: State) => state.chat.chats)

    useEffect(() => {
        if (params.channelId) {
            loadChats({ channelId: params?.channelId })
        }
        console.log(chats);
    }, [params])

    return <section className="channel-content">
        {chats.length > 0 && <ChatsNav chats={chats} />}
        <Outlet />
    </section>
}