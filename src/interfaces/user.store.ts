import { User } from './user'

export interface ReducerInitialState {
  loggedinUser: User | null
  users: User[] | null
  isAddFriendModalOpen: boolean
  isProfileModalOpen: boolean
}

interface SetUserAction {
  type: UserActionType.SET_USER
  payload: User | null
}
interface SetUsersAction {
  type: UserActionType.SET_USERS
  payload: User[] | null
}

interface SetAddFriendModalAction {
  type: UserActionType.SET_ADD_FRIEND_MODAL
  payload: boolean
}

interface SetProfileModalAction {
  type: UserActionType.SET_PROFILE_MODAL
  payload: boolean
}

export enum UserActionType {
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
  SET_ADD_FRIEND_MODAL = 'SET_ADD_FRIEND_MODAL',
  SET_PROFILE_MODAL = 'SET_PROFILE_MODAL',
}

export type UserActions = SetUserAction | SetUsersAction | SetAddFriendModalAction | SetProfileModalAction
