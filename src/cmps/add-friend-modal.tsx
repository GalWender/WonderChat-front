import { FormEvent, useEffect, useMemo, useRef } from "react"
import useInputValidation from "../hooks/useInputValidation"
import useOutsideClick from "../hooks/useOutsideClick"
import { Dispatch, bindActionCreators } from "redux"
import { ChatActions } from "../interfaces/chat.store"
import { Chat } from "../interfaces/chat"
import * as userActions from "../store/user/user.action"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store/store"

interface Props {
    setIsAddFriendModalOpen: (value: boolean) => void;
    // chat: Chat;
    // addChat: (chat: Chat) => (dispatch: Dispatch<ChatActions>) => Promise<boolean>;
}
export const AddFriendModal = ({ setIsAddFriendModalOpen }: Props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const { loadUsers } = bindActionCreators(userActions, dispatch)
    const modalRef = useRef(null)
    const navigate = useNavigate()
    // const chat = useSelector((state:State)=>state.chat.chat)
    const { loggedinUser, users } = useSelector((state: State) => state.user)

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


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const isNameValid1 = isNameValid()
        if (isNameValid1) {
            // const chatAdded: any = await addChat({ channelId: params.channelId, name: inputValueName, isDirectMessages: false } as Chat)
            // if (chatAdded) {
            //     console.log(chatAdded);

            //     // setSelected(chatAdded._id)
            //     // navigate(`/channels/${params.channelId}/${chatAdded._id}`)
            //     setIsAddFriendModalOpen(false)
            // }
            // else {

            // }
        }
    }
    return <section className="add-chat-modal">
        <form ref={modalRef} onSubmit={handleSubmit}>
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
            <ul>
                {users && users?.map((user) => {
                    return <li key={user._id}>{user.name}</li>
                })}
            </ul>
            {/* <button className="btn1">Create</button> */}
        </form>
    </section>
}