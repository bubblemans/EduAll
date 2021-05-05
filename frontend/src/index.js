import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'

const alertOptions = {
  offset: '25px',
  timeout: 3000,
  transition: transitions.SCALE
}

ReactDOM.render(
  <AlertProvider 
      template={AlertTemplate}
      position={positions.TOP_CENTER}
      {...alertOptions}
      >
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </AlertProvider>,
  document.getElementById('root')
);
