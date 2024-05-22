import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile} from '@fortawesome/free-solid-svg-icons';
import './Previous.css'

// const kiwi_url = process.env.REACT_APP_KIWI_URL;
const user_url = process.env.REACT_APP_USER_URL

const Previous = () => {
    const {logged,setKiwiTable, download, kiwitable, setPath, setKeywordsFetched,setTable, setDocName} = useContext(AppContext)
    const [listOfTables, setList] = useState([])

    useEffect(()=>{
        checkPrevious()
    },[kiwitable])

    const getTable = async (tableName) => {
        let csrfToken = await getCookie()

        console.log('This is token =>', csrfToken)

        let body = {name: tableName}
        let res = await fetch(`${kiwi_url}table/`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
                body: JSON.stringify(body)
        })

        let data = await res.json()
        setKiwiTable(JSON.parse(data.kiwitable))
        download(JSON.parse(data.kiwitable))
        setPath(data.path)
        setKeywordsFetched(true);
        setTable(true);
        setDocName(tableName)
      
        console.log(data)
    }

    const checkPrevious = async () => {
        let csrfToken = await getCookie()

        let res = await fetch(`${kiwi_url}all/`, {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
                  
                },
                credentials: 'include', // Include cookies in cross-origin requests
        })
        let data = await res.json()
        setList(data)
      
        console.log(data)
    }

    const getCookie = async () => {
        let token = await fetch(`${user_url}gettoken/`, {
            method: 'GET',
            credentials: 'include' // Include cookies in cross-origin requests
        })
        .then(response => response.json())
        .then(data => {
            const csrfToken = data.csrfToken;
            // console.log('This is token =>', csrfToken)
            
            return csrfToken
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
        });

        return token

    }

    if (logged) { return (
        <div id="previous-div">
            <h3>Recent</h3>
            <div id="prev-subtitle">
                <p>Jump back to your last queries</p>
                <p style={{color: '#2B58E1', fontWeight:'500'}}>See all</p>
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
                            name = name.slice(0,30) + '...'
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
    )} else {
        return <div id="previous-div">
                    <h3>To see your previous documents, please log in</h3>
                </div>
    }
}

export default Previous

