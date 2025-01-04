import { Message } from './../../interfaces/message';
import { Dispatch } from "redux"
import { MessageActions, MessageActionType } from "../../interfaces/message.store"
import { messageService } from '../../services/message.service';
import { socketService, SOCKET_EMIT_SEND_MESSAGE, SOCKET_EVENT_ADD_MESSAGE, SOCKET_EVENT_UPDATE_MESSAGE, SOCKET_EVENT_DELETE_MESSAGE, SOCKET_EVENT_MESSAGE_ERROR } from '../../services/socket.service';

export const loadMessages = (filterBy: Object) => {
    return async (dispatch: Dispatch<MessageActions>) => {
        try {
            const messages: any = await messageService.query(filterBy)
            dispatch({ type: MessageActionType.SET_MESSAGES, payload: [...messages] })
        }
        catch (err) {
            console.log('there was an error when loading models', err);
        }
    }
}

export const loadMessage = (messageId: string | undefined) => {
    return async (dispatch: Dispatch<MessageActions>) => {
        try {
            const message: any = await messageService.getById(messageId)
            dispatch({ type: MessageActionType.SET_MESSAGE, payload: { ...message } })
        }
        catch (err) {
            console.log('there was an error when loading model', err);
        }
    }
}

export const setIsAddMessageModalOpen = (isOpen: boolean) => {
    return async (dispatch: Dispatch<MessageActions>) => {
        try {
            dispatch({ type: MessageActionType.SET_ADD_MESSAGE_MODAL, payload: isOpen })
        }
        catch (err) {
            console.log('there was an error when changing modal status', err);
        }
    }
}

export const setMessage = (message: Message) => {
    return async (dispatch: Dispatch<MessageActions>) => {
        try {
            dispatch({ type: MessageActionType.SET_MESSAGE, payload: { ...message } })
        }
        catch (err) {
            console.log('there was an error when setting message', err);
        }
    }
}

export const addMessage = (message: Message) => {
    return (dispatch: Dispatch<MessageActions>) => {
        // Store the temp id before it gets modified
        const tempId = message._id

        // Optimistically add to store first
        dispatch({ type: MessageActionType.ADD_MESSAGE, payload: { ...message } })

        // Send to backend and handle response in callback
        socketService.emit(SOCKET_EMIT_SEND_MESSAGE, message)
    }
}

// Socket event handlers
export const setupMessageSocketListeners = () => {
    return (dispatch: Dispatch<MessageActions>) => {
        // Listen for new messages from other users
        socketService.on(SOCKET_EVENT_ADD_MESSAGE, ({message, tempId}) => {
            dispatch({
                type: MessageActionType.UPDATE_MESSAGE,
                payload: {
                    message,
                    tempId
                }
            })
        })

        // Listen for message updates from other users
        // socketService.on(SOCKET_EVENT_UPDATE_MESSAGE, (message: Message) => {
        //     dispatch({
        //         type: MessageActionType.UPDATE_MESSAGE,
        //         payload: {
        //             message
        //         }
        //     })
        // })

        // // Listen for message deletions from other users
        // socketService.on(SOCKET_EVENT_DELETE_MESSAGE, (messageId: string) => {
        //     dispatch({
        //         type: MessageActionType.REMOVE_MESSAGE,
        //         payload: messageId
        //     })
        // })

        // // Listen for message errors
        // socketService.on(SOCKET_EVENT_MESSAGE_ERROR, (error: any) => {
        //     console.error('Socket message error:', error)
        // })
    }
}
