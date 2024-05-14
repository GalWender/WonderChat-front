import { useSelector } from "react-redux"
import { State } from "../../store/store"

interface Props {
}

const ProfilePreview = () => {
    const loggedinUser = useSelector((state: State) => state.user.loggedinUser)

    return (
        <section className="profile-preview">
            <div className="left">
                <h4 className="profile-pic">
                    {loggedinUser?.name[0].toUpperCase()}
                </h4>
            </div>
            <div className="right">
                <div className="top">
                    <small>{loggedinUser?.name}</small>
                </div>
                <div className="bottom">
                    <small>{loggedinUser?.username}</small>
                </div>
            </div>
        </section>
    )
}

export default ProfilePreview