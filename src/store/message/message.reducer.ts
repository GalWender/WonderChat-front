import { MessageActions, MessageActionType } from "../../interfaces/message.store";
import { ReducerInitialState } from "../../interfaces/message.store";

const initialState: ReducerInitialState = {
  messages: [],
  message: null,
  isAddMessageModalOpen: false,
}

const reducer = (state: ReducerInitialState = initialState, action: MessageActions) => {
  switch (action.type) {
    case MessageActionType.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case MessageActionType.SET_MESSAGE:
      return { ...state, message: action.payload };
    case MessageActionType.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case MessageActionType.SET_ADD_MESSAGE_MODAL:
      return { ...state, isAddMessageModalOpen: action.payload };
    default:
      return state
  }
}
export default reducer
