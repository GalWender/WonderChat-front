import PlusIcon from '../../assets/svg/plus-icon.svg?react'
import ArrowDownIcon from '../../assets/svg/arrow-down.svg?react'
import { Chat } from '../../interfaces/chat'
import { NavList } from './nav-list'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as chatActions from '../../store/chat/chat.action'
import * as userActions from '../../store/user/user.action'
import ProfilePreview from './profile-preview'
import ProfileModal from '../profile-modal'
import { State } from '../../store/store'

interface Props {
  chats: Chat[]
  selected: string | undefined
}

export const ChatsNav = ({ chats, selected }: Props) => {
  const dispatch = useDispatch()
  const { setIsAddChatModalOpen } = bindActionCreators(chatActions, dispatch)
  const { setIsProfileModalOpen } = bindActionCreators(userActions, dispatch)
  const { isProfileModalOpen } = useSelector((state: State) => state.user)

  return (
    <section className="chats-nav">
      <div className="text-chat-toggle-container">
        <div className="left">
          <ArrowDownIcon />
          <small>TEXT CHATS</small>
        </div>
        <PlusIcon className="plus-icon" onClick={() => setIsAddChatModalOpen(true)} />
      </div>
      <NavList chats={chats} selected={selected} />
      <ProfilePreview setIsProfileModalOpen={setIsProfileModalOpen} />
      {isProfileModalOpen && <ProfileModal setIsProfileModalOpen={setIsProfileModalOpen} />}
    </section>
  )
}
