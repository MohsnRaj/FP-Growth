import React from 'react';

interface ParseAndDisplayProps {
  dataset: string[][];
}

const ParseAndDisplayDatasetComponent: React.FC<ParseAndDisplayProps> = ({ dataset }) => {
  return (
    <div>
      <h3>Parsed Dataset:</h3>
      <table>
        <tbody>
          {dataset.map((data, index) => (
            <tr key={index}>
              {data.map((item, itemIndex) => (
                <td key={itemIndex}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParseAndDisplayDatasetComponent;
