import { User } from "./user";

export interface AppState {
    userModule: UserState;
    // chatModule: ChatState;
    // other pieces of state go here
  }
  
  interface UserState {
    loggedinUser: User | null;
    // other user-related properties
  }

  interface ChatState {
    // Define chat-related state properties
  }