import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import api from "./api.js";
// Components
import Navbar from "./components/Navigation/Navbar.js";
import Registration from "./components/LoginSignup/Registration.js";
import Analytics from "./components/PRIAnalyticsPage/Analytics.js";
import Home from "./components/HomePage/Home.js";
import Contacts from "./components/Contacts.js";
import NotFound from "./components/NotFound.js";

export const AppContext = createContext();

function App() {
  // The words user added to the kiWI or plot
  const [addedWords, setWords]    = useState("");
  // Path to the file user uploaded
  const [file_path, setPath]      = useState("");
  const [keywordsFetched, 
         setKeywordsFetched]      = useState(false);
  // The main table
  const [kiwiTable, setKiwiTable] = useState([]);

  // To know which component need to be rendered
  const [table, setTable]         = useState(false);
  const [grasp, setGrasp]         = useState(false);
  const [matrix, setMatrix]       = useState(false);

  // url for downloading CSV and set name of the document
  const [csvUrl, setURL]          = useState("#");
  const [docName, setDocName]     = useState("");

  // Registration and auth
  const [logged, setLog]        = useState(false);
  const [username, setUsername] = useState("");

  useEffect(()=>{

    auth().catch(()=> setLog(false));
    getUserInfo();

  }, [])

  // function for generating CVS
  const download = (dataTable) => {
    let newDataTable = [];

    // Make proper table for cvs generating
    for (let i of dataTable){
        let newObj = {};
        newObj.Word = i.Word;
        newObj.Pages = i.Pages.Pages.toString();
        newObj.Freq = i.Pages.RelativeFrequency;
        newDataTable.push(newObj);
    }
    
    const CSVRows = [];
    const keys = "Word; Page; Relative Frequency";
    CSVRows.push(keys);
    let values = [];

    for (let obj of newDataTable){
      let value = Object.values(obj).join(";");
      values.push(value);
    }
    
    values = values.join("\n");
    CSVRows.push(values);
    let data = CSVRows.join("\n");

    const blob = new Blob([data], { type: "text/csv" }); 
    const url = window.URL.createObjectURL(blob) ;
    
    // Set CSV URL for downloading
    setURL(url);
}
    // Refresh token if access token expired
    const refreshToken = async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      try{
          const res = await api.post("/user/refresh/", {
              refresh: refreshToken,
          })

          if (res.status === 200) {
              localStorage.setItem(ACCESS_TOKEN, res.data.access);
              setLog(true);
          } else {
              setLog(false);
          }

      } catch (error) {
          console.log(error);
          setLog(false);
      }

    }

    // Check access token. If no token - logout, if token is about to expire - refresh
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token){
          console.log("No token");
          setLog(false);
          return
      }

      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now()/1000;

      if (tokenExpiration < now){
          await refreshToken();
      } else {
          setLog(true);
      }
    }

    const getUserInfo = async () => {

      try {
        const res = await api.get(`/user/info/`);
        setUsername(res.data.username);
      } catch (err) {
        console.log(err);
      }

    }
  
  return (
      <AppContext.Provider value={{username, setUsername, logged, setLog, download, docName, setDocName, addedWords, setWords, file_path, setPath, keywordsFetched, setKeywordsFetched, kiwiTable, setKiwiTable, table, setTable, grasp, setGrasp, matrix, setMatrix, csvUrl, setURL}}>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics/>} />
              <Route path="/:path" element={<Registration/>} />
              <Route path="/contacts" element={<Contacts/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </Router>
      </AppContext.Provider>
  );
}

export default App;

