import axios from 'axios';
import { useRef, useContext, useState, useEffect } from 'react';
import { UploadContext } from './UploadScreen.js';
import { AppContext } from '../../App.js';
import '../Button.css';
import "./UploadScreen.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';


const Link = () => {
    const linkInput = useRef('');
    // disable the button if nothing uploaded
    const [linkUploaded, setLinkUploaded] = useState(true);
    // to show loading div while loading
    const [isLoading, setIsLoading] = useState(false); 

    const { download, setDocName, setPath, setKeywordsFetched, setKiwiTable, setTable } = useContext(AppContext);
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
            }
        } catch (error) {
            console.error('There was an error:', error);
        } finally {
            setIsLoading(false); 
        }
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
