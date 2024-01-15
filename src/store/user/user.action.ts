import { User } from "../../interfaces/user"
import { Dispatch } from "redux"
import { UserActions,UserActionType } from "../../interfaces/user.store"
import { userService } from '../../services/user.service';
// import {toast} from "react-toastify"
// import { errorMsg, successMsg } from "../../interfaces/react-toastify";

export const signup = (creds: User) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            await userService.signup(creds)
            return true
        }
        catch (err) {
          console.log('failed signup');
            return false
        }
    }
}
//check why register doesn't put user in session storage

// export function logout() {
//     return async (dispatch: Dispatch<UserActions>) => {
//         try {
//             await userService.logout()
//             dispatch({ type: UserActionType.SET_USER, payload: null })
//         } catch (err) {
//             toast('Oops! Something went wrong, you cannot log out.')
//         }
//     }
// }

export const login = (creds: { email: string, password: string }) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const loggedinUser: any = await userService.login(creds)
            dispatch({ type: UserActionType.SET_USER, payload: loggedinUser })
            return true
        }
        catch (err) {
          return false
        }
    }
}


export const getById = (userId:string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const user: any = await userService.getById(userId)
            // console.log(user);
            
            return user
        }
        catch (err) {
          return false
        }
    }
}

export const setIsAddFriendModalOpen = (isOpen: boolean) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({ type: UserActionType.SET_ADD_FRIEND_MODAL, payload: isOpen })
        }
        catch (err) {
            console.log('there was an error when changing modal status', err);
        }
    }
}

// export const verifyUser = (email: string, code: string) => {
//     return async (dispatch: Dispatch<UserActions>) => {
//         try {
//             await userService.verifyUser(email, code)
//             return true
//         }
//         catch (err) {
//             return false
//         }
//     }
// }

// export const isLoggedIn = () => {
//     return async (dispatch: Dispatch<UserActions>) => {
//         try {
//             await userService.checkLoggedinUser()
//             return true
//         }
//         catch (err) {
//             return false
//         }
//     }
// }

// export const updateUser = (user: EditUser) => {
//     return async (dispatch: Dispatch<UserActions>) => {
//         try {
//             await userService.updateUser(user)
//             dispatch({ type: UserActionType.UPDATE_USER, payload: user })
//             toast('Your profile has been updated.', successMsg)
//         } catch(err) {
//             toast('Oops! Something went wrong!', errorMsg)
//             return
//         }
//     }
// }

// export const updateUserFavorites = (businessId:string, userFavoritesList:string[]) => {
//     return async (dispatch: Dispatch<UserActions>) => {
//         try {
//             const prevFavoritesLength = userFavoritesList.length

//             const newFavoritesList:string[] = userFavoritesList
//             const businessIdx = userFavoritesList.findIndex(itemId => itemId === businessId)
    
//             if (businessIdx === -1) {
//                 newFavoritesList.push(businessId)
//             } else {
//                 newFavoritesList.splice(businessIdx, 1)
//             }

//             dispatch({ type: UserActionType.UPDATE_FAVORITES_LIST, payload: newFavoritesList })

//             const updatedFavoritesList:any[] = await userService.updateUserFavoritesList(newFavoritesList)
            
//             if (updatedFavoritesList.length > prevFavoritesLength) {
//                 toast('Business was added to favorites!',successMsg)
//             } else {
//                 toast('Business removed from favorites.',errorMsg)
//             }
//         }catch {
//             toast('Oops! Somthing went wrong!', errorMsg)
//             dispatch({ type: UserActionType.UNDO_UPDATE_FAVORITES_LIST, payload: null })
//         }
//     }
// }

export const loadUsers = (filterBy: Object) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            // const loggedinUser: any = await userService.login(creds)
            const users: any = await userService.getUsers(filterBy)
            dispatch({ type: UserActionType.SET_USERS, payload: [...users] })
        }
        catch (err) {
            console.log('there was an error when loading models', err);
        }
    }
}

// export const setLoadingOn = () => {
//     return (dispatch: Dispatch<UserActions>) => {
//         dispatch({type: UserActionType.LOADING_ON, payload: null})
//     }
// }

// export const setLoadingOff = () => {
//     return (dispatch: Dispatch<UserActions>) => {
//         dispatch({type: UserActionType.LOADING_OFF, payload: null})
//     }
// }

