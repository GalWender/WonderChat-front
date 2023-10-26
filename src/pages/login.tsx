import { useSelector } from "react-redux";
import { AppState } from "../interfaces/store";
import { useMemo } from "react"
import { BackgroundSvgs } from "../cmps/background-svgs";

interface Props {
    // isPhone: boolean;
    // setIsPhone: (val: boolean) => void;
    // phoneCodes: { name: string; code: string }[];
    // handleSubmit: (e: React.FormEvent) => void;
}

export const Login = () => {
    const device = useSelector((state: AppState) => state.userModule.isMobile);

    type ComponentMap = {
        Mobile: (props: Props) => JSX.Element;
        Browser: (props: Props) => JSX.Element;
    };

    const cmp = useMemo<ComponentMap>(() => {
        return {
            Mobile,
            Browser
        }
    }, [])

    return <section className="login">
        {cmp[device as keyof ComponentMap]({})}
    </section>
}

const Mobile = () => {
  
    const handleSubmit = () => {

    }

    return <section className="mobile">
        {/* <BackgroundSvgs/> */}
        <form onSubmit={handleSubmit}>
            <div className="header">
                <h5>Welcome back!</h5>
                <p>We're so excited to see you again!</p>
            </div>
            <div className="field">
                <label htmlFor='email-phone'>EMAIL OR PHONE NUMBER<span className="red">*</span></label>
                <input type="text" id='email-phone' />
            </div>
            <div className="field">
                <label htmlFor='password'>PASSWORD<span className="red">*</span></label>
                <input type="password" id='password' />
                <a href="">Forgot your password?</a>
            </div>
            <div className="btn-container">
                <button className="btn2">Log In</button>
            </div>
            <p>Need an account? <a href="/register">Register</a></p>
        </form>
    </section>
}

const Browser = () => {

    const handleSubmit = () => {

    }

    return <section className="browser">
        <BackgroundSvgs/>
        <form onSubmit={handleSubmit}>
            <div className="header">
                <h5>Welcome back!</h5>
                <p>We're so excited to see you again!</p>
            </div>
            <div className="field">
                <label htmlFor='email-phone'>EMAIL OR PHONE NUMBER<span className="red">*</span></label>
                <input type="text" id='email-phone' />
            </div>
            <div className="field">
                <label htmlFor='password'>PASSWORD<span className="red">*</span></label>
                <input type="password" id='password' />
                <a href="">Forgot your password?</a>
            </div>
            <div className="btn-container">
                <button className="btn2">Log In</button>
            </div>
            <p>Need an account? <a href="/register">Register</a></p>
        </form>
    </section>
} 