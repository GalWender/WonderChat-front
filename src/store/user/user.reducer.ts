import { userService } from '../../services/user.service';

// Define the user state interface
interface UserState {
  loggedinUser: any; // Replace 'any' with the actual type of loggedinUser
}

// Define the action type for setting the user
interface SetUserAction {
  type: 'SET_USER';
  loggedinUser: any; // Replace 'any' with the actual type of loggedinUser
}

// Define the initial state
const initialState: UserState = {
  loggedinUser: userService.getLoggedinUser(),
};

// Define the user reducer
export function userReducer(state: UserState = initialState, action: SetUserAction): UserState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedinUser: action.loggedinUser };

    default:
      return state;
  }
}