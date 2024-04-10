import axios from 'axios';
import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from '../App.js';
import Plot from 'react-plotly.js';
import NavButtons from "./NavButtons.js";
import '../App.css';

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
            <h2>Grasping the Context</h2>
            <div id='content'>
            <div style={{padding: "1rem"}}>
                <p>To get a quick glimpse of the context before diving deep into the reading, use a keyword to gather the pieces of information together.
                Examine the context with the keyword co-occurrence plot. Type in your own word or choose one from the KEWI list.</p>
                <p id = "choose_words">Choose the word to build the graph:</p>
                <select
                    id="search_word"
                    onChange={handleSelectChange}
                    value={selectedWord}
                    
                >
                    {kiwiTable.map((item, index) => (
                        <option value={item.Word} key={index}>{item.Word}</option>
                    ))}
                </select>
                <div  id="additional-words">
                <p>or enter your word: <br/></p>
                <input id="additional-words-input" type="text" ref={additionalWords}/>
                <button id="additional-words-btn" onClick={addWords}>Build the graph</button>
                </div>
            </div>
            {selectedWord && (
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {plot.length == 0? <p>This word is not frequent enough or not present.<br/> Please try another word.</p> : <Plot data={plot} layout={{title: `Context for "${selectedWord}"` }} useResizeHandler={true} style={{width: '100%', height: '100%'}} />}
                </div>
            )}
            </div>
            
            <NavButtons/>
        </div>
    )
}

export default PlotPage;
