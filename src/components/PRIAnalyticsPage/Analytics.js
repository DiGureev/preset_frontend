import UploadScreen from './UploadScreen.js';
import Results from './Results.js';
import { AppContext } from '../../App.js';
import { useContext, useEffect } from 'react';
import Previous from "./Previous.js";


const Analytics = ()=>{
      const {logged, keywordsFetched} = useContext(AppContext)

      useEffect(()=>{

      },[keywordsFetched])

        return (
        <>
        <div className="grid-container">
          <div className="content-container">
            {!keywordsFetched && <UploadScreen />}
            <Results/>
            {logged && <Previous />}
          </div>
        </div>
        </>)
}

export default Analytics