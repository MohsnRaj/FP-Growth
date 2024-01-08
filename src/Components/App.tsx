import React, { useState } from "react";
import FileUploadComponent from "./FileUploadComponent";
import UserInputComponent from "./UserInputComponent";
import FPTree from "./FP-Tree/FPTree";

const FP_GrowthComponent: React.FC = () => {
  
  const [SelectedOption, setselectedOption] = useState<string>();
  const [uploadedData, setUploadedData] = useState<string[][]>([]);

  

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
  
    if (file) {
      try {
        const fileContents = await readFileContents(file);
        if (fileContents) {
          const processedData: string[][] = fileContents
            .slice(1, -1) // Remove the first and last lines
            .map((line) =>
              line
                .slice(1, -1)
                .split(",")
                .map((item) => item.trim().replace(/\]$/, '')) // Remove trailing ']'
                .filter((item) => item !== '') // Filter out empty strings
            ) // Remove the brackets, split by comma, remove empty strings, and trailing ']'
            .filter((line) => line.length > 0); // Filter out empty lines
  
          setUploadedData(processedData);
        } else {
          console.error("File is empty or not in the expected format.");
        }
      } catch (error) {
        console.error("Error reading the file:", error);
      }
    }
  };
  
  

  const readFileContents = (file: File): Promise<string[] | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event?.target?.result) {
          try {
            const content = event.target.result as string;
            // Split the content by lines
            const lines = content.split("\n");
            resolve(lines);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(null);
        }
      };

      reader.readAsText(file);
    });
  };

  const handleUserInput = (selectedOption: string) => {
    setselectedOption(selectedOption);
  };

  return (
    <div style={{margin: "10px"}}>
      <FileUploadComponent
        handleFileUpload={handleFileUpload}
        uploadedData={uploadedData}
      />

      {uploadedData.length > 0 && (
        <UserInputComponent onUserInput={handleUserInput} />
      )}
      {SelectedOption && (
       <FPTree
       data={uploadedData}
       selectedOption={SelectedOption}
       />
      )}
    </div>
  );
};

export default FP_GrowthComponent;
// useEffect(() => {
//   console.log(uploadedData);

//  }, [uploadedData])
