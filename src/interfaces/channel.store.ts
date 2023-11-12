import { Channel } from "./channel"

export interface ReducerInitialState {
    channels: Channel[]
}

interface SetChannelsAction {
    type: ChannelActionType.SET_CHANNELS,
    payload: Channel[]
}

export enum ChannelActionType {
    SET_CHANNELS = "SET_CHANNELS",
}

export type ChannelActions = SetChannelsAction 