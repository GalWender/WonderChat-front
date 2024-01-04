import { Message } from './../../interfaces/message';
import { Dispatch } from "redux"
import { MessageActions, MessageActionType } from "../../interfaces/message.store"
import { messageService } from '../../services/message.service';

export const loadMessages = (filterBy: Object) => {
    return async (dispatch: Dispatch<MessageActions>) => {
        try {
            // const loggedinUser: any = await userService.login(creds)
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

// export const setMessages = (messages: Message[]) => {
//     return async (dispatch: Dispatch<MessageActions>) => {
//         try {
//             // const loggedinUser: any = await userService.login(creds)
//             // const message: any = await messageService.query(filterBy)
//             // console.log('messages', messages);

//             dispatch({ type: MessageActionType.SET_MESSAGE, payload: { ...message } })
//         }
//         catch (err) {
//             console.log('there was an error when setting message', err);
//         }
//     }
// }

export const setMessage = (message: Message) => {
    return async (dispatch: Dispatch<MessageActions>) => {
        try {
            // const loggedinUser: any = await userService.login(creds)
            // const message: any = await messageService.query(filterBy)
            // console.log('messages', messages);

            dispatch({ type: MessageActionType.SET_MESSAGE, payload: { ...message } })
        }
        catch (err) {
            console.log('there was an error when setting message', err);
        }
    }
}

export const addMessage = (message: Message) => {
    return async (dispatch: Dispatch<MessageActions>) => {
        try {
            const newMessage: any = await messageService.add(message)
            dispatch({ type: MessageActionType.ADD_MESSAGE, payload: { ...newMessage } })
            return true
        }
        catch (err) {
            console.log('there was an error adding message', err);
            return false
        }
    }
}


// export const getAction