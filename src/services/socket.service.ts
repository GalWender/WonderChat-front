import io,{Socket} from 'socket.io-client'
import { userService } from './user.service'

// export const SOCKET_EMIT_SET_BOARD_ID_CHANNEL = 'board-set-channel'
// export const SOCKET_EMIT_SEND_BOARD_CHANGES = 'board-send-changes'
// export const SOCKET_EVENT_ADD_BOARD_CHANGES = 'board-add-changes'

// export const SOCKET_EMIT_SET_TASK_ID_CHANNEL = 'task-set-channel'
// export const SOCKET_EMIT_SEND_TASK_CHANGES = 'task-send-changes'
// export const SOCKET_EVENT_ADD_TASK_CHANGES = 'task-add-changes'
export const SOCKET_EMIT_SET_TEST_ID_CHANNEL = 'test-set-channel'
export const SOCKET_EMIT_SEND_TEST_CHANGES = 'test-send-changes'
export const SOCKET_EVENT_ADD_TEST_CHANGES = 'test-add-changes'

export const SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL = 'message-set-channel'
export const SOCKET_EMIT_SEND_MESSAGE_CHANGES = 'message-send-changes'
export const SOCKET_EVENT_ADD_MESSAGE_CHANGES = 'message-add-changes'

export const SOCKET_EMIT_SET_CHANNEL_ID_CHANNEL = 'channel-set-channel'
export const SOCKET_EMIT_SEND_CHANNEL_CHANGES = 'channel-send-changes'
export const SOCKET_EVENT_UPDATE_CHANNEL_CHANGES = 'channel-update-changes'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket:Socket | null = null;
  const socketService = {
    setup() {
      socket = io(baseUrl);
      setTimeout(() => {
        const user = userService.getLoggedinUser();
        if (user) this.login(user._id);
      }, 500);
    },
    on(eventName: string, cb: (...args: any[]) => void) {
      if (socket) {
        socket.on(eventName, cb);
      }
    },
    off(eventName: string, cb: ((...args: any[]) => void) | null = null) {
      if (!socket) return;
      if (!cb) {
        socket.removeAllListeners(eventName);
      } else {
        socket.off(eventName, cb);
      }
    },
    emit(eventName: string, data: any) {
      if (socket) {
        socket.emit(eventName, data);
      }
    },
    login(userId: string) {
      if (socket) {
        socket.emit(SOCKET_EMIT_LOGIN, userId);
      }
    },
    logout() {
      if (socket) {
        socket.emit(SOCKET_EMIT_LOGOUT);
      }
    },
    terminate() {
      socket = null;
    },
  };
  return socketService;
}