import React from 'react';
import './index.css';
import {createRoot} from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from './redux/store.js'
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();