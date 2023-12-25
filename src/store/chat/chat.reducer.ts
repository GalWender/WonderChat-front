import { ChatActions, ChatActionType } from "../../interfaces/chat.store";
import { ReducerInitialState } from "../../interfaces/chat.store";

const initialState: ReducerInitialState = {
  chats: [],
  chat: null,
  isAddChatModalOpen: false,
}

const reducer = (state: ReducerInitialState = initialState, action: ChatActions) => {
  switch (action.type) {
    case ChatActionType.SET_CHATS:
      return { ...state, chats: action.payload };
    case ChatActionType.SET_CHAT:
      return { ...state, chat: action.payload };
    case ChatActionType.ADD_CHAT:
      return { ...state, chats: [...state.chats, action.payload] };
    case ChatActionType.SET_ADD_CHAT_MODAL:
      return { ...state, isAddChatModalOpen: action.payload };
    default:
      return state
  }
}
export default reducer
