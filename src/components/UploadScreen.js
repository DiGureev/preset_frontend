import { useState, createContext} from "react";
import Link from "./Link.js";
import File from "./File.js";
import '../App.css';

export const UploadContext = createContext();
const url = process.env.REACT_APP_API_URL;

const UploadScreen = () => {
  // To save the path of the loaded doc
  const [msg, setMsg] = useState('');

  return (
    <div>
      <h1 className="introText">Please paste the link or upload your file</h1>
      <div className="link-file-container">
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

