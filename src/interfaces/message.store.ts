import { Message } from "./message"

export interface ReducerInitialState {
    messages: Message[],
    message: Message | null,
    isAddMessageModalOpen: boolean
}

interface SetMessagesAction {
    type: MessageActionType.SET_MESSAGES,
    payload: Message[]
}
interface SetMessageAction {
    type: MessageActionType.SET_MESSAGE,
    payload: Message
}
interface AddMessagesAction {
    type: MessageActionType.ADD_MESSAGE,
    payload: Message
}
interface SetAddMessageModalAction {
    type: MessageActionType.SET_ADD_MESSAGE_MODAL,
    payload: boolean
}

export enum MessageActionType {
    SET_MESSAGES = "SET_MESSAGES",
    SET_MESSAGE = "SET_MESSAGE",
    ADD_MESSAGE = "ADD_MESSAGE",
    SET_ADD_MESSAGE_MODAL = "SET_ADD_MESSAGE_MODAL",
}

export type MessageActions = SetMessagesAction | AddMessagesAction | SetMessageAction | SetAddMessageModalAction