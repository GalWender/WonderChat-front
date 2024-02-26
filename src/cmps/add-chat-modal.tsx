import { FormEvent, useMemo, useRef } from "react";
import useInputValidation from "../hooks/useInputValidation";
import useOutsideClick from "../hooks/useOutsideClick";
import { Dispatch } from "redux";
import { ChatActions } from "../interfaces/chat.store";
import { Chat } from "../interfaces/chat";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
    setIsAddChatModalOpen: (value: boolean) => void
    addChat: (chat: Chat) => (dispatch: Dispatch<ChatActions>) => Promise<boolean>;
}
export const AddChatModal = ({ setIsAddChatModalOpen, addChat }: Props) => {
    const params = useParams()
    const modalRef = useRef(null)
    const navigate = useNavigate()

    const validationRules = useMemo(() => {
        return {
            name: {
                required: true,
            },
        }
    }, [])

    useOutsideClick(modalRef, () => setIsAddChatModalOpen(false))

    const {
        inputValue: inputValueName,
        error: errorName,
        handleChange: handleChangeName,
        isInputValid: isNameValid
    } = useInputValidation('', 'name', validationRules.name)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const isNameValid1 = isNameValid()
        if (isNameValid1) {
            const chatAdded: any = await addChat({ channelId: params.channelId, name: inputValueName, isDirectMessages: false } as Chat)
            if (chatAdded) {
                navigate(`/channels/${params.channelId}/${chatAdded._id}`)
                setIsAddChatModalOpen(false)
            }
            else {

            }
        }
    }
    return <section className="add-chat-modal">
        <form ref={modalRef} onSubmit={handleSubmit}>
            <h5>Customize your chat  </h5>
            <p>
                Give your new chat a personality with a name and an icon.
                you can always change it later
            </p>
            <div className="field">
                <label htmlFor='name'>Chat Name<span className="red">*</span></label>
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