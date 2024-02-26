import { httpService } from "./http.service";
import { Channel } from "../interfaces/channel";
import store from "../store/store";
import { ChannelActionType } from "../interfaces/channel.store";
import { socketService, SOCKET_EMIT_SEND_CHANNEL_CHANGES,SOCKET_EVENT_UPDATE_CHANNEL_CHANGES } from './socket.service';


(() => {
    socketService.on(SOCKET_EVENT_UPDATE_CHANNEL_CHANGES, async (channel) => {
        store.dispatch({ type: ChannelActionType.UPDATE_CHANNEL, payload: { ...channel } })
    })
  })()

export const channelService = {
    query,
    add,
    getById,
    update,
}

const BASE_URL = 'channel/'

async function query(filterBy: Object) {
    if (filterBy) return httpService.get(BASE_URL, filterBy)
    return httpService.get(BASE_URL)
}

async function getById(channelId: string | undefined) {
    return httpService.get(BASE_URL + channelId)
}

async function update(channel: Channel) {
    socketService.emit(SOCKET_EMIT_SEND_CHANNEL_CHANGES,channel)
    const updatedChannel = await httpService.put(BASE_URL + channel._id, channel)
    return updatedChannel
}

async function add(channel: Channel) {
    const addedChannel = await httpService.post(BASE_URL, channel)
    return addedChannel
}