import { BackgroundSvgs } from "../cmps/background-svgs";
import { NavLink } from "react-router-dom";

interface Props {
    // isPhone: boolean;
    // setIsPhone: (val: boolean) => void;
    // phoneCodes: { name: string; code: string }[];
    // handleSubmit: (e: React.FormEvent) => void;
}

export const Login = () => {

    const handleSubmit = () => {

    }

    return <section className="login">
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
            <p>Need an account? <NavLink to={"/register"}>Register</NavLink></p>
        </form>
    </section>
}
