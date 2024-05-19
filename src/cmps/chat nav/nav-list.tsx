import { Chat } from "../../interfaces/chat";
import { NavPreview } from "./nav-preview";

interface Props {
    chats: Chat[];
    selected: string | undefined;
}

export const NavList = ({ chats,selected }: Props) => {
    return <section className="nav-list">
        {chats.length > 0 && chats.map((chat) =>
            <NavPreview key={chat._id} chat={chat} selected={selected}/>
        )}
    </section>
}