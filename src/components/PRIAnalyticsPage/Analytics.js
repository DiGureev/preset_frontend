import { AppContext } from "../../App.js";
import { useContext, useEffect } from "react";
import UploadScreen from "./UploadScreen.js";
import Results from "./Results.js";
import Previous from "./Previous.js";


const Analytics = ()=>{
      const {kiwitable, keywordsFetched} = useContext(AppContext);

      // reload page every time kiwitable changed
      useEffect(()=>{

      },[kiwitable])

        return (
        <>
        <div className="grid-container">
          <div className="content-container">
            {!keywordsFetched && <UploadScreen />}
            <Results/>
            <Previous />
          </div>
        </div>
        </>)
}

export default Analytics