// import { groupService } from "./group.service";
// import { httpService } from "./http.service"
import { SOCKET_EVENT_ADD_TEST_CHANGES, socketService } from "./socket.service";
// import { userService } from "./user.service";
// import { utilService } from "./util.service";
import { SOCKET_EMIT_SET_TEST_ID_CHANNEL,SOCKET_EMIT_SEND_TEST_CHANGES } from "./socket.service";
import store from "../store/store";
// import { getActionUpdateTask } from "../store/board/board.action";

/* ?- WebSocket */;
(() => {
    // socketService.on(SOCKET_EMIT_SEND_TEST_CHANGES, (res) => {
    //     // store.dispatch(getActionUpdateTask(task))
    //     console.log(res)
    // })
    socketService.on(SOCKET_EVENT_ADD_TEST_CHANGES, (res) => {
        console.log(res);
        // store.dispatch(getActionUpdateTask(task))
    })
})()


export const chatService = {
    test
    //   query,
    //   getById,
    //   save,
    //   update,
    //   remove,
}

//?- Dev:
// const STORAGE_KEY = 'taskDB'
//?- Prod:
const BASE_URL = 'chat/'

async function test() {
    socketService.emit(SOCKET_EMIT_SET_TEST_ID_CHANNEL, 123)
    socketService.emit(SOCKET_EMIT_SEND_TEST_CHANGES, 'hello')
}

// async function query(filterBy) {
//   if (filterBy) return httpService.get(BASE_URL, filterBy)
//   else return httpService.get(BASE_URL)
// }

// async function getById(taskId) {
//   socketService.emit(SOCKET_EMIT_SET_TASK_ID_CHANNEL, taskId)
//   return httpService.get(BASE_URL + taskId)
// }

// async function remove({ taskId, groupId, boardId }) {
//   const group = await groupService.getById({ groupId, boardId })
//   group.tasks = group.tasks.filter((t) => t.id !== taskId)
//   return groupService.update({ group, boardId })
// }

// async function update({ task, groupId, boardId }, activity) {
//   if (activity) task = await addActivity(task, activity)
//   socketService.emit(SOCKET_EMIT_SET_TASK_ID_CHANNEL, task.id)
//   socketService.emit(SOCKET_EMIT_SEND_TASK_CHANGES, task)
//   const group = await groupService.getById({ groupId, boardId })
//   group.tasks = group.tasks.map((t) => (t.id !== task.id) ? t : task)
//   return groupService.update({ group, boardId })
// }

// async function save({ title, groupId, boardId }) {
//   const group = await groupService.getById({ groupId, boardId })
//   const task = { id: utilService.makeId(), title }
//   group.tasks.push(task)
//   return groupService.update({ group, boardId })
// }

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