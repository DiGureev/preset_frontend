import axios from "axios";
import { useContext, useRef} from "react";
import { AppContext } from "../../App.js";
// import Table from 'react-bootstrap/Table';
import NavButtons from "./NavButtons.js";
import '../../App.css';
import './Results.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion} from '@fortawesome/free-solid-svg-icons';

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
          const response  = await axios.post(`${url}add/`, body);
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
         <NavButtons/>
        <h2>Dive-In Reading</h2>
        <div id='content'>
          <div id='table-content'>
            {/* Main table */}
            <table >
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
            </table>
            </div>
        <div  id="additional-words">
          <p>Enter additional keywords here. Example: word1, word2</p>
          <div id="additional-words-input">
          <input  type="text" placeholder="energy" ref={additionalWords}/>
          <FontAwesomeIcon icon={faCircleQuestion} id="additional-words-icon"/>
          <div class="hidden-div">
            <h3>Enhance Research with Keyword Indexing:</h3>
            <ul>
              <li>Keyword indexing (KeWI) streamlines your research by accelerating search and facilitating cross-referencing.</li>
              <li>Identify key terms and incorporate them into your queries for optimal results.</li>
              <li>You can customize KeWI by adding your own relevant terms. (Family words are grouped, so "invest" includes investment, investor, investing, etc.)</li>
            </ul>
          </div>
          </div>
          <button id="additional-words-btn" onClick={addWords}>Add words to the table</button>
        </div>
        

        </div>
        
        {/* Download CSV button */}
        <button id="download_csv"><a href={csvUrl} download={docName}>Download table (CSV)</a></button>
        
        {/* The buttons at the bottom of the page to switch between the components */}

      </div>
    )
}

export default WordTable
