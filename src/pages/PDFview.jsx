import React, { useEffect, useState } from 'react';// The code below sets the state of the component when the PDF document is successfully loaded

import '../meetstyle/File.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Document, Page, pdfjs } from "react-pdf";
// import {requestPDF} from "../api/upload"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFview =  () => {
  
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState(1);
  const [pageNumberFocus, setPageNumberFocus] = useState(false);
  const [numPages, setNumPages] = useState(1);
  const [pageWidth, setPageWidth] = useState(700);
  const [fullscreen, setFullscreen] = useState(false);
 const [data,setData]=useState()
//  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/requestPDF');
      const stream = response.body;
      const reader = stream.getReader();
      const chunks = [];
      console.log(response.body)
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const blob = new Blob(chunks, { type: 'application/pdf' });
      setData(blob);
  
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);
if(!data) return null
console.log(data); 
    
   
   

 const onDocumentLoadSuccess = async ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPageNumberInput(1);
    setPageWidth(600);
   
  };
  const lastPage = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
    setPageNumberInput(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber === numPages) {
      return;
    }
    setPageNumber(pageNumber + 1);
    setPageNumberInput(pageNumber + 1);
  };

  const onPageNumberFocus = () => {
    setPageNumberFocus(true);
  };

  const onPageNumberBlur = () => {
    setPageNumberFocus(false);
    setPageNumberInput(pageNumber);
  };

  const onPageNumberChange = (e) => {
    let value = e.target.value;
    value = value <= 0 ? 1 : value;
    value = value >= numPages ? numPages : value;
    setPageNumberInput(value);
  };

  const toPage = (e) => {
    if (e.keyCode === 13) {
      setPageNumber(Number(e.target.value));
    }
  };

  const pageZoomOut = () => {
    if (pageWidth <= 503) {
      return;
    }
    setPageWidth(pageWidth * 0.8);
  };

  const pageZoomIn = () => {
    setPageWidth(pageWidth * 1.2);
  };

  const pageFullscreen = () => {
    if (fullscreen) {
      setFullscreen(false);
      setPageWidth(600);
    } else {
      setFullscreen(true);
      setPageWidth(window.screen.width - 40);
    }
  };
  
  return (
    
    <div className="container">
     
       {data?(
        <Document
    
        file={ data}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={"加载中..."}
        options={{ url: true }}
        renderTextLayer={false}
        disableFontFace={ true }>
        <Page
            pageNumber={pageNumber}
            width={pageWidth}
            loading={"加载中..."}
            // renderAnnotationLayer={false}
            // renderTextLayer={false}
        />
    </Document>
 ):(
     <div></div>
)} 
    


    <div className="page-tool">
                <div className="page-tool-item" onClick={lastPage}>
                    {" "}
                    上一页
                </div>
                <div className="page-tool-item" onClick={nextPage}>
                    {" "}
                    下一页
                </div>
                <div className="input">
                    <input
                        value={pageNumberFocus ? pageNumberInput : pageNumber}
                        onFocus={onPageNumberFocus}
                        onBlur={onPageNumberBlur}
                        onChange={onPageNumberChange}
                        onKeyDown={toPage}
                        type="number"
                    />{" "}
                    / {numPages}
                </div>
                <div className="page-tool-item" onClick={pageZoomIn}>
                    {" "}
                    放大
                </div>
                <div className="page-tool-item" onClick={pageZoomOut}>
                    {" "}
                    缩小
                </div>
                <div className="page-tool-item" onClick={pageFullscreen}>
                    {fullscreen ? "恢复默认" : "适合窗口"}
                </div>
            </div>
    </div>
  );
}
export default PDFview;
