import { ChannelActions, ChannelActionType } from "../../interfaces/channel.store";
import { ReducerInitialState } from "../../interfaces/channel.store";

const initialState: ReducerInitialState = {
  channels: [],
  channel: null
}

const reducer = (state: ReducerInitialState = initialState, action: ChannelActions) => {
  switch (action.type) {
    case ChannelActionType.SET_CHANNELS:
      return { ...state, channels: action.payload };
    case ChannelActionType.SET_CHANNEL:
      return { ...state, channel: action.payload };

    default:
      return state
  }
}
export default reducer
