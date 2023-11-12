import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import userReducer from "./user/user.reducer"
import channelReducer from "./channel/channel.reducer"

const reducers = combineReducers({
  user: userReducer,
  channel:channelReducer,
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
