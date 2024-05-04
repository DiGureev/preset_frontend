import React from 'react';
import './Navbar.css';
import Logo from '../img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className='logo'><img src={Logo} alt="priset-logo" /></Link>
            <div id='navbar-items'>
                <Link to="/analytics"><div className='menu-item'>PRI Analytics</div></Link>
                <Link to="/contacts"><div className='menu-item'>Contact Us</div></Link>
            </div>
            <div className='username'>
                <div id='username-icon'><FontAwesomeIcon icon={faUser} /></div>
                <div>Hello, Username</div>
            </div>
        </nav>
    );
}

export default Navbar;
