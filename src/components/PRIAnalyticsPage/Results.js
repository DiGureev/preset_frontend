import { useContext } from "react";
import { AppContext } from "../../App.js";
import PlotPage from "./PlotPage.js";
import WordTable from "./WordTable.js";
import NetworkPlot from "./NetworkPlot.js";
import HeaderResults from "./HeaderResults.js";

const Results = () => {
    const {table, grasp, matrix} = useContext(AppContext)

    // Render correct component depends on user choice
    if (table === true) {
        return (
        <>
        <HeaderResults/>
        <WordTable/>
        </>)
    } else if (grasp === true) {
        return (
        <>
        <HeaderResults/>
        <PlotPage/>
        </>
        )
    } else if (matrix === true) {
        return (
        <>
        <HeaderResults/>
        <NetworkPlot/>
        </>
        )
    }
}

export default Results