import { NavPreview } from "./nav-preview"

export const NavList = ({channels}) => {
return <section className="nav-list">
{channels.map((channel)=>
<NavPreview key={channel._id} channel={channel}/>
)}
</section>
}