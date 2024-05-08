import { useState, createContext} from "react";
import Link from "./Link.js";
import File from "./File.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import "./UploadScreen.css"

export const UploadContext = createContext();
const url = process.env.REACT_APP_API_URL;

const UploadScreen = () => {
  // To save the path of the loaded doc
  const [msg, setMsg] = useState('');
  const [display, setDisplay] = useState('none')

  const handleUploadWindow = () => {
    if (display === 'none') {
      setDisplay('')
    } else {
      setDisplay('none')
    }
    
  }

  return (
    <div id="upload-container" onClick={handleUploadWindow}>
      <h1 className="introText">Upload your document</h1>
      <div id="upload-main">
        <FontAwesomeIcon icon={faFile} id="file-icon"/>
        <p>Get started by uploading a new document</p>
        <button><FontAwesomeIcon icon={faCircleArrowUp} /> Upload</button>
      </div>

      <div className="link-file-container" style={{display: display}}>
        <div id="close-upload" onClick={handleUploadWindow}>x</div>
        <UploadContext.Provider value={{url, setMsg}}>
          <Link/>
          <File/>
        </UploadContext.Provider>
        {msg}
      </div>
    </div>
  );
}

export default UploadScreen;

