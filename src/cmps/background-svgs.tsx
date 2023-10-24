import HeroChat from '../assets/svg/hero-chat.svg?react'
import HeroHangout from '../assets/svg/hero-hangout.svg?react'
import HeroListen from '../assets/svg/hero-bird-listen.svg?react'

export const BackgroundSvgs = () => {
    return <div className="svg-container">
    <HeroChat className="svg1" />
    <HeroHangout className="svg2" />
    <HeroListen className="svg3" />
</div>
}