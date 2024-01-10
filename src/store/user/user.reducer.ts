import { UserActions, UserActionType } from "../../interfaces/user.store";
import { ReducerInitialState } from "../../interfaces/user.store";
import { userService } from '../../services/user.service';
const initialState: ReducerInitialState = {
  loggedinUser: userService.getLoggedinUser(),
  isAddFriendModalOpen: false,
  users: null,
}

const reducer = (state: ReducerInitialState = initialState, action: UserActions) => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return { ...state, loggedinUser: action.payload };
    case UserActionType.SET_USERS:
      return { ...state, users: action.payload };
    case UserActionType.SET_ADD_FRIEND_MODAL:
      return { ...state, isAddFriendModalOpen: action.payload };

    default:
      return state
  }
}
export default reducer
