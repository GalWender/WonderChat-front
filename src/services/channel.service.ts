import { httpService } from "./http.service";
import { Channel } from "../interfaces/channel";
import store from "../store/store";
import { ChannelActionType } from "../interfaces/channel.store";
import { socketService, SOCKET_EMIT_SEND_CHANNEL_CHANGES,SOCKET_EVENT_UPDATE_CHANNEL_CHANGES } from './socket.service';


/* ?- WebSocket */;
(() => {
    // socketService.on(SOCKET_EMIT_SEND_CHANNEL_CHANGES, (message) => {
    //     console.log('ok in channel send changes');
        
    //     store.dispatch({ type: MessageActionType.ADD_MESSAGE, payload: { ...message } })
    //     console.log(message,"this is a message that was added ok");
        
    // })
    socketService.on(SOCKET_EVENT_UPDATE_CHANNEL_CHANGES, async (channel) => {
        console.log('ok in channel update changes event',channel);
        store.dispatch({ type: ChannelActionType.UPDATE_CHANNEL, payload: { ...channel } })
        console.log(channel,"this is a channel that was updated ok difff");
    })
  })()

export const channelService = {
    query,
    add,
    getById,
    update,
}

//?- Dev:
// const STORAGE_KEY = 'taskDB'
//?- Prod:
const BASE_URL = 'channel/'

async function query(filterBy: Object) {
    if (filterBy) return httpService.get(BASE_URL, filterBy)
    return httpService.get(BASE_URL)
}

async function getById(channelId: string | undefined) {
    return httpService.get(BASE_URL + channelId)
}

// async function remove({ taskId, groupId, boardId }) {
//   const group = await groupService.getById({ groupId, boardId })
//   group.tasks = group.tasks.filter((t) => t.id !== taskId)
//   return groupService.update({ group, boardId })
// }

async function update(channel: Channel) {
    console.log('channel that is sent to channel service to update',channel);
    
    // socketService.emit(SOCKET_EMIT_SET_CHANNEL_ID_CHANNEL,channel._id)
    socketService.emit(SOCKET_EMIT_SEND_CHANNEL_CHANGES,channel)
    const updatedChannel = await httpService.put(BASE_URL + channel._id, channel)
    return updatedChannel
}

async function add(channel: Channel) {
    const addedChannel = await httpService.post(BASE_URL, channel)
    return addedChannel
}

// function addActivity(task, activity) {
//   const user = userService.getLoggedinUser()
//   if (!user) return task
//   delete user.assignments
//   delete user.username
//   delete user.favBoards

//   const newActivity = {
//     id: utilService.makeId(),
//     type: activity.type,
//     createdAt: Date.now(),
//     byMember: user,
//     data: activity.data
//   }

//   if (!task.activities) task.activities = [newActivity]

//   else {
//     task.activities.unshift(newActivity)
//     if (task.activities.length > 15) task.activities.pop()
//   }

//   return Promise.resolve(task)
// }