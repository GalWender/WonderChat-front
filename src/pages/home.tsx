import HeroChat from '../assets/svg/hero-chat.svg?react'
import HeroHangout from '../assets/svg/hero-hangout.svg?react'
import HeroListen from '../assets/svg/hero-bird-listen.svg?react'
import Logo from '../assets/svg/whiteLogo.svg?react'
import { useNavigate } from 'react-router-dom';
import { AppState } from '../interfaces/store';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

interface Props {
    // isPhone: boolean;
    // setIsPhone: (val: boolean) => void;
    // phoneCodes: { name: string; code: string }[];
    // handleSubmit: (e: React.FormEvent) => void;
}

export const Home = () => {
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

    return <section className="home">
        {cmp[device as keyof ComponentMap]({})}
    </section>
}

const Mobile = () => {
    const navigate = useNavigate()

    return <section className="mobile">
        <div className="header">
            <Logo />
            <h4>WonderChat</h4>
        </div>
        <div className="svg-container">
            <HeroChat className="svg1" />
            <HeroHangout className="svg2" />
            <HeroListen className="svg3" />
        </div>
        <div className="text-content-container">
            <h5>Welcome to WonderChat</h5>
            <p>Join over 100 million people who use WonderChat to talk with communities and friends.</p>
        </div>
        <div className="btn-container">
            <button className="btn1" onClick={() => navigate("/register")}>Register</button>
            <button className="btn2" onClick={() => navigate("/login")}>Login</button>
        </div>
    </section>
}

const Browser = () => {
    const navigate = useNavigate()
    return <section className="browser">
        <div className="header">
            <Logo />
            <h4>WonderChat</h4>
        </div>
        <div className="svg-container">
            <HeroChat className="svg1" />
            <HeroHangout className="svg2" />
            <HeroListen className="svg3" />
        </div>
        <div className="text-content-container">
            <h5>Welcome to WonderChat</h5>
            <p>Join over 100 million people who use WonderChat to talk with communities and friends.</p>
        </div>
        <div className="btn-container">
            <button className="btn1" onClick={() => navigate("/register")}>Register</button>
            <button className="btn2" onClick={() => navigate("/login")}>Login</button>
        </div>
    </section>
}