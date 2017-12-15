import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/lib/style/index.less';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
