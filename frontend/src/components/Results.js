import { useContext } from "react";
import { AppContext } from "../App.js";
import PlotPage from "./PlotPage.js";
import WordTable from "./WordTable.js";
import Matrix from "./Matrix.js";

const Results = () => {
    const {table, grasp, matrix} = useContext(AppContext)
    if (table == true) {
        return (
        <WordTable/>)
    } else if (grasp == true) {
        return (
        <PlotPage/>
        )
    } else if (matrix == true) {
        return (
        <Matrix/>
        )
    }
}

export default Results