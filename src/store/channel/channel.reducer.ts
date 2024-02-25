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
      return { ...state, channels: action.payload }
    case ChannelActionType.SET_CHANNEL:
      return { ...state, channel: action.payload }
    case ChannelActionType.ADD_CHANNEL:
      return { ...state, channels: [...state.channels, action.payload] }
    case ChannelActionType.UPDATE_CHANNEL:
      const updatedChannel = action.payload
      const existingChannelIndex = state.channels.findIndex(channel => channel._id === updatedChannel._id)

      if (existingChannelIndex !== -1) {
        return {
          ...state,
          channels: state.channels.map((channel: Channel, index: number) => {
            if (index === existingChannelIndex) {
              return { ...updatedChannel }
            } else {
              return channel
            }
          }),
          channel: { ...updatedChannel }
        }
      } else {
        return {
          ...state,
          channels: [...state.channels, updatedChannel],
          channel: { ...updatedChannel } 
        }
      }

    default:
      return state
  }
}
export default reducer
