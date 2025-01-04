import { useSelector } from 'react-redux'
import { State } from '../store/store'
import { useRef } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import { useNavigate } from 'react-router-dom'
import * as userActions from '../store/user/user.action'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

interface Props {
  setIsProfileModalOpen: (val: boolean) => void
}
const ProfileModal = ({ setIsProfileModalOpen }: Props) => {
  const modalRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { logout } = bindActionCreators(userActions, dispatch)
  const loggedinUser = useSelector((state: State) => state.user.loggedinUser)

  useOutsideClick(modalRef, () => setIsProfileModalOpen(false))

  const onLogout = async () => {
    try {
      await logout()
      setIsProfileModalOpen(false)
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

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
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </section>
  )
}

export default ProfileModal
