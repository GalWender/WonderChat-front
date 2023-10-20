import { User } from "./user";

export interface UserState {
    loggedinUser: User | null;
    isMobile: string
    // other user-related properties
}

interface SetUserAction {
    type: UserActionType.SET_USER;
    loggedinUser: User; // Replace 'any' with the actual type of loggedinUser
}

export enum UserActionType {
    SET_USER = "SET_USER",
}

export type UserActions = SetUserAction 