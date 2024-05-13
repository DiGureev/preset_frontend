import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navigation/Navbar.js';
import { useState, createContext, useEffect } from 'react';
import Registration from './components/Registration.js'
import Analytics from './components/Analytics.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home.js'
import Contacts from './components/Contacts.js';

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
    getCookie()
  },[])

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

const auth = async (csrfToken) => {
  // var csrftoken = getCookie('csrftoken');

  let res = await fetch(`${url}session/`, {
      method: 'GET',
      headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
            
          },
          credentials: 'include', // Include cookies in cross-origin requests
  })
  let data = await res.json()

  console.log(data)

  if (data.isauth === true){
    setLog(true)
    setUsername(data.username)
  } else {
    setLog(false)
  }

}
const getCookie = async () => {

  await fetch(`${url}gettoken/`, {
      method: 'GET',
      credentials: 'include' // Include cookies in cross-origin requests
  })
  .then(response => response.json())
  .then(data => {
      const csrfToken = data.csrfToken;
      console.log('This is token =>', csrfToken)
      auth(csrfToken)
  })
  .catch(error => {
      console.error('Error fetching CSRF token:', error);
  });

}
  
  return (
      <AppContext.Provider value={{username, setUsername, logged, setLog, download, docName, setDocName, addedWords, setWords, file_path, setPath, keywordsFetched, setKeywordsFetched, kiwiTable, setKiwiTable, table, setTable, grasp, setGrasp, matrix, setMatrix, csvUrl, setURL}}>
        <Router>
          <div>
            <Navbar />
            {/* <Logout/>
            <Auth/> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics/>} />
              <Route path="/:path" element={<Registration/>} />
              <Route path="/contacts" element={<Contacts/>} />
             
            </Routes>
          </div>
        </Router>
      </AppContext.Provider>
  );
}

export default App;

