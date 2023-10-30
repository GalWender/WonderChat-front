import { BackgroundSvgs } from "../cmps/background-svgs"
import { NavLink } from "react-router-dom"
import { useFormValidation } from "../hooks/useFormValidation"

interface Props {
}

export const Login = () => {
    const initialFormState = {
        email: '',
        password: '',
    };

    const validationRules = {
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
        password: {
            required: true,
            minLength: 6,
        },
    };

    const {
        formState,
        errors,
        handleChange,
        isFormValid,
        resetForm,
    } = useFormValidation(initialFormState, validationRules);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log('Form is valid. Submitting...');
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    };

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
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <span className={`error red ${errors.email ? "open" : ""}`}>{errors.email}</span>
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
                <a href="">Forgot your password?</a>
            </div>
            <div className="btn-container">
                <button className="btn2">Log In</button>
            </div>
            <p>Need an account? <NavLink to={"/register"}>Register</NavLink></p>
        </form>
    </section>
}
