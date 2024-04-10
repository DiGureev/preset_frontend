import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadScreen from './components/UploadScreen.js';
import Navbar from './components/Navbar.js';
import Previous from './components/Previous.js';
import { useState, createContext } from 'react';
import PlotPage from './components/PlotPage.js';
import Matrix from './components/Matrix.js';
import Results from './components/Results.js';

export const AppContext = createContext();

function App() {
  const [addedWords, setWords]    = useState('');
  const [file_path, setPath]      = useState('');
  const [keywordsFetched, 
         setKeywordsFetched]      = useState(false);
  const [kiwiTable, setKiwiTable] = useState([]);
  const [header, setHeader]       = useState('');
  const [table, setTable]         = useState(false);
  const [grasp, setGrasp]         = useState(false);
  const [matrix, setMatrix]       = useState(false);
  const [csvUrl, setURL]          = useState('#');
  const [docName, setDocName]     = useState('')

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
    console.log(data)
    const blob = new Blob([data], { type: 'text/csv' }); 
    const url = window.URL.createObjectURL(blob) ;
      
    setURL(url);
}
  
  return (
      <AppContext.Provider value={{download, docName, setDocName, addedWords, setWords, file_path, setPath, keywordsFetched, setKeywordsFetched, kiwiTable, setKiwiTable, header, setHeader, table, setTable, grasp, setGrasp, matrix, setMatrix, csvUrl, setURL}}>
        <Navbar />
        <div className="grid-container">
        <Previous />
        <div className="content-container">
          <UploadScreen />
          <Results/>
        </div>
        </div>
      </AppContext.Provider>
  );
}

export default App;

