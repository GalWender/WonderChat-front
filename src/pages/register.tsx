import { useEffect, useState, useMemo } from 'react';
import { CustomSelect } from '../cmps/custom-select';
import { BackgroundSvgs } from '../cmps/background-svgs';
import { NavLink } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';

interface Props {
}

export const Register = () => {
    const [selected1, setSelected1] = useState("")
    const [selected2, setSelected2] = useState("")
    const [selected3, setSelected3] = useState("")
    const [date, setDate] = useState({ month: "", day: "", year: "" })

    const initialFormState = {
        email: '',
        name: '',
        username: '',
        password: '',
        birthday: '',
    };

    const validationRules = {
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
            pattern: /^(?:(?!\bundefined\b).)*$/,
        }
    };

    const currentYear = new Date().getFullYear();

    const months: string[] = useMemo(() => {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
    }, []);

    const days: number[] = useMemo(() => {
        return Array.from({ length: 31 }, (_, i) => i + 1);
    }, []);

    const years: number[] = useMemo(() => {
        const minYear = currentYear - 152;
        const maxYear = currentYear - 3;
        return Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);
    }, [currentYear]);

    const {
        formState,
        errors,
        handleChange,
        isFormValid,
        resetForm,
    } = useFormValidation(initialFormState, validationRules);

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


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleChange('birthday', `${date.month} ${date.day} ${date.year}`)
        if (isFormValid()) {
            // Submit the form or perform other actions
            console.log('Form is valid. Submitting...');
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
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <span className={`error red ${errors.email ? "open" : ""}`}>{errors.email}</span>
            </div>
            <div className="field">
                <label htmlFor='name'>DISPLAY NAME</label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    value={formState.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <span className={`error red ${errors.name ? "open" : ""}`}>{errors.name}</span>
            </div>
            <div className="field">
                <label htmlFor='username'>USERNAME<span className="red">*</span></label>
                <input
                    type="text"
                    id='username'
                    name='username'
                    value={formState.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                />
                <span className={`error red ${errors.username ? "open" : ""}`}>{errors.username}</span>
            </div>
            <div className="field">
                <label htmlFor='password'>PASSWORD<span className="red">*</span></label>
                <input
                    type="password"
                    id='password'
                    name="password"
                    value={formState.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                />
                <span className={`error red ${errors.password ? "open" : ""}`}>{errors.password}</span>
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
                <span className={`error red ${errors.birthday ? "open" : ""}`}>{errors.birthday}</span>
                <div className="btn-container">
                    <button className="btn2">Continue</button>
                </div>

                <NavLink to={"/login"}>Aready have an account? </NavLink>
            </div>
        </form>
    </section>
}

