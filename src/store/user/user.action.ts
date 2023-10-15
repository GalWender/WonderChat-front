import { Dispatch } from 'redux';
import { userService } from '../../services/user.service';
// import { showErrorMsg, isUsernameVerified } from '../../services/event-bus.service';
import { User } from './../../interfaces/user';

// Define action types
export const SET_USER = 'SET_USER';

// Define the User type (adjust as needed)

// Action creators
export function checkUsername(username: string) {
  return async (dispatch: Dispatch) => {
    try {
      await userService.verifyUsername(username);
    //   isUsernameVerified('VERIFIED');
    } catch (err) {
    //   isUsernameVerified('NOT_FOUND');
    }
  };
}

export function login(creds: { username: string; password: string }) {
  return async (dispatch: Dispatch) => {
    try {
      const loggedinUser: User | undefined = await userService.login(creds);
      dispatch({ type: SET_USER, loggedinUser });
    //   isUsernameVerified('LOGGEDIN_SUCCESSFULLY');
    } catch (err) {
    //   isUsernameVerified('INVALID_CREDS');
    }
  };
}

export function signup(creds: { username: string; password: string }) {
  return async (dispatch: Dispatch) => {
    try {
      const savedUser: User = await userService.signup(creds);
      dispatch({ type: SET_USER, loggedinUser: savedUser });
    } catch (err) {
      console.error('Oops:', err);
    //   showErrorMsg('Cannot signup');
    }
  };
}

export function updateUser(creds: User) {
  return async (dispatch: Dispatch) => {
    try {
      const savedUser: User = await userService.update(creds);
      dispatch({ type: SET_USER, loggedinUser: savedUser });
    } catch (err) {
      console.error('Oops:', err);
    }
  };
}

export function logout() {
  return async (dispatch: Dispatch) => {
    try {
      await userService.logout();
      dispatch({ type: SET_USER, loggedinUser: null });
    } catch (err) {
      console.error('Oops:', err);
    //   showErrorMsg('Cannot logout');
    }
  };
}
