import { useState, createContext, useContext, useEffect} from "react";
import Link from "./Link.js";
import File from "./File.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import "./UploadScreen.css"
import {AppContext} from "../../App.js";
import { useNavigate } from "react-router-dom";

export const UploadContext = createContext();

const url = process.env.REACT_APP_API_URL;


const UploadScreen = () => {
  // To save the path of the loaded doc
  const [msg, setMsg] = useState('');
  const [display, setDisplay] = useState('none')
  const {logged} = useContext(AppContext)

  const navigate = useNavigate();

  useEffect(()=>{
    if(!logged) {
      navigate("/login")
    }
  }, [])

  const handleUploadWindow = () => {
    if (display === 'none') {
      setDisplay('');
    } else {
      setDisplay('none');
    }
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };


return (
    <div id="upload-container" onClick={handleUploadWindow}>
      <h1 className="introText">Upload your document</h1>
      <div id="upload-main">
        <FontAwesomeIcon icon={faFile} id="file-icon"/>
        <p>Get started by uploading a new document</p>
        <button><FontAwesomeIcon icon={faCircleArrowUp} /> Upload</button>
      </div>

      <div className="link-file-container" style={{display: display}} onClick={(e) => handleClickInside(e)}>
        <div id="close-upload" onClick={handleUploadWindow}>x</div>
        <UploadContext.Provider value={{url, setMsg, setDisplay}}>
          <File/>
          <div id="or-container">
              <div className="line"></div>
              <span>OR</span>
              <div className="line"></div>
          </div>
          <Link/>
        </UploadContext.Provider>
        {msg}
      </div>
    </div>
  );
}

export default UploadScreen;

