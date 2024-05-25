import UploadScreen from './UploadScreen.js';
import Results from './Results.js';
import { AppContext } from '../../App.js';
import { useContext, useEffect } from 'react';


const Analytics = ()=>{
      const {keywordsFetched} = useContext(AppContext)

      useEffect(()=>{

      },[keywordsFetched])

        return (
        <>
        <div className="grid-container">
          <div className="content-container">
            {!keywordsFetched && <UploadScreen />}
            <Results/>
          </div>
        </div>
        </>)
}

export default Analytics