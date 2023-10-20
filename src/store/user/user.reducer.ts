import { isMobile } from 'react-device-detect';
import { UserActionType, UserActions, UserState } from '../../interfaces/user.store';
import { userService } from '../../services/user.service';

// Define the action type for setting the user

// Define the initial state
const initialState: UserState = {
  loggedinUser: userService.getLoggedinUser(),
  isMobile: isMobile ? "Mobile" : "Browser"
};

// Define the user reducer
export function userReducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionType.SET_USER:
      return { ...state, loggedinUser: action.loggedinUser };

    default:
      return state;
  }
}