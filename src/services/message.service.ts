import { SOCKET_EVENT_ADD_MESSAGE_CHANGES, SOCKET_EMIT_SEND_MESSAGE_CHANGES, socketService } from "./socket.service";
import store from "../store/store";
import { httpService } from "./http.service";
import { Message } from "../interfaces/message";
import { MessageActionType } from "../interfaces/message.store";

(() => {
    socketService.on(SOCKET_EVENT_ADD_MESSAGE_CHANGES, (message) => {
        store.dispatch({ type: MessageActionType.ADD_MESSAGE, payload: { ...message } })
    })
})()


export const messageService = {
    query,
    add,
    getById,
}

const BASE_URL = 'message/'

async function query(filterBy: Object) {
    if (filterBy) return httpService.get(BASE_URL, filterBy)
    return httpService.get(BASE_URL)
}

async function getById(messageId: string | undefined) {
    return httpService.get(BASE_URL + messageId)
}


async function add(message: Message) {
    socketService.emit(SOCKET_EMIT_SEND_MESSAGE_CHANGES, message)
    const postedMessage = await httpService.post(BASE_URL, message)
    // console.log(postedMessage)
    return postedMessage
}