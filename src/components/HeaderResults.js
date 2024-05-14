import { AppContext } from "../App"
import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile} from '@fortawesome/free-solid-svg-icons';
import './HeaderResults.css'

const HeaderResults = () => {

    const {docName, table, grasp, matrix} = useContext(AppContext)
    let filename = docName.slice(0,8) + '...pdf'

    console.log(filename)

    return (
        <>
            {table &&  (
                <div id="results-header-div">
                    <h1>Comparative analytics</h1>
                    <p>Here are the keywords from your file:</p>
                    <div className="file-name-div">
                        <FontAwesomeIcon icon={faFile} className="filename-icon"/>
                        <p>{filename}</p>
                    </div>
                </div>
            )}
            {grasp && (
                <div id="results-header-div">
                    <h1>Context analytics</h1>
                    <p>Choose the word to build the graph:</p>
                    <div className="file-name-div">
                        <FontAwesomeIcon icon={faFile} className="filename-icon"/>
                        <p>{filename}</p>
                    </div>
                </div>
            )}

            {matrix && (
                <div id="results-header-div">
                    <h1>Document Word Web</h1>
                    <p>Here are the keywords from your file:</p>
                    <div className="file-name-div">
                        <FontAwesomeIcon icon={faFile} className="filename-icon"/>
                        <p>{filename}</p>
                    </div>
                </div>
            )}
        </>
    );

}

export default HeaderResults