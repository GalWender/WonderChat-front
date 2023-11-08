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
            return false
        }
    }
}

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
        }
        catch (err) {
            throw new Error()
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

// export const getUsers = () => {
//     return async (dispatch: Dispatch<UserActions>) => {
//         try {
//             let res:any = await userService.query()
//             res = res.Users?.map((user: any) => {
//                 const userAttributes = user.Attributes.reduce((obj: any, { Name, Value }: { Name: string, Value: string }) => {
//                     obj[Name] = Value;
//                     return obj;
//                 }, {});
//                 let resUser: MiniUser = {
//                     _id: userAttributes.sub,
//                     firstname: userAttributes.given_name,
//                     lastname: userAttributes.family_name,
//                     email: userAttributes.email,
//                     phone: userAttributes.phone_number,
//                     code: userAttributes['custom:code'],
//                     group: userAttributes['custom:group'],
//                     favorite: JSON.parse(userAttributes['custom:favorite']),
//                     profilePic: userAttributes.picture,
//                     location: userAttributes['custom:location'],
//                     createdAt: +userAttributes['custom:createdAt']
//                 }
//                 if (userAttributes['custom:position']) {
//                     resUser.position = userAttributes['custom:position']
//                 }
//                 if (resUser.group === "adminGroup") {
//                     return false
//                 }
//                 return resUser
//             })
//             return res
//         } catch(err) {
//             throw err
//         }
//     }
// }

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