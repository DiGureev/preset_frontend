import { useRef, useContext, useState } from "react";
import { AppContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Registration.css'
import api from "../api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


const url = process.env.REACT_APP_USER_URL;

const Registration = () => {
    const navigate = useNavigate();
    const { path } = useParams();
    const [icon, setIcon] = useState(faEye)
    const username = useRef('')
    const email = useRef('')
    const password = useRef('')
    const {setUsername, setLog} = useContext(AppContext)
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
            username: emailValue,
            password: passwordValue
        }

        register(body)

    }

    const register = async (body) => {

        let url_path = ''
            if (path === "login"){
                url_path = `/user/gettoken/`
            }else {
                url_path = `/user/signup/`
            }

        try {
            const res = await api.post(url_path, body)

            if (res.status === 200){
                setUsername(body.username)
                setLog(true)
            }
            if (path === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                console.log('This is token from register =>', res.data.access)
                navigate("/")
            } else {
                navigate("/login")
            }

        } catch (error) {
            console.log(error)
        } 
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
                <label >Username</label>
                <input name="text" ref={email}/>
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