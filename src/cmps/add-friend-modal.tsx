import { FormEvent, useEffect, useMemo, useRef } from "react"
import useInputValidation from "../hooks/useInputValidation"
import useOutsideClick from "../hooks/useOutsideClick"
import { bindActionCreators } from "redux"
import * as userActions from "../store/user/user.action"
import * as channelActions from "../store/channel/channel.action"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store/store"
import { channelService } from "../services/channel.service"

interface Props {
    setIsAddFriendModalOpen: (value: boolean) => void;
    // chat: Chat;
    // addChat: (chat: Chat) => (dispatch: Dispatch<ChatActions>) => Promise<boolean>;
}
export const AddFriendModal = ({ setIsAddFriendModalOpen }: Props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const { loadUsers } = bindActionCreators(userActions, dispatch)
    const { updateChannel } = bindActionCreators(channelActions, dispatch)
    const modalRef = useRef(null)
    const navigate = useNavigate()
    // const chat = useSelector((state:State)=>state.chat.chat)
    const { loggedinUser, users } = useSelector((state: State) => state.user)
    const { channel } = useSelector((state: State) => state.channel)

    const validationRules = useMemo(() => {
        return {
            name: {
                required: false,
            },
        }
    }, [])

    const {
        inputValue: inputValueName,
        error: errorName,
        handleChange: handleChangeName,
        isInputValid: isNameValid
    } = useInputValidation('', 'name', validationRules.name)


    useEffect(() => {
        loadUsers({ txt: inputValueName })
    }, [inputValueName])

    useOutsideClick(modalRef, () => setIsAddFriendModalOpen(false))


    const handleInvite = async (ev: any, userId: string) => {
        ev.preventDefault()
        if (channel) {
            console.log('inside and has channel');
            
            const toUpdateChannel = { ...channel, participantsIds: [...channel?.participantsIds, userId] }
            // const updatedChannel = await updateChannel(toUpdateChannel)
            const updatedChannel = await channelService.update(toUpdateChannel)
            if(updatedChannel) {
                console.log('closing mmodal ');
                setIsAddFriendModalOpen(false)
            }
        }
    }

    return <section className="add-friend-modal">
        <form ref={modalRef}>
            <p>
                invite friends to {loggedinUser?.username}'s server
            </p>
            <div className="field">
                <label htmlFor='name'>Friend Username<span className="red">*</span></label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    value={inputValueName}
                    onChange={(e) => handleChangeName(e.target.value)}
                />
                <span className={`error red ${errorName ? "open" : ""}`}>
                    {errorName}
                </span>
            </div>
            <ul className="users-list">
                {users && users?.map((user) => {
                    return <li key={user._id}>
                        <p>{user.username}</p>
                        <button className="btn1" onClick={(ev) => handleInvite(ev, user._id)}>INVITE</button>
                    </li>
                })}
            </ul>
            {/* <button className="btn1">Create</button> */}
        </form>
    </section>
}