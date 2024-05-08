import UploadScreen from './PRIAnalyticsPage/UploadScreen.js';
import Previous from './Previous.js';
import Results from './Results.js';


const Analytics = ()=>{
        return (
        <>
        <div className="grid-container">
        <Previous />
        <div className="content-container">
          <UploadScreen />
          <Results/>
        </div>
        </div>
        </>)
}

export default Analytics