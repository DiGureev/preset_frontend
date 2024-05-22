import UploadScreen from './PRIAnalyticsPage/UploadScreen.js';
// import Previous from './Previous.js';
import Results from './Results.js';
import { AppContext } from '../App.js';
import { useContext } from 'react';


const Analytics = ()=>{
      const {keywordsFetched} = useContext(AppContext)

        return (
        <>
        <div className="grid-container">
          <div className="content-container">
            {!keywordsFetched && <UploadScreen />}
            <Results/>
          </div>
          {/* <Previous /> */}
        </div>
        </>)
}

export default Analytics