import { Channel } from "./channel"

export interface ReducerInitialState {
    channels: Channel[]
    channel: Channel | null
}

interface SetChannelsAction {
    type: ChannelActionType.SET_CHANNELS,
    payload: Channel[]
}
interface SetChannelAction {
    type: ChannelActionType.SET_CHANNEL,
    payload: Channel 
}
interface AddChannelsAction {
    type: ChannelActionType.ADD_CHANNEL,
    payload: Channel
}

export enum ChannelActionType {
    SET_CHANNELS = "SET_CHANNELS",
    SET_CHANNEL = "SET_CHANNEL",
    ADD_CHANNEL = "ADD_CHANNEL",
}

export type ChannelActions = SetChannelsAction | AddChannelsAction | SetChannelAction