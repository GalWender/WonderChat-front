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
    case MessageActionType.UPDATE_MESSAGE:
      return { 
        ...state, 
        messages: state.messages.map(msg => {
          // If we have a tempId in the payload, match by tempId
          if (action.payload.tempId && msg.tempId === action.payload.tempId) {
            delete action.payload.tempId
            return action.payload;
          }
          // Otherwise match by _id
          if (msg._id === action.payload._id) {
            return action.payload;
          }
          return msg;
        })
      };
    case MessageActionType.REMOVE_MESSAGE:
      return { 
        ...state, 
        messages: state.messages.filter(msg => msg._id !== action.payload) 
      };
    case MessageActionType.SET_ADD_MESSAGE_MODAL:
      return { ...state, isAddMessageModalOpen: action.payload };
    default:
      return state
  }
}
export default reducer
