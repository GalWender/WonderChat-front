import { Channel } from "./channel"

export interface ReducerInitialState {
    channels: Channel[]
}

interface SetChannelsAction {
    type: ChannelActionType.SET_CHANNELS,
    payload: Channel[]
}
interface AddChannelsAction {
    type: ChannelActionType.ADD_CHANNEL,
    payload: Channel
}

export enum ChannelActionType {
    SET_CHANNELS = "SET_CHANNELS",
    ADD_CHANNEL = "ADD_CHANNEL",
}

export type ChannelActions = SetChannelsAction | AddChannelsAction