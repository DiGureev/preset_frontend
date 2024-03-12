import axios from 'axios';
import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App.js';
import Plot from 'react-plotly.js';
import NavButtons from "./NavButtons.js";
import '../App.css';

const url = process.env.REACT_APP_API_URL;

const PlotPage = () => {
    const [plot, setPlot] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');
    const { addedWords, file_path, kiwiTable} = useContext(AppContext);

    const getPlot = async () => {
        let selected = selectedWord || (kiwiTable.length > 0 ? kiwiTable[0].Word : '');

        let body = {
            words: addedWords || selected,
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
    }, [addedWords, file_path, kiwiTable, selectedWord]);


    const handleSelectChange = (e) => {
        setSelectedWord(e.target.value);
    };

    return (
        <div className="result-div">
            <h2>Context Analytics</h2>
            <div id="additional-words">
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
            </div>
            {selectedWord && (
                <div>
                    <Plot data={plot} layout={{ width: 600, height: 300, title: `Context for "${selectedWord}"` }} />
                </div>
            )}
            
            <NavButtons/>
        </div>
    )
}

export default PlotPage;
