import { httpService } from "./http.service";
import { Channel } from "../interfaces/channel";


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