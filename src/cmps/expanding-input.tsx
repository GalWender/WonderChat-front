import { ForwardedRef } from 'react'

interface Props {
  inputRef: ForwardedRef<HTMLDivElement>
  submitKey: string
  placeholder: string
  submitFunc: () => void
}

export const ExpandingInput = ({ inputRef, submitKey, placeholder, submitFunc }: Props) => {
  const handleKeyPress = (ev: KeyboardEvent) => {
    if (ev.key === submitKey && !ev.shiftKey) {
      ev.preventDefault()
      submitFunc()
    } else if (ev.key === submitKey && ev.shiftKey) {
    }
  }
  return (
    <div
      ref={inputRef}
      className="message-input"
      /*// @ts-ignore */
      datatext={placeholder}
      contentEditable
      suppressContentEditableWarning
      /*// @ts-ignore */
      onKeyDown={(ev) => handleKeyPress(ev)}
      style={{
        maxHeight: '45vh',
        overflowY: 'auto',
        width: '100%',
      }}
    ></div>
  )
}
