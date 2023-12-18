import { Chat } from "./chat"

export interface ReducerInitialState {
    chats: Chat[]
    chat: Chat | null
}

interface SetChatsAction {
    type: ChatActionType.SET_CHATS,
    payload: Chat[]
}
interface SetChatAction {
    type: ChatActionType.SET_CHAT,
    payload: Chat 
}
interface AddChatsAction {
    type: ChatActionType.ADD_CHAT,
    payload: Chat
}

export enum ChatActionType {
    SET_CHATS = "SET_CHATS",
    SET_CHAT = "SET_CHAT",
    ADD_CHAT = "ADD_CHAT",
}

export type ChatActions = SetChatsAction | AddChatsAction | SetChatAction