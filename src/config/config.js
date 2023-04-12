import {requestPDF } from "../api/upload";

// 加载pdf文件

export   const prfUrl = async () => {
try {
    const response= await requestPDF();
    if(response.code) {
        return requestPDF
    }else{
        
        console.log("加载失败！");
        return requestPDF
    }
} catch (error) {
    console.log(error);
}
}