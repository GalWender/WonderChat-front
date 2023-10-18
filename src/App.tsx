import { Routes } from 'react-router-dom'
import renderRoutes from './routes'
import { AppHeader } from './cmps/app-header'

function App() {

  return (
    <div className='app flex'>
      {/* <AppHeader /> */}
      <Routes>
        {renderRoutes()}
      </Routes>
    </div>
  )
}

export default App
