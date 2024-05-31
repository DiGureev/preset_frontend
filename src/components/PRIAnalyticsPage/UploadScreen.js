import "./UploadScreen.css";
import { useState, createContext, useContext} from "react";
import {AppContext} from "../../App.js";
import Link from "./Link.js";
import File from "./File.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

export const UploadContext = createContext();

const url = process.env.REACT_APP_API_URL;


const UploadScreen = () => {
  // To save the path of the loaded doc
  const [msg, setMsg] = useState("");
  const [display, setDisplay] = useState("none");
  const {logged} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  // If mobile device - don't show PRIAnalytics
  const isSmallScreen = window.innerWidth <= 768;

  const handleUploadWindow = () => {
    const popup = document.getElementById("link-file-container");

    if (display === "none") {
      setTimeout(() => {
          popup.style.opacity = "1"; // Transition to fully visible
      }, 10); // Delay to ensure transition starts
      setDisplay("");
    } else {
      popup.style.opacity = "0"; // Transition to fully hidden
      setTimeout(() => {
          setDisplay("none");
      }, 500);
    }
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };


if (logged && !isSmallScreen) {return (
  <>
    <div id="upload-container" onClick={handleUploadWindow}>
      <h1 className="introText">Upload your document</h1>
      <div id="upload-main">
        <FontAwesomeIcon icon={faFile} id="file-icon"/>
        <p>Get started by uploading a new document</p>
        <button><FontAwesomeIcon icon={faCircleArrowUp} /> Upload</button>
      </div>

      <div id="link-file-container" style={{display: display}} onClick={(e) => handleClickInside(e)}>
        <div id="close-upload" onClick={handleUploadWindow}>x</div>
        <UploadContext.Provider value={{url, setMsg, setDisplay, setIsLoading}}>
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

      {isLoading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div>Loading...</div>
                </div>
            )}
    </div>
    </>
  )} else if (!logged && !isSmallScreen) {
    return <div id="upload-container"><h2>Please, Log in to start working.</h2></div>
  } else if (logged && isSmallScreen) {
    return <div id="upload-container"><h2>Sorry, Priset Analytics is only available for desktops.</h2></div>
  }
}

export default UploadScreen;

