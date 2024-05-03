import { useRef } from "react";
import axios from "axios";

const url = process.env.REACT_APP_USER_URL;

const Auth = () => {


    const register = async (csrfToken) => {
        // var csrftoken = getCookie('csrftoken');

        let res = await fetch(`${url}session/`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
                // body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => {
            console.error('Error during login request:', error);
        });

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
        register(csrfToken)
    })
    .catch(error => {
        console.error('Error fetching CSRF token:', error);
    });

}

    return(
        <button onClick={getCookie}>Auth?</button>
    )
}

export default Auth
