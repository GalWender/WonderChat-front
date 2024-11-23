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
interface UpdateMessageAction {
    type: MessageActionType.UPDATE_MESSAGE,
    payload: Message
}
interface RemoveMessageAction {
    type: MessageActionType.REMOVE_MESSAGE,
    payload: string
}
interface SetAddMessageModalAction {
    type: MessageActionType.SET_ADD_MESSAGE_MODAL,
    payload: boolean
}

export enum MessageActionType {
    SET_MESSAGES = "SET_MESSAGES",
    SET_MESSAGE = "SET_MESSAGE",
    ADD_MESSAGE = "ADD_MESSAGE",
    UPDATE_MESSAGE = "UPDATE_MESSAGE",
    REMOVE_MESSAGE = "REMOVE_MESSAGE",
    SET_ADD_MESSAGE_MODAL = "SET_ADD_MESSAGE_MODAL",
}

export type MessageActions = 
    | SetMessagesAction 
    | AddMessagesAction 
    | SetMessageAction 
    | UpdateMessageAction 
    | RemoveMessageAction 
    | SetAddMessageModalAction