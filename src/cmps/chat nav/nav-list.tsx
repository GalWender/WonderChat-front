import { Chat } from "../../interfaces/chat";
import { NavPreview } from "./nav-preview";

interface Props {
    chats: Chat[];
}

export const NavList = ({ chats }: Props) => {
    return <section className="nav-list">
        {chats.length > 0 && chats.map((chat) =>
            <NavPreview chat={chat}/>
        )}
    </section>
}