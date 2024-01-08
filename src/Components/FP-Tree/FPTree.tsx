import React, { useEffect, useState } from "react";
import {
  calculateFrequentPatternsByMinSupport,
  filterRulesBySupport,
  generateAssociationRules,
//   removeRedundantRules,
} from "./CalculateFP";
interface FileUploadProps {
  data: string[][];
  selectedOption: string;
}

const FPTree: React.FC<FileUploadProps> = ({ data, selectedOption }) => {
  const [itemSupport, setItemSupport] = useState<Map<string, number>>(
    new Map()
  );
  const [headerTable, setHeaderTable] = useState<Map<string, string[]>>(
    new Map()
  );

  useEffect(() => {
    // Function to calculate item support counts
    const calculateItemSupport = () => {
      const supportMap = new Map<string, number>();

      // Loop through each transaction
      data.forEach((transaction) => {
        // Count support for each item in the transaction
        transaction.forEach((item) => {
          if (supportMap.has(item)) {
            supportMap.set(item, supportMap.get(item)! + 1);
          } else {
            supportMap.set(item, 1);
          }
        });
      });

      // Sort items by support counts in descending order
      const sortedItems = Array.from(supportMap).sort((a, b) => b[1] - a[1]);
      const sortedSupportMap = new Map<string, number>(sortedItems);

      // Set the sorted support counts to state
      setItemSupport(sortedSupportMap);

      // Create header table (item -> linked nodes)
      const headerTableMap = new Map<string, string[]>();
      data.forEach((transaction) => {
        transaction.forEach((item) => {
          if (headerTableMap.has(item)) {
            const linkedNodes = headerTableMap.get(item)!;
            linkedNodes.push(transaction.join("-")); // Storing linked nodes (transaction)
            headerTableMap.set(item, linkedNodes);
          } else {
            headerTableMap.set(item, [transaction.join("-")]);
          }
        });
      });

      // Set the header table to state
      setHeaderTable(headerTableMap);
    };

    // Call the function to calculate and create the header table when the component mounts
    calculateItemSupport();
  }, [data]);

  useEffect(() => {
    // Function to simulate scanning and building FP-Tree
    const scanAndBuildTree = () => {
      // Loop through each transaction
      data.forEach((transaction) => {
        // Sort transaction items by their support count order
        const sortedTransaction = transaction.slice().sort((a, b) => {
          return (itemSupport.get(b) || 0) - (itemSupport.get(a) || 0);
        });

        // Simulate traversing the FP-Tree (without building the actual tree structure)
        sortedTransaction.forEach((item) => {
          // Simulate processing each item in the transaction
          // Here, you can perform operations related to updating the FP-Tree or header table
          // For example, incrementing counts or creating new nodes
          if (headerTable.has(item)) {
            const linkedNodes = headerTable.get(item)!;
            // console.log(`Item: ${item}, Linked Nodes: ${linkedNodes.join(', ')}`);
            // Simulate incrementing count or creating new nodes in the FP-Tree
            // Update the header table if needed
          } else {
            // console.log(`Item: ${item}, No Linked Nodes`);
            // Simulate creating a new node in the FP-Tree
            // Update the header table if needed
          }
        });
      });
    };

    // Call the function to simulate scanning and building the FP-Tree when the component mounts
    scanAndBuildTree();
  }, [data, itemSupport, headerTable]);

  // Function to generate conditional pattern bases for each item
  const generateConditionalPatternBases = () => {
    const conditionalPatternBases: Map<string, string[]> = new Map();

    // Loop through each item in the header table
    for (const [item, linkedNodes] of headerTable.entries()) {
      const patternBase: string[] = [];

      // Process each linked node (transaction) for the item
      linkedNodes.forEach((node) => {
        if (node) {
          const transactionItems = node.split("-"); // Assuming transactions are separated by '-'

          // Filter transaction items for the current item
          const filteredTransaction = transactionItems.filter(
            (i) => i !== item
          );

          if (filteredTransaction.length > 0) {
            patternBase.push(filteredTransaction.join(",")); // Add to conditional pattern base
          }
        }
      });

      conditionalPatternBases.set(item, patternBase);
    }

    return conditionalPatternBases;
  };

  // Inside the component return statement, after the header table rendering...

  // Generate conditional pattern bases
  const conditionalPatternBases = generateConditionalPatternBases();
  const generateFrequentPatterns = (selectedOption: string) => {
    // Ensure selectedOption has a value
    if (!selectedOption) {
      console.error("Please select an option."); // Handle error or prompt user to select an option
      return [];
    }

    let frequentPatterns: string[] = [];

    // Implement logic based on the selected

    frequentPatterns = calculateFrequentPatternsByMinSupport(
      conditionalPatternBases,
      3
    );

    return frequentPatterns;
  };

  useEffect(() => {
    if (conditionalPatternBases) {
      // console.log(conditionalPatternBases);
      // console.log("selectedOption",selectedOption);

      const frequentPatterns = generateFrequentPatterns(selectedOption);
      // Handle the generated frequent patterns, e.g., display or further processing
      //   console.log('Generated frequent patterns:', frequentPatterns);

      // You can set the generated patterns to state or use them accordingly

      // Generate association rules from the frequent patterns
      const associationRules = generateAssociationRules(
        frequentPatterns,
        data,
        0.6
      );
      console.log("associationRules Rules:", associationRules);
      // Handle the generated association rules
      // You can set the generated association rules to state or use them accordingly
      if (associationRules) {
        switch (selectedOption) {
          case "Support":
            type Rule = string;
            const Support = filterRulesBySupport(associationRules, 0.6, data);
            // const uniqueOutputRules: Rule[] = removeRedundantRules(Support);
            // console.log(uniqueOutputRules);
            break;

          default:
            break;
        }
      }
    }
  }, [conditionalPatternBases, selectedOption]);

  return (
    <div>
      <h2>Conditional Pattern Bases</h2>
      <ul>
        {Array.from(conditionalPatternBases.entries()).map(
          ([item, patternBase]) => (
            <li key={item}>
              Item: {item}, Conditional Pattern Base: {patternBase.join(" | ")}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default FPTree;
