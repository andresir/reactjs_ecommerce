import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


// import './index.css';
// import jQuery from 'jquery';

// import $ from 'jquery';
// window.jQuery = $;

import './style/style.css';
import './style/bootstrap/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './style/font-awesome/css/font-awesome.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
