// import { groupService } from "./group.service";
// import { httpService } from "./http.service"
import { SOCKET_EVENT_ADD_MESSAGE_CHANGES, SOCKET_EMIT_SEND_MESSAGE_CHANGES, SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL, socketService } from "./socket.service"; // fix
// import { userService } from "./user.service";
// import { utilService } from "./util.service";
// import { SOCKET_EMIT_SET_TEST_ID_MESSAGE, SOCKET_EMIT_SEND_TEST_CHANGES } from "./socket.service";
import store from "../store/store";
import { httpService } from "./http.service";
import { Message } from "../interfaces/message";
import { MessageActionType } from "../interfaces/message.store";
// import { getActionUpdateTask } from "../store/board/board.action";

/* ?- WebSocket */;
(() => {
    // socketService.on(SOCKET_EMIT_SEND_MESSAGE_CHANGES, (message) => {
    //     console.log('ok in message changes');
        
    //     store.dispatch({ type: MessageActionType.ADD_MESSAGE, payload: { ...message } })
    //     console.log(message,"this is a message that was added ok");
        
    // })
    socketService.on(SOCKET_EVENT_ADD_MESSAGE_CHANGES, (message) => {
        console.log('ok in message add changes event');
        store.dispatch({ type: MessageActionType.ADD_MESSAGE, payload: { ...message } })
        console.log(message,"this is a message that was added ok difff");
        // Dispatch an action to update the UI with the new message
        // store.dispatch(yourActionToUpdateUI(message));
    });
})();


export const messageService = {
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
const BASE_URL = 'message/'

// async function test() {
//     socketService.emit(SOCKET_EMIT_SET_TEST_ID_MESSAGE, 123)
//     socketService.emit(SOCKET_EMIT_SEND_TEST_CHANGES, 'hello')
// }

async function query(filterBy: Object) {
    if (filterBy) return httpService.get(BASE_URL, filterBy)
    //   else return httpService.get(BASE_URL)
    return httpService.get(BASE_URL)
}

async function getById(messageId: string | undefined) {
    return httpService.get(BASE_URL + messageId)
}

// async function remove({ taskId, groupId, boardId }) {
//   const group = await groupService.getById({ groupId, boardId })
//   group.tasks = group.tasks.filter((t) => t.id !== taskId)
//   return groupService.update({ group, boardId })
// }

// async function update({ task, groupId, boardId }, activity) {
//   if (activity) task = await addActivity(task, activity)
//   socketService.emit(SOCKET_EMIT_SET_TASK_ID_MESSAGE, task.id)
//   socketService.emit(SOCKET_EMIT_SEND_TASK_CHANGES, task)
//   const group = await groupService.getById({ groupId, boardId })
//   group.tasks = group.tasks.map((t) => (t.id !== task.id) ? t : task)
//   return groupService.update({ group, boardId })
// }

async function add(message: Message) {
    // socketService.emit()
    
    socketService.emit(SOCKET_EMIT_SEND_MESSAGE_CHANGES, message)
    const postedMessage = await httpService.post(BASE_URL, message)
    console.log(postedMessage);
    return postedMessage
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