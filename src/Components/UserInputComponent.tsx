import React, { useState } from 'react';

interface UserInputProps {
  onUserInput: (selectedOption: string) => void;
}

const UserInputComponent: React.FC<UserInputProps> = ({ onUserInput }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    onUserInput(e.target.value); // Pass the selected option to the parent component
  };

  return (
    <div>
      <label>Select an Option:</label>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="MinSupport">MinSupport</option>
        <option value="MinConfidence">MinConfidence</option>
        <option value="NumPartitions">NumPartitions</option>
      </select>
    </div>
  );
};

export default UserInputComponent;
