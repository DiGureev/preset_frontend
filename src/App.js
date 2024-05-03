import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.js';
import { useState, createContext } from 'react';
import Reg from './components/Reg.js';
import Log from './components/Log.js';
import Logout from './components/Logout.js';
import Analytics from './components/Analytics.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js'
import Auth from './components/CheckAuth.js'

export const AppContext = createContext();

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
  
  return (
      <AppContext.Provider value={{download, docName, setDocName, addedWords, setWords, file_path, setPath, keywordsFetched, setKeywordsFetched, kiwiTable, setKiwiTable, table, setTable, grasp, setGrasp, matrix, setMatrix, csvUrl, setURL}}>
        <Router>
          <div>
            <Navbar />
            <Reg/>
            <Log/>
            <Logout/>
            <Auth/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics/>} />
              {/* You can add more routes here */}
            </Routes>
          </div>
        </Router>
      </AppContext.Provider>
  );
}

export default App;

