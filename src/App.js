import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navigation/Navbar.js';
import { useState, createContext, useEffect } from 'react';
import Registration from './components/Registration.js'
import Analytics from './components/Analytics.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home.js'
import Contacts from './components/Contacts.js';
import { jwtDecode } from "jwt-decode";
import api from "./api.js";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import NotFound from './components/NotFound.js';


export const AppContext = createContext();
const url = process.env.REACT_APP_USER_URL;


function App() {
  // The words user added to the kiWI or plot
  const [addedWords, setWords]    = useState('');
  // Path to the file user uploaded
  const [file_path, setPath]      = useState('');
  const [keywordsFetched, 
         setKeywordsFetched]      = useState(false);
  // The main table
  const [kiwiTable, setKiwiTable] = useState([]);

  // To know which component need to be rendered
  const [table, setTable]         = useState(false);
  const [grasp, setGrasp]         = useState(false);
  const [matrix, setMatrix]       = useState(false);

  // url for downloading CSV and set name of the document
  const [csvUrl, setURL]          = useState('#');
  const [docName, setDocName]     = useState('')

  // Registration and auth
  const [logged, setLog]        = useState(false)
  const [username, setUsername] = useState('')

  useEffect(()=>{

    auth().catch(()=> setLog(false))
    getUserInfo()

  }, [])

  // function for generating CVS
  const download = (dataTable) => {
    let newDataTable = []

    // Make proper table for cvs generating
    for (let i of dataTable){
        let newObj = {}
        newObj.Word = i.Word
        newObj.Pages = i.Pages.Pages.toString()
        newObj.Freq = i.Pages.RelativeFrequency
        newDataTable.push(newObj)
    }
    
    const CSVRows = [];
    const keys = "Word; Page; Relative Frequency";
    CSVRows.push(keys);
    let values = [];

    for (let obj of newDataTable){
      let value = Object.values(obj).join(";");
      values.push(value);
    }
    
    values = values.join('\n');
    CSVRows.push(values);
    let data = CSVRows.join('\n');

    const blob = new Blob([data], { type: 'text/csv' }); 
    const url = window.URL.createObjectURL(blob) ;
    
    // Set CSV URL for downloading
    setURL(url);
}

    const refreshToken = async () => {
      console.log('I am on refresh')
      const refreshToken = localStorage.getItem(REFRESH_TOKEN)

      try{
          const res = await api.post("/user/refresh/", {
              refresh: refreshToken,
          })

          if (res.status === 200) {
              localStorage.setItem(ACCESS_TOKEN, res.data.access)
              setLog(true)
          } else {
              setLog(false)
          }

      } catch (error) {
          console.log(error)
          setLog(false)
      }

    }

    const auth = async () => {
      console.log('I am on auth')

      const token = localStorage.getItem(ACCESS_TOKEN)

      if (!token){
          console.log('No token')
          setLog(false)
          return
      }

      console.log('This is token=>', token)

      const decoded = jwtDecode(token)
      const tokenExpiration = decoded.exp
      const now = Date.now()/1000

      if (tokenExpiration < now){
          await refreshToken()
      } else {
          setLog(true)
      }

    }

    const getUserInfo = async () => {

      try {
        const res = await api.get(`/user/info/`)
        setUsername(res.data.username)
      } catch (err) {
        console.log(err)
      }

    }

// const auth = async (csrfToken) => {
//   // var csrftoken = getCookie('csrftoken');

//   let res = await fetch(`${url}session/`, {
//       method: 'GET',
//       headers: {
//               'Content-Type': 'application/json',
//               'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
            
//           },
//           credentials: 'include', // Include cookies in cross-origin requests
//   })
//   let data = await res.json()

//   console.log(data)

//   if (data.isauth === true){
//     setLog(true)
//     setUsername(data.username)
//   } else {
//     setLog(false)
//   }

// }
// const getCookie = async () => {

//   await fetch(`${url}gettoken/`, {
//       method: 'GET',
//       credentials: 'include' // Include cookies in cross-origin requests
//   })
//   .then(response => response.json())
//   .then(data => {
//       const csrfToken = data.csrfToken;
//       console.log('This is token =>', csrfToken)
//       auth(csrfToken)
//   })
//   .catch(error => {
//       console.error('Error fetching CSRF token:', error);
//   });

// }
  
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

