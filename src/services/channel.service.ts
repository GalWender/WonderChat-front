import { httpService } from "./http.service";
import { Channel } from "../interfaces/channel";
import store from "../store/store";
import { ChannelActionType } from "../interfaces/channel.store";
import { socketService, SOCKET_EMIT_SEND_CHANNEL_CHANGES } from './socket.service';

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
    return channel
}

async function add(channel: Channel) {
    socketService.emit(SOCKET_EMIT_SEND_CHANNEL_CHANGES, channel)
    return channel
}