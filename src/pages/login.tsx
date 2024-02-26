import { BackgroundSvgs } from "../cmps/background-svgs"
import { NavLink, useNavigate } from "react-router-dom"
import useInputValidation from "../hooks/useInputValidation"
import { useDispatch } from "react-redux"
import { bindActionCreators } from 'redux';
import * as userActions from "../store/user/user.action"


export const Login = () => {
    const dispatch = useDispatch()
    const naviate = useNavigate()
    const { login } = bindActionCreators(userActions, dispatch)

    const validationRules = {
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
        password: {
            required: true,
        },
    }

    const {
        inputValue: inputValueEmail,
        error: errorEmail,
        handleChange: handleChangeEmail,
        isInputValid: isEmailValid
    } = useInputValidation('', 'email', validationRules.email)
    const {
        inputValue: inputValuePassword,
        error: errorPassword,
        handleChange: handleChangePassword,
        isInputValid: isPasswordValid
    } = useInputValidation('', 'password', validationRules.password)

    const handleSubmit = async (e: any) => { 
        e.preventDefault()

        const isEmailValid1 = isEmailValid()
        const isPasswordValid1 = isPasswordValid()

        if (isEmailValid1 && isPasswordValid1) {
            const isLoggedIn: any = await login({ email: inputValueEmail, password: inputValuePassword })
            if(isLoggedIn) {
                naviate('/channels')
            }
            else {

            }
        } else {

            console.log('Form is invalid. Please check the fields.');
        }
    }

    return <section className="login">
        <BackgroundSvgs />
        <form onSubmit={handleSubmit}>
            <div className="header">
                <h5>Welcome back!</h5>
                <p>We're so excited to see you again!</p>
            </div>
            <div className="field">
                <label htmlFor='email'>EMAIL<span className="red">*</span></label>
                <input
                    type="text"
                    id='email'
                    name="email"
                    value={inputValueEmail}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                />
                <span className={`error red ${errorEmail ? "open" : ""}`}>{errorEmail}</span>
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
                <span className={`error red ${errorPassword ? "open" : ""}`}>{errorPassword}</span>
                <a href="">Forgot your password?</a>
            </div>
            <div className="btn-container">
                <button className="btn2">Log In</button>
            </div>
            <p>Need an account? <NavLink to={"/register"}>Register</NavLink></p>
        </form>
    </section>
}
