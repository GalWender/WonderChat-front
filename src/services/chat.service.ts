import { httpService } from "./http.service";
import { Chat } from "../interfaces/chat";

export const chatService = {
    query,
    add,
    getById,
}

const BASE_URL = 'chat/'

async function query(filterBy: Object) {
    if (filterBy) return httpService.get(BASE_URL, filterBy)
    return httpService.get(BASE_URL)
}

async function getById(chatId: string | undefined) {
    return httpService.get(BASE_URL + chatId)
}

async function add(chat: Chat) {
    const postedChat = await httpService.post(BASE_URL, chat)
    // console.log(postedChat);
    return postedChat
}