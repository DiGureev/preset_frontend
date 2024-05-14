import axios from 'axios';
import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from '../App.js';
import Plot from 'react-plotly.js';
import NavButtons from "./NavButtons.js";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
import './Results.css'
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const url = process.env.REACT_APP_API_URL;

const PlotPage = () => {
    const [plot, setPlot] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');

    const { file_path, kiwiTable} = useContext(AppContext);
    const additionalWords = useRef('');

    const addWords = async () => {
        setSelectedWord(additionalWords.current.value)
    }

    const getPlot = async () => {
        let selected = selectedWord || (kiwiTable.length > 0 ? kiwiTable[0].Word : '');

        let body = {
            words: selected,
            path: file_path
        };

        try {
            const response = await axios.post(`${url}plot`, body);
            const data = response.data;
            const plotData = JSON.parse(data.plot);
            setPlot(plotData.data);
            setSelectedWord(selected);
        } catch (error) {
            console.log('There was an error', error);
        }
    };

    useEffect(() => {
        getPlot();
    }, [file_path, kiwiTable, selectedWord]);


    const handleSelectChange = (e) => {
        setSelectedWord(e.target.value);
    };

    return (
        <div className="result-div">
            <NavButtons/>
            <div style={{padding: "1rem"}}> 
                {/* Select word from the list */}
                <div id="additional-words-input">
                    <select
                        id="search_word"
                        onChange={handleSelectChange}
                        value={selectedWord}
                    >
                    {kiwiTable.map((item, index) => (
                        <option value={item.Word} key={index}>{item.Word}</option>
                    ))}
                    </select>
                    <FontAwesomeIcon icon={faCircleQuestion} id="additional-words-icon" style={{marginLeft:"1rem"}}/>
                    <div class="hidden-div" style={{maxWidth:"300px", position: "absolut", left: "50%", zIndex: "1"}}>
                        <h3>Enhance Research with Keyword Indexing:</h3>
                        <ul>
                        <li>To get a quick glimpse of the context before diving deep into the reading, use a keyword to gather the pieces of information together. Examine the context with the keyword co-occurrence plot. Type in your own word or choose one from the KEWI list.</li>
                        </ul>
                    </div>
                </div>

                {/* <div  id="additional-words">
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
                    <button id="additional-words-btn" onClick={addWords}>Build the graph</button>
                </div> */}
            </div>
        <div id='content'>
            
            {/* Display plot */}
            {selectedWord && (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {plot.length == 0? <p>This word is not frequent enough or not present.<br/> Please try another word.</p> : <Plot data={plot} layout={{title: `Context for "${selectedWord}"`, yaxis: {
                        showgrid: false
                      }, paper_bgcolor:"#E0E7FB", plot_bgcolor:"#E0E7FB" }} useResizeHandler={true} style={{width: '100%', height: '100%'}} 
                      />}
                </div>
            )}
        </div>
        
    </div>
    )
}

export default PlotPage;
