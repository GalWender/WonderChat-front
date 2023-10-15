import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
// import { boardReducer } from './board/board.reducer';
import { userReducer } from './user/user.reducer';

// Define your root reducer
const rootReducer = combineReducers({
//   boardModule: boardReducer,
  userModule: userReducer,
});

// Create the Redux store
const store: Store = createStore(rootReducer, applyMiddleware(thunk));

// Export the store
export default store;