import { useEffect, useMemo, useState } from "react"
import { Message } from "../../interfaces/message"
import { utilService } from "../../services/util.service"
import { User } from "../../interfaces/user"
import * as userActions from "../../store/user/user.action"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

interface Props {
    message: Message;
    stillUser: boolean;
}
export const MessagePreview = ({ message, stillUser }: Props) => {
    const dispatch = useDispatch()
    const { getById } = bindActionCreators(userActions, dispatch)
    const [userOfMessage, setUserOfMessage] = useState<User>()
    // const userOfMessage: any = useMemo(async () => {
    //     return await getById(message.messageBy)
    //     // const res = await getById(message.messageBy)
    //     // console.log(res.name[0].toLocaleUpperCase());
    // }, [])

    useEffect(() => {
        (async () => {
            const resMessage: any = await getById(message.messageBy)
            setUserOfMessage(resMessage)
        })()

    }, [])
    // console.log(await getById(message.messageBy));

    return <section className="message-preview">

        {!stillUser &&
            <div className="first-preview">
                <div className="left">
                    <h4 className="profile-pic">
                        {userOfMessage?.name[0].toUpperCase()}
                        {/* {userOfMessage?.name} */}
                    </h4>
                </div>
                <div className="right">
                    <div className="top">
                        <p>{userOfMessage?.name}</p>
                        <small>{utilService.getStringFromDate(new Date(message.createdAt))}</small>
                    </div>
                    <p className="message-txt">{message.content}</p>
                </div>
            </div>
        }
        {
            stillUser &&
            <div className="right-continue">
                <p className="message-txt-continue">{message.content}</p>
            </div>
        }


    </section>
}