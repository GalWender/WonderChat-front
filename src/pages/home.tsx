import { useSelector, useDispatch } from 'react-redux';
// import { chatService } from "../services/chat.service"
import { AppState } from '../interfaces/store';
import { useEffect } from "react"
import HeroChat from '../assets/svg/hero-chat.svg?react'
import HeroHangout from '../assets/svg/hero-hangout.svg?react'
import HeroListen from '../assets/svg/hero-bird-listen.svg?react'
import Logo from '../assets/svg/whiteLogo.svg?react'

export const Home = () => {
    //example
    // const loggedinUser = useSelector((state: AppState) => state.userModule.loggedinUser);

    const handleRegister = () => {

    }

    const handleLogin = () => {

    }

    return (
        <section className="home flex column">
            <div className="header flex align-center">
                <Logo/>
                <h4>WonderChat</h4>
            </div>
            <div className="svg-container flex column">
                <HeroChat className="svg1"/>
                <HeroHangout className="svg2"/>
                <HeroListen className="svg3"/>
            </div>
            <div className="text-content-container flex column">
                <h5>Welcome to WonderChat</h5>
                <p>Join over 100 million people who use WonderChat to talk with communities and friends.</p>
            </div>
            <div className="btn-container flex column">
                <button className="btn1" onClick={handleRegister}>Register</button>
                <button className="btn2" onClick={handleLogin}>Login</button>
            </div>
        </section>
    )
}