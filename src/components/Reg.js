import { useRef, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';


const url = process.env.REACT_APP_USER_URL;

const Reg = () => {
    const [icon, setIcon] = useState(faEye)
    const username = useRef('')
    const email = useRef('')
    const password = useRef('')
    const {setUsername} = useContext(AppContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        let usernameValue = username.current.value
        let emailValue = email.current.value
        let passwordValue = password.current.value

        setUsername(usernameValue)

        let body = {
            username: usernameValue,
            email: emailValue,
            password: passwordValue
        }

        getCookie(body)

    }

    const register = async (body, csrfToken) => {
        // var csrftoken = getCookie('csrftoken');

        let res = await fetch(`${url}signup/`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
                body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => {
            console.error('Error during signup request:', error);
        });

    }
    const getCookie = async (body) => {

        const res = await fetch(`${url}gettoken/`, {
            method: 'GET',
            credentials: 'include' // Include cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(data => {
            const csrfToken = data.csrfToken;
            console.log('This is token =>', csrfToken)
            register(body, csrfToken)
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });

    }

    function togglePasswordVisibility() {
        console.log("Click")
        const passwordField = document.getElementById("password");
        
        if (passwordField.type === "password") {
            passwordField.type = "text";
            setIcon(faEyeSlash)
        } else {
            passwordField.type = "password";
            setIcon(faEye)
        }
    }

    return(
        <>
        <h1>Create account</h1>
        <form onSubmit={handleSubmit} className="registration">
            <label >Email</label>
            <input ref={username} name="username"/>
            <label >Email</label>
            <input name="email" ref={email}/>
            <label >Password</label>
            <input name="password" type="password" id='password' ref={password}/>
            <span className="toggle-password" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={icon}/>
            </span>
            <button>Create account <FontAwesomeIcon icon={faCircleArrowRight}/></button>
        </form>
        </>
    )
}

export default Reg
