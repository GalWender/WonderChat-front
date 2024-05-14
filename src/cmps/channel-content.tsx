import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import { ChatsNav } from "./chat nav/chats-nav";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as chatActions from "../store/chat/chat.action";

export const ChannelContent = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { loadChats } = bindActionCreators(chatActions, dispatch)
    const chats = useSelector((state: State) => state.chat.chats)
    const [selected, setSelected] = useState(params.chatId)

    useEffect(() => {
        loadChats({ channelId: params?.channelId })
    }, [params.channelId,params.chatId])


    return <section className="channel-content">
        <ChatsNav chats={chats} selected={selected} setSelected={setSelected} />
        <Outlet />
    </section>
}