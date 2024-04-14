import React from 'react';
import '../App.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-light custom-navbar-bg">
            {/* logo */}
            <img src='logo.png' alt="Logo" width="auto" height="100%" className="d-inline-block align-top" />
        </nav>
    );
}

export default Navbar;
