import { useState,useEffect,useRef } from 'react';

interface CustomSelectProps {
    placeholder: string;
    options: any[];
    handleSelected: (option: string) => void;
    selected:string;
}

export const CustomSelect = ({ placeholder, options, handleSelected, selected }: CustomSelectProps) => {
    const selectRef = useRef<HTMLDivElement | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleClickOutside = (e:MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
            setIsOpen(false);
          }
    }

    useEffect(()=>{
        window.addEventListener('click',handleClickOutside)
        return ()=>{
            window.removeEventListener('click',handleClickOutside)
        }
    },[])

    return <section ref={selectRef} className={`custom-select ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <p>{selected ? selected : placeholder} </p>
        {isOpen && <ul className="options-container flex column">
            {options.map((option, idx) => {
                return <li key={idx} className={`option option-${idx}`} onClick={() => handleSelected(option)}>{option}</li>
            })}
        </ul>}
    </section>
}