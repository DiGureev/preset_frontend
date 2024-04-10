import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { UploadContext } from './UploadScreen.js';
import { AppContext } from '../App.js';
import { FileUploader } from "react-drag-drop-files";
import '../Button.css';
import '../App.css';

const fileTypes = ["PDF"];

const File = () => {
    const [file, setFile] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false); 

    const { download, setDocName, setPath, setKeywordsFetched, setKiwiTable, setHeader, setTable } = useContext(AppContext);
    const { url, setMsg } = useContext(UploadContext);

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
            // console.log(file);
            setFile(file);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            setMsg('Please, upload the file');
            return;
        }

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

            setHeader('Dive-In Reading');
            setKiwiTable(keywords);
            download(keywords)
            setPath(path);
            setKeywordsFetched(true);
            setTable(true);
            setFile('')
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className='upload-input'>
            <div className='upload-content'>
                <FileUploader width="50%" handleChange={handleFileChange} name="file" types={fileTypes} />
                <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>{file && `${file.name} - ${file.type}`}</div>
            </div>
            <button onClick={handleUploadClick} disabled={isButtonDisabled}>Get the keywords</button>
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
