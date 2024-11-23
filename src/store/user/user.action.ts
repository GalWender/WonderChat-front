import { User } from '../../interfaces/user'
import { Dispatch } from 'redux'
import { UserActions, UserActionType } from '../../interfaces/user.store'
import { userService } from '../../services/user.service'

export const signup = (creds: User) => {
  return async () => {
    try {
      await userService.signup(creds)
      console.log('ok')

      return true
    } catch (err) {
      console.log('failed signup')
      return false
    }
  }
}

export const login = (creds: { email: string; password: string }) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const loggedinUser: any = await userService.login(creds)
      dispatch({ type: UserActionType.SET_USER, payload: loggedinUser })
      return true
    } catch (err) {
      return false
    }
  }
}

export const getById = (userId: string) => {
  return async () => {
    try {
      const user: any = await userService.getById(userId)
      return user
    } catch (err) {
      return false
    }
  }
}

export const setIsAddFriendModalOpen = (isOpen: boolean) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.SET_ADD_FRIEND_MODAL, payload: isOpen })
    } catch (err) {
      console.log('there was an error when changing modal status', err)
    }
  }
}

export const setIsProfileModalOpen = (isOpen: boolean) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.SET_PROFILE_MODAL, payload: isOpen })
    } catch (err) {
      console.log('there was an error when changing modal status', err)
    }
  }
}

export const loadUsers = (filterBy: Object) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const users: any = await userService.getUsers(filterBy)
      dispatch({ type: UserActionType.SET_USERS, payload: [...users] })
    } catch (err) {
      console.log('there was an error when loading models', err)
    }
  }
}
