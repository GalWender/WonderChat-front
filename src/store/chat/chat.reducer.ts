import { ChatActions, ChatActionType } from "../../interfaces/chat.store";
import { ReducerInitialState } from "../../interfaces/chat.store";

const initialState: ReducerInitialState = {
  chats: [],
  chat: null
}

const reducer = (state: ReducerInitialState = initialState, action: ChatActions) => {
  switch (action.type) {
    case ChatActionType.SET_CHATS:
      return { ...state, chats: action.payload };
    case ChatActionType.SET_CHAT:
      return { ...state, chat: action.payload };

    default:
      return state
  }
}
export default reducer
