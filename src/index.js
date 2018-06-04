import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { BrowserRouter as Router } from 'react-router-dom';
import attachFastClick from 'fastclick'
import 'antd/lib/style/index.less';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

const store = configureStore()

attachFastClick.attach(document.body)

document.getElementById('root').addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);

const Root = () => {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
//registerServiceWorker();