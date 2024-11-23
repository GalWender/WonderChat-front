import { useState, useEffect, useRef } from 'react'
import ArrowDown from '../assets/svg/arrow-down.svg?react'

interface CustomSelectProps {
  placeholder: string
  options: any[]
  handleSelected: (option: string) => void
  selected: string
}

export const CustomSelect = ({ placeholder, options, handleSelected, selected }: CustomSelectProps) => {
  const selectRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <section ref={selectRef} className={`custom-select ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="text-container flex align-center space-between">
        <p>{selected ? selected : placeholder} </p>
        <ArrowDown className="arrow-down" />
      </div>

      {isOpen && (
        <ul className="options-container flex column space-between">
          {options.map((option, idx) => {
            return (
              <li key={idx} className={`option option-${idx}`} onClick={() => handleSelected(option)}>
                {option}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
