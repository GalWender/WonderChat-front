import { useMemo, useRef } from "react"
import useInputValidation from "../hooks/useInputValidation"
import useOutsideClick from "../hooks/useOutsideClick"

interface Props {
    setIsAddChannelModalOpen: (value: boolean) => void
}
export const AddChannelModal = ({ setIsAddChannelModalOpen }: Props) => {
    const modalRef = useRef(null)

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

    const handleSubmit = () => {

    }

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
        </form>
    </section>
}