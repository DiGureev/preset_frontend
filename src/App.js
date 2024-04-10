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
  
  return (
      <AppContext.Provider value={{docName, setDocName, addedWords, setWords, file_path, setPath, keywordsFetched, setKeywordsFetched, kiwiTable, setKiwiTable, header, setHeader, table, setTable, grasp, setGrasp, matrix, setMatrix, csvUrl, setURL}}>
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

