import { ForwardedRef } from "react";

interface Props {
    inputRef: ForwardedRef<HTMLDivElement>;
    // handKeyPress:(value:KeyboardEvent)=> void
    submitKey: string;
    placeholder: string;
    submitFunc: () => void
}

export const ExpandingInput = ({ inputRef, submitKey, placeholder, submitFunc }: Props) => {
    const handleKeyPress = (ev: KeyboardEvent) => {
        if (ev.key === submitKey && !ev.shiftKey) {
            ev.preventDefault()
            submitFunc()
        } else if (ev.key === submitKey && ev.shiftKey) { }
    }
    return <div
        /*// @ts-ignore */
        ref={inputRef} className="message-input" datatext={placeholder} contentEditable suppressContentEditableWarning onKeyDown={(ev) => handleKeyPress(ev)}
        style={{
            maxHeight: '45vh',
            overflowY: 'auto',
            width: '100%',
        }}
    ></div>
}