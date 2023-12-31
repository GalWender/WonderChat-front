// import { groupService } from "./group.service";
// import { httpService } from "./http.service"
import { SOCKET_EVENT_ADD_TEST_CHANGES, socketService } from "./socket.service";
// import { userService } from "./user.service";
// import { utilService } from "./util.service";
// import { SOCKET_EMIT_SET_TEST_ID_CHAT, SOCKET_EMIT_SEND_TEST_CHANGES } from "./socket.service";
import store from "../store/store";
import { httpService } from "./http.service";
import { Chat } from "../interfaces/chat";
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
    // test,
    query,
    add,
    getById,
    //   save,
    //   update,
    //   remove,
}

//?- Dev:
// const STORAGE_KEY = 'taskDB'
//?- Prod:
const BASE_URL = 'chat/'

// async function test() {
//     socketService.emit(SOCKET_EMIT_SET_TEST_ID_CHAT, 123)
//     socketService.emit(SOCKET_EMIT_SEND_TEST_CHANGES, 'hello')
// }

async function query(filterBy: Object) {
    if (filterBy) return httpService.get(BASE_URL, filterBy)
    //   else return httpService.get(BASE_URL)
    return httpService.get(BASE_URL)
}

async function getById(chatId: string | undefined) {
    return httpService.get(BASE_URL + chatId)
}

// async function remove({ taskId, groupId, boardId }) {
//   const group = await groupService.getById({ groupId, boardId })
//   group.tasks = group.tasks.filter((t) => t.id !== taskId)
//   return groupService.update({ group, boardId })
// }

// async function update({ task, groupId, boardId }, activity) {
//   if (activity) task = await addActivity(task, activity)
//   socketService.emit(SOCKET_EMIT_SET_TASK_ID_CHAT, task.id)
//   socketService.emit(SOCKET_EMIT_SEND_TASK_CHANGES, task)
//   const group = await groupService.getById({ groupId, boardId })
//   group.tasks = group.tasks.map((t) => (t.id !== task.id) ? t : task)
//   return groupService.update({ group, boardId })
// }

async function add(chat: Chat) {
    const postedChat = await httpService.post(BASE_URL, chat)
    console.log(postedChat);
    return postedChat
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