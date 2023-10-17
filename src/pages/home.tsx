import { useSelector, useDispatch } from 'react-redux';
// import { chatService } from "../services/chat.service"
import { AppState } from '../interfaces/store';
import { useEffect } from "react"

export const Home = () => {
    const loggedinUser = useSelector((state: AppState) => state.userModule.loggedinUser);
    // const handleTestClick = () => {
    //     chatService.test()
    // }

    const handleRegister = () => {

    }

    const handleLogin = () => {
        
    }
    
    return (
        <section className="home">
            <div className="btn-container">
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
            </div>
        </section>
    )
}