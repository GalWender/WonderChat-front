import { useEffect, useState, useMemo } from 'react';
import { getCountryPhoneCodes } from '../services/countryCode.service';
import { AppState } from '../interfaces/store';
import { useSelector } from 'react-redux';
import { CustomSelect } from '../cmps/custom-select';
import { BackgroundSvgs } from '../cmps/background-svgs';
import { NavLink } from 'react-router-dom';

interface Props {
}

export const Register = () => {
    // const [phoneCodes, setPhoneCodes] = useState<string[]>([])

    const [selected1, setSelected1] = useState("")
    const [selected2, setSelected2] = useState("")
    const [selected3, setSelected3] = useState("")
    const [date, setDate] = useState({ month: "", day: "", year: "" })

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


    useEffect(() => {
        // async function fetchCountryPhoneCodes() {
        //     const data = await getCountryPhoneCodes()
        //     const sortedCodes = data.map((phoneObj) => {
        //         return `${phoneObj.name} ${phoneObj.code}`
        //     })
        //     setPhoneCodes(sortedCodes);
        // }
        // fetchCountryPhoneCodes()

    }, [])

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

    }

    return <section className="register">
        <BackgroundSvgs />
        <form onSubmit={handleSubmit}>
            <h5>Create an account</h5>
            <div className="field">
                <label htmlFor='email'>EMAIL<span className="red">*</span></label>
                <input type="email" id='email' />
            </div>
            <div className="field">
                <label htmlFor='name'>DISPLAY NAME</label>
                <input type="text" id='name' />
            </div>
            <div className="field">
                <label htmlFor='username'>USERNAME<span className="red">*</span></label>
                <input type="text" id='username' />
            </div>
            <div className="field">
                <label htmlFor='password'>PASSWORD<span className="red">*</span></label>
                <input type="password" id='password' />
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
                <div className="btn-container">
                    <button className="btn2">Continue</button>
                </div>

                <NavLink to={"/login"}>Aready have an account? </NavLink>
            </div>
        </form>
    </section>
}

