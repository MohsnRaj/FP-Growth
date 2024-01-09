import React from 'react';

interface UserInputProps {
  onUserInput: (selectedOption: number) => void;
}

const UserInputComponent: React.FC<UserInputProps> = ({ onUserInput }) => {

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    
    onUserInput(parseInt(e.target.value)); // Pass the selected option to the parent component
  };

  return (
    <div>
      <label>input the Suppport Number:</label>
     <input type="number" name="" id="" onChange={(e)=>handleOptionChange(e)} />
    </div>
  );
};

export default UserInputComponent;
