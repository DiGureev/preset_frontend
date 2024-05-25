import './HomePage/Home.css';
import { useRef , useState} from 'react';
import api from '../api';

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
        let message = text.current.value

        if (message === ""){
            message = "No message"
        }

        let body = {first_name: first_name , last_name: last_name, email: user_email, message: message}

        console.log(body)

        try {
            const res = await api.post(`/contact/add/`, body)

            if (res.status === 201){
                setMsg("Thank you! We have recieved your contact!")

                first.current.value = ''
                last.current.value = ''
                email.current.value = ''
                text.current.value = ''

                setTimeout(()=>{
                    setMsg('')
                }, 2000)
            } else {
                setMsg("Something went wrong, please try again.")
            }

            console.log(res.data)

        } catch (err) {
            console.log(err)
        }
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