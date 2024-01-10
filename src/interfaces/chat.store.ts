import { Chat } from "./chat"

export interface ReducerInitialState {
    chats: Chat[],
    chat: Chat | null,
    isAddChatModalOpen: boolean,
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
interface SetAddChatModalAction {
    type: ChatActionType.SET_ADD_CHAT_MODAL,
    payload: boolean
}

export enum ChatActionType {
    SET_CHATS = "SET_CHATS",
    SET_CHAT = "SET_CHAT",
    ADD_CHAT = "ADD_CHAT",
    SET_ADD_CHAT_MODAL = "SET_ADD_CHAT_MODAL",
}

export type ChatActions = SetChatsAction | AddChatsAction | SetChatAction | SetAddChatModalAction