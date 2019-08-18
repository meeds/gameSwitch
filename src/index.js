import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/blackperle/normalize.css';
import './css/blackperle/blackperle.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App history={history} />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
