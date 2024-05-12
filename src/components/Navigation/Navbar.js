import React from 'react';
import './Navbar.css';
import Logo from './img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_USER_URL;

const Navbar = () => {
    const {logged, username, setLog} = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogOut = (e) => {
        getCookie()
    }

    const logout = async (csrfToken) => {
        // var csrftoken = getCookie('csrftoken');
      
        let res = await fetch(`${url}log-out/`, {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
        })
        let data = await res.json()
      
        console.log(data)
      
        if (res.status === 200){
          setLog(false)
          navigate("/");
        }
      }

      const getCookie = async () => {
      
        const res = await fetch(`${url}gettoken/`, {
            method: 'GET',
            credentials: 'include' // Include cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(data => {
            const csrfToken = data.csrfToken;
            console.log('This is token =>', csrfToken)
            logout(csrfToken)
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });
      
      }

    return (
        <nav className="navbar">
            <Link to="/" className='logo'><img src={Logo} alt="priset-logo" /></Link>
            <div id='navbar-items'>
                <Link to="/analytics"><div className='menu-item'>PRI Analytics</div></Link>
                <Link to="/contacts"><div className='menu-item'>Contact Us</div></Link>
            </div>
            {logged? <div className='username'>
                <div id='username-icon'><FontAwesomeIcon icon={faUser} /></div>
                <div>Hello, {username} / <a onClick={handleLogOut}> Log Out</a></div> 
            </div> : <div className='username'><p><Link to="/login">Log In</Link> / <Link to="/signup">Sign Up</Link></p></div> }
        </nav>
    );
}

export default Navbar
