import { useSelector } from 'react-redux'
import { State } from '../store/store'
import { useRef } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

interface Props {
  setIsProfileModalOpen: (val: boolean) => void
}
const ProfileModal = ({ setIsProfileModalOpen }: Props) => {
  const modalRef = useRef(null)
  const loggedinUser = useSelector((state: State) => state.user.loggedinUser)

  useOutsideClick(modalRef, () => setIsProfileModalOpen(false))

  return (
    <section ref={modalRef} className="profile-modal">
      <div className="profile-pic-container">
        <img className="profile-pic" src={loggedinUser?.pic} />
      </div>
      <div className="content">
        <p className="username">
          Username: <span>{loggedinUser?.username}</span>
        </p>
        <p className="display-name">
          Name: <span>{loggedinUser?.name}</span>
        </p>
        <button className="btn-logout">Logout</button>
      </div>
    </section>
  )
}

export default ProfileModal
