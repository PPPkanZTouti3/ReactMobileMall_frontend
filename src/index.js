import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './assets/styles/antd-mobile.css'
import store from './redux/store'

import App from './App';


// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<Provider store={store}>
//     <App/>
// </Provider>);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
document.getElementById('root'));

