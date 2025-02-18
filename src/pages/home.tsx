import HeroChat from '../assets/svg/hero-chat.svg?react'
import HeroHangout from '../assets/svg/hero-hangout.svg?react'
import HeroListen from '../assets/svg/hero-bird-listen.svg?react'
import Logo from '../assets/svg/whiteLogo.svg?react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

export const Home = () => {
  const navigate = useNavigate()

  // const name = 'gal'
  //   const name1 = useMemo(() => {
  //     return 'gal'
  //   }, [])

  //   const printGal = () => {
  //     console.log('gal')
  //   }
  // const printGal = useCallback((name: string) => {
  //   console.log(name)
  // }, [])

  // printGal('g')

  //   console.log(name1)

  return (
    <section className="home">
      <div className="header">
        <Logo />
        <h4>WonderChat</h4>
      </div>
      <div className="svg-container">
        <HeroChat className="svg1" />
        <HeroHangout className="svg2" />
        <HeroListen className="svg3" />
      </div>
      <div className="text-content-container">
        <h5>Welcome to WonderChat</h5>
        <p>Join over 100 million people who use WonderChat to talk with communities and friends.</p>
      </div>
      <div className="btn-container">
        <button className="btn1" onClick={() => navigate('/register')}>
          Register
        </button>
        <button className="btn2" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </section>
  )
}
