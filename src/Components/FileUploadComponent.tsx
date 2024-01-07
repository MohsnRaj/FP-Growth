import React, { ChangeEvent, useState } from 'react';

interface FileUploadProps {
  onFileUpload: (data: string[][]) => void;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const content = e.target.result as string;
          setFileContent(content);
          parseContent(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const parseContent = (content: string) => {
    // Assuming the content is properly formatted as described in your example
    const lines = content.split('\n').map((line) => line.trim());
    const parsedDataset = lines.map((line) => JSON.parse(line.replace('dataset = ', '')));
    onFileUpload(parsedDataset);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      {fileContent && <p>File uploaded successfully!</p>}
    </div>
  );
};

export default FileUploadComponent;
