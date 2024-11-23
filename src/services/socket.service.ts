import io,{Socket} from 'socket.io-client'
import { userService } from './user.service'

// Message events
export const SOCKET_EMIT_SET_MESSAGE_ID_CHANNEL = 'message-set-channel'
export const SOCKET_EMIT_SEND_MESSAGE = 'message-send'
export const SOCKET_EVENT_ADD_MESSAGE = 'message-add'
export const SOCKET_EVENT_UPDATE_MESSAGE = 'message-update'
export const SOCKET_EVENT_DELETE_MESSAGE = 'message-remove'
export const SOCKET_EVENT_MESSAGE_ERROR = 'message-error'

// Channel events
export const SOCKET_EMIT_SET_CHANNEL_ID_CHANNEL = 'channel-set-channel'
export const SOCKET_EMIT_SEND_CHANNEL_CHANGES = 'channel-send-changes'
export const SOCKET_EVENT_UPDATE_CHANNEL_CHANGES = 'channel-update-changes'

// User socket events
export const SOCKET_EMIT_LOGIN = 'set-user-socket'
export const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

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