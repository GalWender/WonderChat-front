import { chatService } from "../services/chat.service"

export const Home = () => {
    const handleTestClick = () => {
        chatService.test()
    }
    return (
        <section className="home">
            great start 
            <button onClick={handleTestClick}>test</button>
        </section>
    )
}