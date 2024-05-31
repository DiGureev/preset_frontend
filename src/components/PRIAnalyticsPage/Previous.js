import "./Previous.css"
import { useContext, useEffect, useState } from "react";
import api from "../../api";
import { AppContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";

const Previous = () => {
    const {setKiwiTable, download, setPath, setKeywordsFetched,setTable, setDocName} = useContext(AppContext);
    const [listOfTables, setList] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            checkPrevious();
        }, 5000);
    
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [checkPrevious]);

    const getTable = async (tableName) => {

        try {
            const res = await api.get(`/kiwi/table/${encodeURIComponent(tableName)}/`);
            const data = res.data;

            const table = JSON.parse(data.table);

            setKiwiTable(table.kiwitable);
            download(table.kiwitable);
            setPath(data.path);
            setKeywordsFetched(true);
            setTable(true);
            setDocName(data.name);

        } catch (err) {
            console.log(err);
        }

    }

    const checkPrevious = async () => {

        try{
            let res = await api.get(`/kiwi/all/`);
            let data = await res.data;
            setList(data);
        } catch (err){
            console.log(err);
        }
    }

    return <div id="previous-div">
            <h3>Recent</h3>
            <div id="prev-subtitle">
                <p>Jump back to your last queries</p>
                <p id="link" style={{color: "#2B58E1", fontWeight:"500"}}>See all</p>
            </div>
            <div>
                {
                    listOfTables && listOfTables.map((table, index)=>{
                        const createdTime = new Date(table.created_at);
                        const currentTime = new Date();
                        const timeDifference = Math.abs(currentTime - createdTime);
                        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

                        let timeAgo;
                        if (minutesDifference < 60) {
                        timeAgo = `${minutesDifference} minutes ago`;
                        } else {
                        const hoursDifference = Math.floor(minutesDifference / 60);
                        if (hoursDifference < 24) {
                            timeAgo = `${hoursDifference} hours ago`;
                        } else {
                            const daysDifference = Math.floor(hoursDifference / 24);
                            timeAgo = `${daysDifference} days ago`;
                        }
                        }

                        let name = table.name

                        if (name.length > 30){
                            name = name.slice(0,30) + "..."
                        }

                        return <div key={index} className="docsname-div" onClick={() => getTable(table.name)}>
                            <div className="docsicon-div">
                                <FontAwesomeIcon icon={faFile} className="docs-icon"/>
                                <p className="docs-name">{name}</p>
                            </div>
                            <div> {timeAgo}</div>

                        </div>
                    })
                }
            </div>
        </div>
}

export default Previous

