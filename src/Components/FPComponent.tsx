import React, { useState } from 'react';

const FPGrowth: React.FC = () => {
  const [frequentPatterns, setFrequentPatterns] = useState<string[]>([]);

  const calculateFrequentPatterns = (
    data: string[][],
    minSupport: number,
    minConfidence: number,
    numPartition: number
  ) => {
    // Implementation of the FP-Growth algorithm
    const transactions = data.map(itemSet => new Set(itemSet));
    const items = new Map<string, number>();
    const conditionalPatternBase: Map<string, string[]> = new Map();

    // Count individual item frequencies
    transactions.forEach(transaction => {
      transaction.forEach(item => {
        items.set(item, (items.get(item) || 0) + 1);
      });
    });

    // Remove infrequent items
    const frequentItems = Array.from(items.keys()).filter(
      item => items.get(item)! >= minSupport
    );
    const frequentSet = new Set(frequentItems);

    // Generate conditional pattern base
    transactions.forEach(transaction => {
      const filteredTransaction = Array.from(transaction).filter(item =>
        frequentSet.has(item)
      );
      for (let i = filteredTransaction.length - 1; i >= 0; i--) {
        const item = filteredTransaction[i];
        const conditionalBase = conditionalPatternBase.get(item) || [];
        const prefix = JSON.stringify(filteredTransaction.slice(0, i + 1));
        if (!conditionalBase.includes(prefix)) {
          conditionalBase.push(prefix);
          conditionalPatternBase.set(item, conditionalBase);
        }
      }
    });

    // Generate unique frequent patterns
    const frequentPatternsResult: string[] = [];
    conditionalPatternBase.forEach((patterns, item) => {
      const count = patterns.length;
      if (count >= minSupport) {
        const patternItems = patterns.join(',');
        frequentPatternsResult.push(`<${item},${patternItems}:${count}>`);
      }
    });

    setFrequentPatterns(frequentPatternsResult);
  };

  const inputData = [
    ['E', 'K', 'M', 'N', 'O', 'Y'],
    ['D', 'E', 'K', 'N', 'O', 'Y'],
    ['A', 'E', 'K', 'M'],
    ['C', 'K', 'M', 'U', 'Y'],
    ['C', 'E', 'I', 'K', 'O', 'O'],
  ];

  const handleCalculate = () => {
    calculateFrequentPatterns(inputData, 2, 0.6, 1);
  };

  return (
    <div>
      <button onClick={handleCalculate}>Calculate Frequent Patterns</button>
      <div>
        <h3>Frequent Patterns:</h3>
        <ul>
          {frequentPatterns.map((pattern, index) => (
            <li key={index}>{pattern}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FPGrowth;
