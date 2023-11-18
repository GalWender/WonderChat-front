import { FormEvent, useMemo, useRef } from "react"
import useInputValidation from "../hooks/useInputValidation"
import useOutsideClick from "../hooks/useOutsideClick"
import { Dispatch } from "redux"
import { ChannelActions } from "../interfaces/channel.store"
import { Channel } from "../interfaces/channel"
import { useSelector } from "react-redux"
import { State } from "../store/store"
// import { useDispatch } from "react-redux"
// import { bindActionCreators } from 'redux'
// import * as channelActions from "../store/channel/channel.action"

interface Props {
    setIsAddChannelModalOpen: (value: boolean) => void
    addChannel: (channel: Channel) => (dispatch: Dispatch<ChannelActions>) => Promise<void>
}
export const AddChannelModal = ({ setIsAddChannelModalOpen,addChannel }: Props) => {
    const modalRef = useRef(null)
    const loggedinUser = useSelector((state:State)=>state.user.loggedinUser)
    // const dispatch = useDispatch()
    // const { addChannel } = bindActionCreators(channelActions, dispatch)

    const validationRules = useMemo(() => {
        return {
            name: {
                required: true,
            },
        }
    }, [])

    useOutsideClick(modalRef, () => setIsAddChannelModalOpen(false))

    const {
        inputValue: inputValueName,
        error: errorName,
        handleChange: handleChangeName,
        isInputValid: isNameValid
    } = useInputValidation('', 'name', validationRules.name)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const isNameValid1 = isNameValid()
        if (isNameValid1 && loggedinUser) {
            addChannel({logoSrc:"idk right now",name:inputValueName,participantsIds:[loggedinUser._id]} as Channel)
            setIsAddChannelModalOpen(false)
        }

    }
    //make the ccreating channel work 
    return <section className="add-channel-modal">
        <form ref={modalRef} onSubmit={handleSubmit}>
            <h5>Customize your channel  </h5>
            <p>
                Give your new channel a personality with a name and an icon.
                you can always change it later
            </p>
            <div className="field">
                <label htmlFor='name'>Channel Name<span className="red">*</span></label>
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
            <button className="btn1">Create</button>
        </form>
    </section>
}