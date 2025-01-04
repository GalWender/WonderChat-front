import { Channel } from './../../interfaces/channel';
import { Dispatch } from "redux"
import { ChannelActions, ChannelActionType } from "../../interfaces/channel.store"
import { channelService } from '../../services/channel.service';

export const loadChannels = (filterBy: Object) => {
    return async (dispatch: Dispatch<ChannelActions>) => {
        try {
            const channels: Channel[] = await channelService.query(filterBy)
            dispatch({ type: ChannelActionType.SET_CHANNELS, payload: [...channels] })
        }
        catch (err) {
            console.log('there was an error when loading channels', err);
        }
    }
}

export const loadChannel = (channelId: string| undefined) => {
    return async (dispatch: Dispatch<ChannelActions>) => {
        try {
            const channel: Channel = await channelService.getById(channelId)
            dispatch({ type: ChannelActionType.SET_CHANNEL, payload: { ...channel } })
        }
        catch (err) {
            console.log('there was an error when loading model', err);
        }
    }
}

export const setChannels = (channels: Channel[] | null = null) => {
    return (dispatch: Dispatch<ChannelActions>) => {
        dispatch({ type: ChannelActionType.SET_CHANNELS, payload: channels || [] })
        dispatch({ type: ChannelActionType.SET_CHANNEL, payload: null })
    }
}

export const addChannel = (channel: Channel) => {
    return async (dispatch: Dispatch<ChannelActions>): Promise<boolean> => {
        try {
            const newChannel: Channel = await channelService.add(channel)
            dispatch({ type: ChannelActionType.ADD_CHANNEL, payload: { ...newChannel } })
            return true
        }
        catch (err) {
            console.log('there was an error when adding channel', err);
            return false
        }
    }
}

export const updateChannel = (channel: Channel) => {
    return async (dispatch: Dispatch<ChannelActions>): Promise<boolean> => {
        try {
            const updatedChannel: Channel = await channelService.update(channel)
            dispatch({ type: ChannelActionType.UPDATE_CHANNEL, payload: { ...updatedChannel } })
            return true
        }
        catch (err) {
            console.log('there was an error when updating channel', err);
            return false
        }
    }
}