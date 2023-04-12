import React, { useState } from "react";
import "../meetstyle/ImageUploader.css"
import { uploadimage } from "../api/upload";
function ImageUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileInput = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleRemove = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("image", selectedFiles[i]);
    }

    
    const response=await uploadimage(formData)
      console.log(response);
      return  alert(response.msg)
     
    }catch(err){
      console.error(err);
      alert("错误！！");
    }
  }
  return (
    <div className="uploader-container">
      <div className="upload-form-container" >
        <form onSubmit={handleSubmit}>
          <label htmlFor="imageUpload">选择图片</label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleFileInput}
          />
          <button type="submit" className="upload-button" >
            提交
          </button>
        </form>
      </div>
      <div className="selected-images-container">
        {selectedFiles.map((file, index) => (
          <div className="selected-image-container" key={index}>
            <img
              className="selected-image"
              src={URL.createObjectURL(file)}
              alt="selected"    
            />
            <button
              className="remove-button"
              onClick={() => handleRemove(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
