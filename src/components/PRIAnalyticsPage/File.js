import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { UploadContext } from './UploadScreen.js';
import { AppContext } from '../../App.js';
import { FileUploader } from "react-drag-drop-files";
import '../Button.css';
import "./UploadScreen.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';


const fileTypes = ["PDF"];
// const kiwi_url = process.env.REACT_APP_KIWI_URL;
const user_url = process.env.REACT_APP_USER_URL


const File = () => {
    const [file, setFile] = useState('');
    // disable the button if nothing uploaded
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    // to show loading div while loading
    const [isLoading, setIsLoading] = useState(false); 

    const { download, docName, setDocName, setPath, setKeywordsFetched, setKiwiTable, setTable } = useContext(AppContext);
    const { url, setMsg, setDisplay } = useContext(UploadContext);

    useEffect(() => {
        if (file) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [file]);

    const handleFileChange = (file) => {
        if (file) {
            setMsg('');
            setFile(file);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            setMsg('Please, upload the file');
            return;
        }

        setDisplay('none')

        setIsLoading(true); 

        let formData = new FormData();
        formData.append('file', file);

        // Get Name for downloading .csv
        let fileName = file.name 
        let name = fileName.split(".")[0]
        name+= '-Kiwi.csv'
        setDocName(name)

        try {
            const response = await axios.post(`${url}upload/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            const keywords = response.data.kiwi_table;
            const path = response.data.path;

            setKiwiTable(keywords);

            download(keywords)

            setPath(path);
            setKeywordsFetched(true);
            setTable(true);

            setFile('')

            getCookie(name, keywords, path)
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    const saveTableInDB = async (name, table, path, csrfToken) => {
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
            
            // saveTableInDB(name, table, path, csrfToken)
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });

    }

    return (
        <div className='upload-input'>
            <div className='upload-content'>
                <FileUploader 
                    width="50%" 
                    handleChange={handleFileChange} 
                    name="file" 
                    types={fileTypes} >
                    <div className="file-uploader-text">
                        <p><u>Select documents</u> or simply drop it here</p>
                    </div>
                </FileUploader>
                <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>{file && `${file.name} - ${file.type}`}</div>
            </div>
            <button onClick={handleUploadClick} disabled={isButtonDisabled}>Get the keywords <FontAwesomeIcon icon={faCircleArrowRight}/></button>
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

export default File;
