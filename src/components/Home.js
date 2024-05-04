import './Home.css';
import accenture from '../img/cliens-icons/accenture.jpg';
import eon from '../img/cliens-icons/eon.jpg';
import linde from '../img/cliens-icons/linde.jpg';
import mckinsey from '../img/cliens-icons/mckinsey.jpg';
import quantum from '../img/cliens-icons/quantum.jpg';
import swiim from '../img/cliens-icons/swiim.jpg';
import azure from '../img/partnerships/azure.png';
import openAi from '../img/partnerships/open-ai.png';
import texas from '../img/partnerships/texas.png';
import tum from '../img/partnerships/tum.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faMagnifyingGlassChart, faSitemap, faEarthEurope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Contacts from './Contacts';

let data = require('./data.json');


const Home = () => {
    const differentiators = data.differentiators
    const numbers = data.numbers
    const arrayOfIcons = [faDatabase, faMagnifyingGlassChart, faSitemap, faEarthEurope, faPaperPlane]
    const arrayOfImages = [linde, eon, swiim, quantum, accenture, mckinsey]

    return (
    <>
    <div id="first-screen">
            <div id="first-screen-text">
                <h1>Unlocking the Potential of Energy Transition</h1>
                <p>Advanced data and linguistic analysis platform</p>
            </div>
    </div>
    <div className="container">
        <div className="main-description">
            <p className="text">
            Transition to carbon neutrality opens new opportunities and threatens slowly-changing businesses. Project success or company survival depends on identifying and pursuing the opportunities communicated by new policies and regulations. New technology and research can accelerate the transition. Pri-SET helps track and find opportunities for sustainable energy projects around the globe. Helping you reach SDG goals defined by UN.
            </p>
            <button className="button"><a href='#contacts' style={{color:"white"}}>Contact Us</a></button>
            <div id="line"></div>
        </div>
        <div id="clients">
            <h2>Client on waiting list for our platform</h2>
            <div id='clients-icons'>
                {
                    arrayOfImages.map((item, index)=> {
                        return <div className='item-icon' key={index}><img src={item} alt=''/></div>
                    })
                }
            </div>
        </div>
        <div id='differentiators'>
            <h2>Our differentiators</h2>
            <div id="differentiators-items">
                {
                 arrayOfIcons.map((icon, index) => {
                    return <div className='differentiators-item' key={index}>
                                <p className='differentiators-icon'><FontAwesomeIcon icon={icon} /></p>
                                <h3>{differentiators[index].header}</h3>
                                <p className='description'>{differentiators[index].description}</p>
                            </div>
                 })
                }
            </div>
        </div>
        <div id='numbers'>
            <h2>We’re Good with Numbers</h2>
            <div id='numbers-items'>
                {
                    numbers.map((item, index)=>{
                        return <div className='number-item' key={index}>
                                    <h3>{item.header}</h3>
                                    <p className='numbers-description'>{item.description}</p>
                                </div>
                    })
                }
            </div>
        </div>
        <div id='partnerships'>
            <div id='partnerships-description'>
                <h2>Our credentials and partnerships</h2>
                <p>PRISET data comes from validated and correct sources such as the official government website. <br/> 
                We partner with industry leaders to develop joint offerings and platforms that bring the best solution to our customers</p>
            </div>
            <div className='partnerships-item'>
                <p className='partnerships-header'>Knowledge Partnerships</p>
                <div className='partnerships-icon'><img src={tum}/></div>
                <div className='partnerships-icon'><img src={texas} /></div>
            </div>
            <div className='partnerships-item'>
                <p className='partnerships-header'>Data Processing</p>
                <div className='partnerships-icon'><img src={openAi} /></div>
                <div className='partnerships-icon'><img src={azure} /></div>
            </div>
        </div>
        <Contacts/>
    </div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.9354717480296!2d11.564435275805614!3d48.15004925029359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75ef4cbc7a41%3A0x22afed18eec3f727!2sTUM%20School%20of%20Management!5e0!3m2!1sen!2sil!4v1714835446351!5m2!1sen!2sil" style={{border: "0", width: "100vw", height: "40vh", marginBottom: "2rem"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <p className='copyright'>© 2024, PRISET</p>
    </>
    )
}

export default Home