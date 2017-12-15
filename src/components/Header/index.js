import React, { Component } from 'react';
import logo from '../../assets/image/logo.svg';
import Icon from '../Common/Icon';
import './index.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header-logo">
                    <img src={logo} className="app-logo" alt="logo" />
                </div>
                <h1 className="app-title">React Music</h1>
                <button type="button" className="header-user"><Icon type="user-o" /></button>
            </header>
        );
    }
}

export default Header;