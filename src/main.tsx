import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom';
import App from './App.tsx'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
)
