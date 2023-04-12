// import axios from "axios";
import React from "react";
import NewRouter from './routers/index.jsx'
import { HashRouter } from "react-router-dom";
function App(){
    return (
            <div>
                <a href="#/ImageUploader">ImageUploader</a>
                <a href="#/PDFview" >PDFview</a>
                <HashRouter>
                    <NewRouter />
                </HashRouter>
        
            </div>
    )
}
 
export default App;
