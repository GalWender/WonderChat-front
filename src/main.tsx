import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import App from './App.tsx'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
