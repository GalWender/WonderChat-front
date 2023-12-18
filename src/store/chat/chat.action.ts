import { Chat } from './../../interfaces/chat';
import { Dispatch } from "redux"
import { ChatActions, ChatActionType } from "../../interfaces/chat.store"
import { chatService } from '../../services/chat.service';

export const loadChats = (filterBy: Object) => {
    return async (dispatch: Dispatch<ChatActions>) => {
        try {
            // const loggedinUser: any = await userService.login(creds)
            const chats: any = await chatService.query(filterBy)
            console.log('chats', chats);

            dispatch({ type: ChatActionType.SET_CHATS, payload: [...chats] })
        }
        catch (err) {
            console.log('there was an error when loading models', err);
        }
    }
}

// export const setChats = (chats: Chat[]) => {
//     return async (dispatch: Dispatch<ChatActions>) => {
//         try {
//             // const loggedinUser: any = await userService.login(creds)
//             // const chat: any = await chatService.query(filterBy)
//             // console.log('chats', chats);

//             dispatch({ type: ChatActionType.SET_CHAT, payload: { ...chat } })
//         }
//         catch (err) {
//             console.log('there was an error when setting chat', err);
//         }
//     }
// }

export const setChat = (chat: Chat) => {
    return async (dispatch: Dispatch<ChatActions>) => {
        try {
            // const loggedinUser: any = await userService.login(creds)
            // const chat: any = await chatService.query(filterBy)
            // console.log('chats', chats);

            dispatch({ type: ChatActionType.SET_CHAT, payload: { ...chat } })
        }
        catch (err) {
            console.log('there was an error when setting chat', err);
        }
    }
}

export const addChat = (chat: Chat) => {
    return async (dispatch: Dispatch<ChatActions>) => {
        try {
            const newChat: any = await chatService.add(chat)
            dispatch({ type: ChatActionType.ADD_CHAT, payload: { ...newChat } })
            return true
        }
        catch (err) {
            console.log('there was an error adding chat', err);
            return false
        }
    }
}