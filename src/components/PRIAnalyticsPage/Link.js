import axios from 'axios';
import { useRef, useContext, useState, useEffect } from 'react';
import { UploadContext } from './UploadScreen.js';
import { AppContext } from '../../App.js';
import '../Button.css';
import "./UploadScreen.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';

const kiwi_url = process.env.REACT_APP_KIWI_URL;
const user_url = process.env.REACT_APP_USER_URL;

const Link = () => {
    const linkInput = useRef('');
    // disable the button if nothing uploaded
    const [linkUploaded, setLinkUploaded] = useState(true);
    // to show loading div while loading
    const [isLoading, setIsLoading] = useState(false); 

    const { download, docName, setDocName, setPath, setKeywordsFetched, setKiwiTable, setTable } = useContext(AppContext);
    const { url, setMsg, setDisplay } = useContext(UploadContext);

    useEffect(() => {
        handleInputChange({ target: { value: linkInput.current.value } });
    }, []);

    const fetchData = async () => {
        setDisplay('none')
        setMsg('');
        setIsLoading(true); 

        let body = { link: linkInput.current.value };
        try {
            const response = await axios.post(`${url}upload/`, body);
            let data = response.data;
            if (data.msg) {
                setMsg('Oops! It is not a correct link..');
            } else {
                const keywords = data.kiwi_table;
                const path = data.path;

                setKiwiTable(keywords);
                download(keywords);
                setPath(path);

                // Get Name for downloading .csv
                let link = linkInput.current.value
                let pathArr = link.split("/")
                link = pathArr.slice(-1)[0]
                let name = link.split(".")[0]
                name += '-Kiwi.csv'

                setDocName(name)

                setKeywordsFetched(true);
                setTable(true);
                linkInput.current.value = ''

                getCookie(name, keywords, path)
            }
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            setIsLoading(false); 
        }
    }

    const saveTableInDB = async (name, table,path, csrfToken) => {
        let body = {table: table , name: name, path: path}

        await fetch(`${kiwi_url}upload/`, {
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
    }

    const getCookie = async (name,table, path) => {
        await fetch(`${user_url}gettoken/`, {
            method: 'GET',
            credentials: 'include' // Include cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(data => {
            const csrfToken = data.csrfToken;
            console.log('This is token =>', csrfToken)
            
            saveTableInDB(name, table, path, csrfToken)
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });

    }

    const handleInputChange = (event) => {
        setLinkUploaded(!!event.target.value.trim());
    };

    return (
        <div className='upload-input'>
            <div className='upload-content'>
                <input type="text" placeholder="https://example.com/document-scan" ref={linkInput} onChange={handleInputChange} />
            </div>
            <button onClick={fetchData} disabled={!linkUploaded}>Get the keywords <FontAwesomeIcon icon={faCircleArrowRight}/></button>
            {/* Loading process div */}
            {isLoading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div>Loading...</div>
                </div>
            )}
        </div>
    );
}

export default Link;
