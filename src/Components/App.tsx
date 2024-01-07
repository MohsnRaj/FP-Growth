import React, { useState } from 'react';
import FileUploadComponent from './FileUploadComponent';
import ParseAndDisplayDatasetComponent from './ParseAndDisplayDatasetComponent';

const MainComponent: React.FC = () => {
  const [parsedDataset, setParsedDataset] = useState<string[][]>([]);

  const handleFileUpload = (data: string[][]) => {
    setParsedDataset(data);
  };

  return (
    <div>
      <h2>File Upload</h2>
      <FileUploadComponent onFileUpload={handleFileUpload} />
      {parsedDataset.length > 0 && (
        <ParseAndDisplayDatasetComponent dataset={parsedDataset} />
      )}
    </div>
  );
};

export default MainComponent;
