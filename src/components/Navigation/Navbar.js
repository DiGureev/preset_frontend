import React from 'react';
import './Navbar.css';
import Logo from './img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../../App";


const Navbar = () => {
    const {logged, username} = useContext(AppContext)

    return (
        <nav className="navbar">
            <Link to="/" className='logo'><img src={Logo} alt="priset-logo" /></Link>
            <div id='navbar-items'>
                <Link to="/analytics"><div className='menu-item'>PRI Analytics</div></Link>
                <Link to="/contacts"><div className='menu-item'>Contact Us</div></Link>
            </div>
            {logged? <div className='username'>
                <div id='username-icon'><FontAwesomeIcon icon={faUser} /></div>
                <div>Hello, {username}</div>
            </div> : <div className='username'><p><Link to="/login">Log In</Link> / <Link to="/signup">Sign Up</Link></p></div> }
        </nav>
    );
}

export default Navbar;
