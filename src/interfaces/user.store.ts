import { User } from "./user";

export interface ReducerInitialState {
    loggedinUser: User | null;
}

interface SetUserAction {
    type: UserActionType.SET_USER,
    payload: User | null
}

export enum UserActionType {
    SET_USER = "SET_USER",
}

export type UserActions = SetUserAction 