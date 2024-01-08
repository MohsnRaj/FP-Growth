import React, { useEffect, useState } from 'react';
interface FileUploadProps {
    data: string[][];
  }
const CountingItemSupport: React.FC<FileUploadProps> = ({data}) => {
 

  const [itemSupport, setItemSupport] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    // Function to calculate item support counts
    const calculateItemSupport = () => {
      const supportMap = new Map<string, number>();

      // Loop through each transaction
      data.forEach(transaction => {
        // Count support for each item in the transaction
        transaction.forEach(item => {
          if (supportMap.has(item)) {
            supportMap.set(item, supportMap.get(item)! + 1);
          } else {
            supportMap.set(item, 1);
          }
        });
      });

      // Set the calculated support counts to state
      setItemSupport(supportMap);
    };

    // Call the function to calculate item support when the component mounts
    calculateItemSupport();
  }, [data]);

  return (
    <div>
      <h2>Item Support Counts</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Support Count</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(itemSupport.entries()).map(([item, count]) => (
            <tr key={item}>
              <td>{item}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountingItemSupport;
