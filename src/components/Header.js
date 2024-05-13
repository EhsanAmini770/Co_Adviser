import React from 'react';
import logo from './pictures/1.png';
import './Header.css';

function Header() {
    return (
        <nav className="navbar fixed-top">
            <div className="container-fluid">
                <img src={logo} alt="Your Logo" className="logo" />
                <h1 className="header-title">Co Adviser</h1>
            </div>
        </nav>
    );
}

export default Header;
