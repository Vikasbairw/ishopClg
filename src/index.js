import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainContext from './Page/MainContext';
import { Provider } from 'react-redux';
import store from './Page/Website/Store/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainContext>
      <App />
    </MainContext>
    </Provider>
    


  </React.StrictMode>
);

