import { Chat } from "../../interfaces/chat";
import { NavPreview } from "./nav-preview";

interface Props {
    chats: Chat[];
    selected: string | undefined;
    setSelected: (value: string) => void;
}

export const NavList = ({ chats,selected,setSelected }: Props) => {
    return <section className="nav-list">
        {chats.length > 0 && chats.map((chat) =>
            <NavPreview key={chat._id} chat={chat} selected={selected} setSelected={setSelected}/>
        )}
    </section>
}