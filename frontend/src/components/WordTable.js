import axios from "axios";
import { useContext, useRef} from "react";
import { AppContext } from "../App";
import Table from 'react-bootstrap/Table';
import NavButtons from "./NavButtons.js";
import '../App.css';

const url = process.env.REACT_APP_API_URL;

const WordTable = ( ) => {
    const {kiwiTable, setKiwiTable, file_path, header, setWords, csvUrl} = useContext(AppContext);
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
        <h2>{header}</h2>
        <div id='content'>
        <div id='table-content'>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Word</th>
                <th>Pages</th>
              </tr>
            </thead>
            <tbody>
              {kiwiTable.map((item, index) => (
                <tr key={index}>
                  <td>{item.Word}</td>
                  <td>{item.Pages}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        <div  id="additional-words">
          <p>If you would like to add additional words, please enter them here. <br/> Example: word1, word2</p>
          <input id="additional-words-input" type="text" ref={additionalWords}/>
          <button id="additional-words-btn" onClick={addWords}>Add words to the table</button>
        </div>
        </div>

        <button id="download_csv"><a href={csvUrl} download="word-table.csv">Download table (CSV)</a></button>
        <NavButtons/>
      </div>
    )
}

export default WordTable
