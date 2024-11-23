import { Chat } from '../../interfaces/chat'
import TextIcon from '../../assets/svg/text-icon.svg?react'
import SettingsIcon from '../../assets/svg/settings-icon.svg?react'
import AddFriendIcon from '../../assets/svg/add-friend.svg?react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/user/user.action'
import * as chatActions from '../../store/chat/chat.action'

interface Props {
  chat: Chat
  selected: string | undefined
}

export const NavPreview = ({ chat, selected }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setChat } = bindActionCreators(chatActions, dispatch)
  const { setIsAddFriendModalOpen } = bindActionCreators(userActions, dispatch)

  const handleChatSelect = () => {
    setChat(chat)
    navigate(chat._id)
  }

  return (
    <section className={`nav-preview ${selected === chat._id ? 'selected' : ''}`} onClick={handleChatSelect}>
      <div className="left">
        <TextIcon />
        <small>{chat.name}</small>
      </div>
      <div className="right">
        <AddFriendIcon className="svg-1" onClick={() => setIsAddFriendModalOpen(true)} />
        <SettingsIcon className="svg-2" />
      </div>
    </section>
  )
}
