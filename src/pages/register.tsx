import { useEffect, useState, useMemo } from 'react';
import { CustomSelect } from '../cmps/custom-select';
import { BackgroundSvgs } from '../cmps/background-svgs';
import { NavLink } from 'react-router-dom';
import useInputValidation from '../hooks/useInputValidation';
import { User } from '../interfaces/user';
import { utilService } from '../services/util.service';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from "../store/user/user.action"

interface Props {
}

export const Register = () => {
    const dispatch = useDispatch()
    const { signup } = bindActionCreators(userActions, dispatch)
    const [selected1, setSelected1] = useState("")
    const [selected2, setSelected2] = useState("")
    const [selected3, setSelected3] = useState("")
    const [date, setDate] = useState<any>({ month: null, day: null, year: null })

    const validationRules = useMemo(() => {
        return {
            email: {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            },
            name: {
                required: false,
                minLength: 2,
            },
            username: {
                required: true,
                minLength: 2,
            },
            password: {
                required: true,
                minLength: 6,
            },
            birthday: {
                required: true,
                pattern: /^(?:(?!\bnull\b).)*$/,
            }
        }
    }, [])

    const currentYear = useMemo(() => {
        return new Date().getFullYear()
    }, [])

    const months: string[] = useMemo(() => {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
    }, []);

    const days: number[] = useMemo(() => {
        return Array.from({ length: 31 }, (_, i) => i + 1);
    }, [])

    const years: number[] = useMemo(() => {
        const minYear = currentYear - 152;
        const maxYear = currentYear - 3;
        return Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);
    }, [currentYear])

    // input validation hook
    const {
        inputValue: inputValueEmail,
        error: errorEmail,
        handleChange: handleChangeEmail,
        isInputValid: isEmailValid
    } = useInputValidation('', 'email', validationRules.email)
    const {
        inputValue: inputValueName,
        error: errorName,
        handleChange: handleChangeName,
        isInputValid: isNameValid
    } = useInputValidation('', 'name', validationRules.name)
    const {
        inputValue: inputValueUsername,
        error: errorUsername,
        handleChange: handleChangeUsername,
        isInputValid: isUsernameValid
    } = useInputValidation('', 'username', validationRules.username)
    const {
        inputValue: inputValuePassword,
        error: errorPassword,
        handleChange: handleChangePassword,
        isInputValid: isPasswordValid
    } = useInputValidation('', 'password', validationRules.password)
    //created a custom one for the birthday section which is not an input
    const {
        inputValue: inputValueBirthday,
        error: errorBirthday,
        handleChange: handleChangeBirthday,
        // isInputValid: isBirthdayValid
    } = useInputValidation('', 'birthday', validationRules.birthday)


    //date selection handling
    const handleSelected = (option: string) => {
        if (months.includes(option)) {
            setSelected1(option)
            setDate({ ...date, month: option })
        } else if (days.includes(parseInt(option))) {
            setSelected2(option)
            setDate({ ...date, day: option })
        } else if (years.includes(parseInt(option))) {
            setSelected3(option)
            setDate({ ...date, year: option })
        }

    }

    useEffect(() => {
        if (date.month && date.day && date.year) {
            handleChangeBirthday(`${date.month},${date.day},${date.year}`)
        }
    }, [date])

    // i think i could have made a custom hook for my custom select but this seems fine for now
    const isBirthdayValid = () => {
        console.log('date for check', date);

        if (date.day && date.month && date.year) {
            return true
        }
        handleChangeBirthday(`${date.month},${date.day},${date.year}`)
        return false
    }

    //form submittion handling 
    const handleSubmit = (e: any) => { //blame typescript for not having this prebuilt in the FormEvent
        e.preventDefault()

        // a bit hardcoded but how many fields would you really ever have in one form...
        const isEmailValid1 = isEmailValid()
        const isNameValid1 = isNameValid()
        const isUsernameValid1 = isUsernameValid()
        const isPasswordValid1 = isPasswordValid()
        const isBirthdayValid1 = isBirthdayValid()


        if (isEmailValid1 && isNameValid1 && isUsernameValid1 && isPasswordValid1 && isBirthdayValid1) {
            const toRegisterUser: User = {
                _id: utilService.makeId(),
                email: inputValueEmail,
                name: inputValueName?.trim() ? inputValueName : inputValueUsername,
                username: inputValueUsername,
                password: inputValuePassword,
                birthday: inputValueBirthday,
            }
            console.log('user to reg', toRegisterUser);

            signup(toRegisterUser)
            console.log('Form is valid. Submitting...')
        } else {

            console.log('Form is invalid. Please check the fields.');
        }
    }

    return <section className="register">
        <BackgroundSvgs />
        <form onSubmit={handleSubmit}>
            <h5>Create an account</h5>
            <div className="field">
                <label htmlFor='email'>EMAIL<span className="red">*</span></label>
                <input
                    type="text"
                    id='email'
                    name='email'
                    value={inputValueEmail}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                />
                <span className={`error red ${errorEmail ? "open" : ""}`}>
                    {errorEmail}
                </span>
            </div>
            <div className="field">
                <label htmlFor='name'>DISPLAY NAME</label>
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
            <div className="field">
                <label htmlFor='username'>USERNAME<span className="red">*</span></label>
                <input
                    type="text"
                    id='username'
                    name='username'
                    value={inputValueUsername}
                    onChange={(e) => handleChangeUsername(e.target.value)}
                />
                <span className={`error red ${errorUsername ? "open" : ""}`}>
                    {errorUsername}
                </span>
            </div>
            <div className="field">
                <label htmlFor='password'>PASSWORD<span className="red">*</span></label>
                <input
                    type="password"
                    id='password'
                    name="password"
                    value={inputValuePassword}
                    onChange={(e) => handleChangePassword(e.target.value)}
                />
                <span className={`error red ${errorPassword ? "open" : ""}`}>
                    {errorPassword}
                </span>
            </div>
            <div className="field">
                <label>DATE OF BIRTH<span className="red">*</span></label>
                <div className="date-container">
                    <CustomSelect
                        placeholder="Month"
                        options={months}
                        handleSelected={handleSelected}
                        selected={selected1}
                    />
                    <CustomSelect
                        placeholder="Day"
                        options={days}
                        handleSelected={handleSelected}
                        selected={selected2}
                    />
                    <CustomSelect
                        placeholder="Year"
                        options={years}
                        handleSelected={handleSelected}
                        selected={selected3}
                    />
                </div>
                <span className={`error red ${errorBirthday ? "open" : ""}`}>{errorBirthday}</span>
            </div>
            <div className="btn-container">
                <button className="btn2">Continue</button>
            </div>

            <NavLink to={"/login"}>Aready have an account? </NavLink>
        </form>
    </section>
}

