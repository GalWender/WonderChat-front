import { Channel } from "../../interfaces/channel"

interface Props {
    channel: Channel;
}

export const NavPreview = ({ channel }: Props) => {
    console.log(channel);
    
    return <section className="nav-preview">

    </section>
}