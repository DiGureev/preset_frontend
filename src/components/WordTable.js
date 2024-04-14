import axios from "axios";
import { useContext, useRef} from "react";
import { AppContext } from "../App";
import Table from 'react-bootstrap/Table';
import NavButtons from "./NavButtons.js";
import '../App.css';

const url = process.env.REACT_APP_API_URL;

const WordTable = ( ) => {
    const {docName, kiwiTable, setKiwiTable, file_path, header, setWords, csvUrl} = useContext(AppContext);
    const additionalWords = useRef('');

    const addWords = async () => {
      setWords(additionalWords.current.value.split(', '));

      let body = {words: additionalWords.current.value.split(', '),
                  path: file_path
                };

      try {
          const response  = await axios.post(`${url}add`, body);
          let data        = response.data;
          const keywords  = data.kiwi_table;
          setKiwiTable(keywords);

          // To clean input field
          additionalWords.current.value = '';
        } catch (error) {
          console.log('There was an error', error);
        }
    
    }

    return (
      <div className="result-div">
        <h2>Dive-In Reading</h2>
        <div id='content'>
        <div id='table-content'>
          {/* Main table */}
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Word</th>
                <th>Pages</th>
                <th>Relative Frequency</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows */}
              {kiwiTable.map((item, index) => (
                <tr key={index}>
                  <td>{item.Word}</td>
                  <td>{item.Pages.Pages.join(", ")}</td>
                  <td>{item.Pages.RelativeFrequency}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        <div  id="additional-words">
          <p>To navigate your reading, accelerate the search, and help trans-references, use keyword index (KeWI) generator. 
          Learn the top words and use the right vocabulary in your questions. If needed, you can add your own words to the KeWI.
          <i>(Note that family words are combined, i.e. "invest" is added for [investment, investor, investing,..]).</i></p>
          
          <p>If you would like to add additional words, please enter them here. <br/> Example: word1, word2</p>
          <input id="additional-words-input" type="text" ref={additionalWords}/>
          <button id="additional-words-btn" onClick={addWords}>Add words to the table</button>
        </div>
        </div>
        
        {/* Download CSV button */}
        <button id="download_csv"><a href={csvUrl} download={docName}>Download table (CSV)</a></button>
        
        {/* The buttons at the bottom of the page to switch between the components */}
        <NavButtons/>
      </div>
    )
}

export default WordTable
