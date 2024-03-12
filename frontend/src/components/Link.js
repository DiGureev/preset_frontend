import axios from 'axios';
import {useRef, useContext, useState, useEffect} from 'react';
import { UploadContext } from './UploadScreen.js';
import { AppContext } from '../App.js';
import '../App.css';
import '../Button.css';

const Link = () => {
    const linkInput   = useRef('');
    const [linkUploaded, setLinkUploaded] = useState(true);
    const {setPath, setKeywordsFetched, setKiwiTable, setHeader, setTable}   = useContext(AppContext);
    const {url,
           setMsg}   = useContext(UploadContext);

    useEffect(() => {
        handleInputChange({ target: { value: linkInput.current.value } });
    }, []);

    const fetchData = async () => {
        setMsg('');

        let body = {link: linkInput.current.value};
        try {
            const response = await axios.post(`https://priset-api.onrender.com/upload/`, body);
            let data       = response.data;
            if (data.msg) {
                setMsg('Oops! It is not a correct link..')
            } else {
                const keywords  = data.kiwi_table;
                const path      = data.path;
                const tableData = keywords.map(({ Word, Pages }) => ({
                    Word,
                    Pages: Pages.join(', ') 
                }));

                setHeader('Here are the keywords from your file:');
                setKiwiTable(tableData);
                setPath(path);
                setKeywordsFetched(true);
                setTable(true)
            }
            
          } catch (error) {
            console.log('There was an error', error);
          }
      }
    
    const handleInputChange = (event) => {
        console.log('Input changed:', event.target.value);
        setLinkUploaded(!!event.target.value.trim());
    };

    console.log('linkUploaded:', linkUploaded);

    return(
        <div className='upload-input'>
            <div  className='upload-content'>
            <input type="text" placeholder="Link" ref={linkInput} onChange={handleInputChange} style={{width: "90%", border: "1px solid #685E5E", padding: "8px", borderRadius:"5px"}}/>
            </div>
            <button onClick={fetchData} disabled={!linkUploaded}>Get the keywords</button>
        </div>
    )
}

export default Link
