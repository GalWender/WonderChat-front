import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import userReducer from "./user/user.reducer"
import channelReducer from "./channel/channel.reducer"
import chatReducer from "./chat/chat.reducer"

const reducers = combineReducers({
  user: userReducer,
  channel:channelReducer,
  chat:chatReducer,
})
//export the reducers types for useSelector useage 
export type State = ReturnType<typeof reducers>

// Create the Redux store
const store: Store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
)

// Export the store
export default store;
