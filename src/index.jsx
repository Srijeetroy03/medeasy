import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import {Toaster} from 'react-hot-toast'

store.subscribe(() => {});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster/>
      <App />
    </Provider>
  </React.StrictMode>
);




