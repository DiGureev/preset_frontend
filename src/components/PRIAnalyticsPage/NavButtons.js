import "../../App.css";
import { useState, useContext } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { AppContext } from "../../App.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faChartPie, faDiagramProject } from "@fortawesome/free-solid-svg-icons";

const NavButtons = () => {
    const {table, grasp, matrix, setTable, setGrasp, setMatrix} = useContext(AppContext);
    const [value, setValue] = useState("");

    const handleChange = (val) => {
        setValue(val)
        if (val === "table") {
            setTable(true);
            setGrasp(false);
            setMatrix(false);
        } else if (val === "grasp") {
            setTable(false);
            setGrasp(true);
            setMatrix(false);
        } else {
            setTable(false);
            setGrasp(false);
            setMatrix(true);
        }
    }

    return(
    <div id="toggle-btn-div">
      <ToggleButtonGroup type="radio" value={value} onChange={handleChange} name="component">
        <ToggleButton className={table ? "toggle-btn active" : "toggle-btn"} id="tbg-btn-1" value={"table"} >
         <FontAwesomeIcon icon={faList} className="toggle-icon"/>  Comparative Analytics
        </ToggleButton>
        <ToggleButton className={grasp ? "toggle-btn active" : "toggle-btn"} id="tbg-btn-2" value={"grasp"} >
         <FontAwesomeIcon icon={faChartPie} className="toggle-icon"/>  Context Analytics
        </ToggleButton>
        <ToggleButton className={matrix ? "toggle-btn active" : "toggle-btn"} id="tbg-btn-3" value={"matrix"} >
         <FontAwesomeIcon icon={faDiagramProject} className="toggle-icon"/>  Document Word Web
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
    )
}

export default NavButtons