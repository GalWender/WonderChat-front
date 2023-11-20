import { Channel } from './../../interfaces/channel';
import { Dispatch } from "redux"
import { ChannelActions, ChannelActionType } from "../../interfaces/channel.store"
import { channelService } from '../../services/channel.service';

export const loadChannels = (filterBy:Object) => {
    return async (dispatch: Dispatch<ChannelActions>) => {
        try {
            // const loggedinUser: any = await userService.login(creds)
            const channels: any = await channelService.query(filterBy)
            console.log('channels', channels);

            dispatch({ type: ChannelActionType.SET_CHANNELS, payload: [ ...channels ] })
        }
        catch (err) {
            console.log('there was an error when loading models', err);
        }
    }
}

export const addChannel = (channel: Channel) => {
    return async (dispatch: Dispatch<ChannelActions>) => {
        try {
            const newChannel: any = await channelService.add(channel)
            dispatch({ type: ChannelActionType.ADD_CHANNEL, payload: { ...newChannel } })
            return true
        }
        catch (err) {
            console.log('there was an error adding channel', err);
            return false
        }
    }
}