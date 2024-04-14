import { useContext } from "react";
import { AppContext } from "../App.js";
import PlotPage from "./PlotPage.js";
import WordTable from "./WordTable.js";
import NetworkPlot from "./NetworkPlot.js";

const Results = () => {
    const {table, grasp, matrix} = useContext(AppContext)

    // Render correct component depends on user choice
    if (table == true) {
        return (
        <WordTable/>)
    } else if (grasp == true) {
        return (
        <PlotPage/>
        )
    } else if (matrix == true) {
        return (
        <NetworkPlot/>
        )
    }
}

export default Results