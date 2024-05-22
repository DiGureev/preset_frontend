import './HomePage/Home.css';
import { useRef , useState} from 'react';

const user_url = process.env.REACT_APP_USER_URL
const contact_url = process.env.REACT_APP_CONTACT_URL

const Contacts = () => {
    const first = useRef()
    const last = useRef()
    const email = useRef()
    const text = useRef()

    const [msg, setMsg] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        const first_name = first.current.value
        const last_name = last.current.value
        const user_email = email.current.value
        const message = text.current.value

        let csrfToken = await getCookie()

        let body = {first_name: first_name , last_name: last_name, email: user_email, message: message}

        console.log(body)

        await fetch(`${contact_url}add/`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
                body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then (json => {
            console.log(json)
            setMsg(json.msg)

            first.current.value = ''
            last.current.value = ''
            email.current.value = ''
            text.current.value = ''

            setTimeout(()=>{
                setMsg('')
            }, 2000)
        })
    }

    const getCookie = async () => {
        let token = await fetch(`${user_url}gettoken/`, {
            method: 'GET',
            credentials: 'include' // Include cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(data => {
            const csrfToken = data.csrfToken;
            // console.log('This is token =>', csrfToken)
            
            return csrfToken
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });

        return token

    }

    return (
        <div id="contacts">
            <div id="contacts-text">
                <h2>Let's Work Together</h2>
                <p>Arcistrasse, Munich</p>
                <p>www.priset.io</p>
            </div>
            <div id="contacts-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <lable className="input-lable">First Name</lable>
                    <input ref={first}></input>
                    <lable className="input-lable">Last Name</lable>
                    <input ref={last}></input>
                    <lable className="input-lable">Email*</lable>
                    <input type="email" required ref={email}></input>
                    <lable className="input-lable">Leave us a message...</lable>
                    <textarea rows="4" cols="50" ref={text}></textarea>
                    <button className="button">Submit</button>
                    <br/>
                    <p>{msg}</p>
                </form>
            </div>
        </div>
    )
}

export default Contacts