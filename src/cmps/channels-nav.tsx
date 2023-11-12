import { useEffect } from "react"
import { NavList } from "./nav-list"
import * as channelActions from "../store/channel/channel.action"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { State } from "../store/store"

export const ChannelsNav = () => {
    const dispatch = useDispatch()
    const { loadChannels } = bindActionCreators(channelActions, dispatch)
    const channels = useSelector((state:State)=>state.channel.channels)

    useEffect(()=>{
        loadChannels()
    },[channels])
    
    return <section className="channels-nav">
        <NavList channels={channels}/>
    </section>
}