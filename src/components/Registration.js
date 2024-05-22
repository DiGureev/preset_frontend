import { useRef, useContext, useState } from "react";
import { AppContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Registration.css'


const url = process.env.REACT_APP_USER_URL;

const Registration = () => {
    const navigate = useNavigate();
    const { path } = useParams();
    const [icon, setIcon] = useState(faEye)
    const username = useRef('')
    const email = useRef('')
    const password = useRef('')
    const {setUsername} = useContext(AppContext)
    const {setLog} = useContext(AppContext)
    const [msg, setMsg] = useState("")

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

        register(body)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        let emailValue = email.current.value
        let passwordValue = password.current.value

        let body = {
            email: emailValue,
            password: passwordValue
        }

        register(body)

    }

    const register = async (body) => {
        const csrfToken = await getCookie('csrftoken');

        console.log('This is token from register =>', csrfToken)

        let link = ''
            if (path === "login"){
                link = `${url}log-in/`
            }else {
                link = `${url}signup/`
            }

        await fetch(link, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
                body: JSON.stringify(body)
        })
        .then(response => {
            
            if (path === "login") {
                if (response.status === 200){
                    return response.json()
                } else {
                    setMsg("Wrong password or user doesn't exist")
                }
            } else {
                setMsg("Success")
                
                username.current.value = ''
                email.current.value = ''
                password.current.value = ''

                setTimeout(()=>{
                    setMsg('')
                    navigate('/login');
                },1000)
            }
        })
        .then(json => {
            console.log(json)
            console.log(json.username)
            setLog(true)
            setUsername(json.username)
            navigate('/');
        })
        .catch(error => {
            console.error('Error during signup request:', error);
        });

    }
    const getCookie = async () => {

        return await fetch(`${url}gettoken/`, {
            method: 'GET',
            credentials: 'include' // Include cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(data => {
            const csrfToken = data.csrfToken;
            console.log('This is token =>', csrfToken)

            return csrfToken
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });
    }

    function togglePasswordVisibility() {
        const passwordField = document.getElementById("password");
        
        if (passwordField.type === "password") {
            passwordField.type = "text";
            setIcon(faEyeSlash)
        } else {
            passwordField.type = "password";
            setIcon(faEye)
        }
    }

    if (path === "login"){

        return(
            <div id="registration-div">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label >Email</label>
                <input name="email" ref={email}/>
                <label >Password</label>
                <div class="password-container">
                    <input name="password" type="password" id='password' ref={password}/>
                    <FontAwesomeIcon icon={icon} className="toggle-password" onClick={togglePasswordVisibility}/>
                </div>
                <button>Continue <FontAwesomeIcon icon={faCircleArrowRight}/></button>
                <p>{msg}</p>
            </form>
            </div>
        )
    } else {
        return(
            <div id="registration-div">
            <h1>Create account</h1>
            <form onSubmit={handleSubmit} className="registration">
                <label >Username</label>
                <input ref={username} name="username"/>
                <label >Email</label>
                <input name="email" ref={email}/>
                <label >Password</label>
                <div class="password-container">
                    <input name="password" type="password" id='password' ref={password}/>
                    <FontAwesomeIcon icon={icon} className="toggle-password" onClick={togglePasswordVisibility}/>
                </div>
                <button>Create account <FontAwesomeIcon icon={faCircleArrowRight}/></button>
                <p>{msg}</p>
            </form>
            </div>
        )
    }


}

export default Registration