import { createRoot } from 'react-dom/client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style/index.scss'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './services/store'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './context/appContext';

createRoot(document.getElementById('root')!).render(
  <AppContext>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  </AppContext>
)
