import React, { useEffect, useState } from "react";
interface FileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedData: string[][];
}
const FileUploadComponent: React.FC<FileUploadProps> = ({ handleFileUpload, uploadedData }) => {

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        {/* Display uploaded data */}
        {uploadedData.length > 0 && (
          <div>
            <h2>Uploaded Data:</h2>
            <ul>
              {uploadedData.map((row, rowIndex) => (
                <li key={rowIndex}>
                  {row.map((item, itemIndex) => ( 
                  item &&  <span key={itemIndex}>{item} , </span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadComponent;
