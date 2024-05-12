import { useRef, useContext , useState} from "react";
import { AppContext } from "../App";


const url = process.env.REACT_APP_USER_URL;

const Log = () => {
    const email = useRef('')
    const password = useRef('')
    const {setLog} = useContext(AppContext)
    const [msg, setMsg] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()

        let emailValue = email.current.value
        let passwordValue = password.current.value

        let body = {
            email: emailValue,
            password: passwordValue
        }

        getCookie(body)

    }

    const register = async (body, csrfToken) => {

        let res = await fetch(`${url}log-in/`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
                body: JSON.stringify(body)
        })
        .then(response => {
            if (response.status === 200){
                setLog(true)
            } else {
                setMsg("Wrong password or user doesn't exist")
            }
        })
        .catch(error => {
            console.error('Error during login request:', error);
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

    return(
        <form onSubmit={handleLogin}>
            <input placeholder="email" ref={email}/>
            <input placeholder="password" ref={password}/>
            <button>Submit</button>
            <p>{msg}</p>
        </form>
    )
}

export default Log
