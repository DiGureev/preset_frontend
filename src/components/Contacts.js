import './HomePage/Home.css';

const Contacts = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div id="contacts">
            <div id="contacts-text">
                <h2>Let's Work Together</h2>
                <p>Arcistrasse, Munich</p>
                <p>www.priset.io</p>
            </div>
            <div id="contacts-form">
                <form onSubmit={handleSubmit}>
                    <lable className="input-lable">First Name</lable>
                    <input></input>
                    <lable className="input-lable">Last Name</lable>
                    <input></input>
                    <lable className="input-lable">Email*</lable>
                    <input type="email" required></input>
                    <lable className="input-lable">Leave us a message...</lable>
                    <textarea rows="4" cols="50"></textarea>
                    <button className="button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contacts