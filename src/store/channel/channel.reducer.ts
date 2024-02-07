import { Channel } from "../../interfaces/channel";
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
    case ChannelActionType.ADD_CHANNEL:
      return { ...state, channels: [...state.channels, action.payload] };
    case ChannelActionType.UPDATE_CHANNEL:
      console.log('updating channel in reducer', state.channels.map((channel: Channel) => {
        if (channel._id !== action.payload._id) return channel
        return action.payload
      }));
      
      return {
        ...state,
        channels: state.channels.map((channel: Channel) => {
          if (channel._id !== action.payload._id) return channel
          return action.payload
        }),
        channel: { ...action.payload }
      }

    default:
      return state
  }
}
export default reducer
