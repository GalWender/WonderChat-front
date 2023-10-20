import { useEffect, useState, useMemo } from 'react';
import { getCountryPhoneCodes } from '../services/countryCode.service';
import { AppState } from '../interfaces/store';
import { useSelector } from 'react-redux';

export const Register = () => {
    const device = useSelector((state: AppState) => state.userModule.isMobile);
    const [isPhone, setIsPhone] = useState<boolean>(true)
    const [phoneCodes, setPhoneCodes] = useState<{ name: string; code: string }[]>([])

    type ComponentMap = {
        Mobile: () => JSX.Element;
        Browser: () => JSX.Element;
    };

    const cmp = useMemo<ComponentMap>(() => {
        return {
            Mobile,
            Browser
        }
    }, [])

    useEffect(() => {
        async function fetchCountryPhoneCodes() {
            const data = await getCountryPhoneCodes()
            setPhoneCodes(data);
        }
        fetchCountryPhoneCodes()

    }, [])

    const handleSubmit = (e: React.FormEvent) => {

    }

    return <section className="register">
        {cmp[device as keyof ComponentMap](isPhone, setIsPhone, phoneCodes)}
    </section>
}

const Mobile = ({ isPhone, setIsPhone, phoneCodes }: { isPhone: boolean, setIsPhone: (val: boolean) => void, phoneCodes: { name: string; code: string }[] }) => {
    return <section className="mobile">
        <h5>Enter phone or email</h5>
        <div className="isPhone-container">
            <p className="phone" onClick={() => setIsPhone(true)}>Phone</p>
            <p className="email" onClick={() => setIsPhone(false)}>Email</p>
            <div className={`selected ${isPhone ? "" : "toggle"}`}></div>
        </div>
        {/* <form onSubmit={handleSubmit}>
            {isPhone && <div className="phone-registration">
                <label htmlFor="code">Code</label>
                <select name="code">
                    <option></option>
                    {phoneCodes.map((phoneCode, idx) => {
                        return <option key={idx} value={JSON.stringify(phoneCode)}>
                            {phoneCode.name} ({phoneCode.code})
                        </option>
                    })}
                </select>
                <input type="tel" />
            </div>}
            {!isPhone && <div className="email-registration">

            </div>}
        </form> */}
    </section>
}

const Browser = ({ isPhone, setIsPhone, phoneCodes }: { isPhone: boolean, setIsPhone: (val: boolean) => void, phoneCodes: { name: string; code: string }[] }) => {
    return <section className="browser">

    </section>
}