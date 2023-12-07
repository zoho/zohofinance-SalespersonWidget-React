import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';


window.onload =  function() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
    window.ZFAPPS.extension.init().then((Zapp) => {
      window.Zapp = Zapp;
      window.ZFAPPS.invoke('RESIZE', { height: '550px', width: '600px' }).then(() => {
        root.render(<App />)// This will not loaded more than ones .
      });
    });
//-----------------------------

}


reportWebVitals();
