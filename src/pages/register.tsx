import { useEffect, useState, useMemo } from 'react';
import { getCountryPhoneCodes } from '../services/countryCode.service';
import { AppState } from '../interfaces/store';
import { useSelector } from 'react-redux';
import { CustomSelect } from '../cmps/custom-select';
import { BackgroundSvgs } from '../cmps/background-svgs';

interface Props {
    isPhone: boolean;
    setIsPhone: (val: boolean) => void;
    phoneCodes: string[];
    handleSubmit: (e: React.FormEvent) => void;
}

export const Register = () => {
    const device = useSelector((state: AppState) => state.userModule.isMobile);
    const [isPhone, setIsPhone] = useState<boolean>(true)
    const [phoneCodes, setPhoneCodes] = useState<string[]>([])

    type ComponentMap = {
        Mobile: (props: Props) => JSX.Element;
        Browser: (props: Props) => JSX.Element;
    };
    // isPhone, setIsPhone, phoneCodes
    const cmp = useMemo<ComponentMap>(() => {
        return {
            Mobile,
            Browser
        }
    }, [])

    useEffect(() => {
        async function fetchCountryPhoneCodes() {
            const data = await getCountryPhoneCodes()
            const sortedCodes = data.map((phoneObj)=>{
                return`${phoneObj.name} ${phoneObj.code}`
            })
            setPhoneCodes(sortedCodes);
        }
        fetchCountryPhoneCodes()

    }, [])

    const handleSubmit = (e: React.FormEvent) => {

    }

    return <section className="register">
        {cmp[device as keyof ComponentMap]({ isPhone, setIsPhone, phoneCodes, handleSubmit })}
    </section>
}

const Mobile = ({ isPhone, setIsPhone, phoneCodes, handleSubmit }: Props) => {
    const [selected1, setSelected1] = useState("")
    const [selected2, setSelected2] = useState("")
    const [selected3, setSelected3] = useState("")
    const [date, setDate] = useState({ month: "", day: "", year: "" })

    const currentYear = new Date().getFullYear();

    // Generate an array of months in words
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

    return <section className="mobile">
        {/* <BackgroundSvgs/> */}
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

                <a className="" href="">Aready have an account? </a>
            </div>
        </form>
    </section>
}

const Browser = ({ isPhone, setIsPhone, phoneCodes, handleSubmit }: Props) => {
    const [selected1, setSelected1] = useState("")
    const [selected2, setSelected2] = useState("")
    const [selected3, setSelected3] = useState("")
    const [date, setDate] = useState({ month: "", day: "", year: "" })

    const currentYear = new Date().getFullYear();

    // Generate an array of months in words
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

    return <section className="browser">
        <BackgroundSvgs/>
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

                <a className="" href="">Aready have an account? </a>
            </div>
        </form>
    </section>
}