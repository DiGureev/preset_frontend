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

    const {setPath, setKeywordsFetched, setKiwiTable, setHeader, setTable} = useContext(AppContext);
    const {url, 
           setMsg}       = useContext(UploadContext);

    useEffect(() => {
        if (file) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [file])

    const handleFileChange = (file) => {
        if (file) {
            setMsg('');
            console.log(file);
            setFile(file);
        };
    };

    const handleUploadClick = async () => {
    if (!file) {
        setMsg('Please, upload the file');
        return;
    };
    let formData = new FormData();
    formData.append('file', file);

    try {
        console.log('I am here')
        const response  = await axios.post(`${url}upload/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        const keywords  = response.data.kiwi_table;
        const path      = response.data.path
        const tableData = keywords.map(({ Word, Pages }) => ({
            Word,
            Pages: Pages.join(', ') 
        }));

        setHeader('Here are the keywords from your file:');
        setKiwiTable(tableData);
        setPath(path);
        setKeywordsFetched(true);
        setTable(true)
    
    } catch (error) {
        console.error('There was an error:', error);
    }
};

    return (
        <div className='upload-input'>
            <div className='upload-content'>
                <FileUploader width="50%" handleChange={handleFileChange} name="file" types={fileTypes} />
                <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>{file && `${file.name} - ${file.type}`}</div>
            </div>
            <button onClick={handleUploadClick} disabled={isButtonDisabled}>Get the keywords</button>
        </div>
    );
}

export default File;
