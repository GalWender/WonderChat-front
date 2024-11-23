import { SOCKET_EMIT_SEND_MESSAGE, socketService } from "./socket.service";
import store from "../store/store";
import { httpService } from "./http.service";
import { Message } from "../interfaces/message";
import { MessageActionType } from "../interfaces/message.store";

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
    // Emit to backend - UI is already updated
    socketService.emit(SOCKET_EMIT_SEND_MESSAGE, message)
    return message
}