import Logo from '../assets/svg/logo.svg?react'

export const AppHeader = () => {

    return <section className="app-header flex column align-center">
        <ul className="chat-list">
            <li className="direct-messages flex">
                <Logo className="logo-svg"/>
            </li>
        </ul>
    </section>
}