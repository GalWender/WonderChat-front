import { BackgroundSvgs } from "../cmps/background-svgs"
import { NavLink } from "react-router-dom"
import { useValidation } from "../hooks/useFormValidation"
import { useState } from "react";

interface Props {
    // isPhone: boolean
    // setIsPhone: (val: boolean) => void
    // phoneCodes: { name: string code: string }[]
    // handleSubmit: (e: React.FormEvent) => void
}

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { errors, validateForm } = useValidation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name,value);
        
        setFormData({ ...formData, [name]: value });
        console.log(formData);
        
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm(formData)) {
          // Form is valid, proceed with your logic (e.g., submit the form).
          console.log("Form data is valid:", formData);
        } else {
          console.log("Form data is invalid.");
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
                    value={formData.email}
                    onChange={handleInputChange}
                />
               {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="field">
                <label htmlFor='password'>PASSWORD<span className="red">*</span></label>
                <input
                    type="password"
                    id='password'
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
                <a href="">Forgot your password?</a>
            </div>
            <div className="btn-container">
                <button className="btn2">Log In</button>
            </div>
            <p>Need an account? <NavLink to={"/register"}>Register</NavLink></p>
        </form>
    </section>
}
