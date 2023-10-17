import { useSelector, useDispatch } from 'react-redux';
import { chatService } from "../services/chat.service"
import { AppState } from '../interfaces/store';
import {useEffect} from "react"

export const Home = () => {
    const loggedinUser = useSelector((state: AppState) => state.userModule.loggedinUser);
    // const handleTestClick = () => {
    //     chatService.test()
    // }

    useEffect(()=>{
        console.log('hello',loggedinUser);
        
    })

    return (
        <section className="home">
            great start
            {/* <button onClick={handleTestClick}>test</button> */}
        </section>
    )
}