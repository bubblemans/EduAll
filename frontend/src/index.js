import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'

// const options = {
//   // you can also just use 'bottom center'
//   position: positions.BOTTOM_CENTER,
//   timeout: 5000,
//   offset: '30px',
//   // you can also just use 'scale'
//   transition: transitions.SCALE
// }
const alertOptions = {
  offset: '25px',
  timeout: 3000,
  transition: transitions.SCALE
}
// const AlertTemplate = ({ style, options, message, close }) => (
//   <div style={style}>
//     {options.type === 'info' && '!'}
//     {options.type === 'success' && ':)'}
//     {options.type === 'error' && ':('}
//     {message}
//     <button onClick={close}>X</button>
//   </div>
// )

ReactDOM.render(
  <AlertProvider 
      template={AlertTemplate}
      position={positions.TOP_CENTER}
      {...alertOptions}
      >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AlertProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
