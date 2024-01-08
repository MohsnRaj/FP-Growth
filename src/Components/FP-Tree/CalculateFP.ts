export const calculateFrequentPatternsByMinSupport = (
  conditionalPatternBases: Map<string, string[]>,
  minSupportValue: number
): string[] => {
  let frequentPatterns: string[] = [];

  // Iterate through each entry in conditionalPatternBases
  conditionalPatternBases.forEach((patterns: string[], item: string) => {
    // Check if the number of patterns associated with the item meets the minimum support
    if (patterns.length >= minSupportValue) {
      // If it meets the support, add this item to the frequent patterns
      frequentPatterns.push(item);
    }
  });

  // Now, let's generate combinations of frequent itemsets of different sizes
  frequentPatterns = generateItemsetCombinations(frequentPatterns);

  return frequentPatterns;
};

// Function to generate combinations of frequent itemsets of different sizes
const generateItemsetCombinations = (frequentItems: string[]): string[] => {
  const frequentItemsets: string[] = [];

  // Generate combinations of frequent itemsets of different sizes
  const generateCombinations = (items: string[], prefix: string[]) => {
    for (let i = 0; i < items.length; i++) {
      const currentItem = items[i];
      const newPrefix = [...prefix, currentItem];
      frequentItemsets.push(newPrefix.join(","));

      const remainingItems = items.slice(i + 1);
      if (remainingItems.length > 0) {
        generateCombinations(remainingItems, newPrefix);
      }
    }
  };

  // Generate combinations for different sizes starting from 2
  for (let i = 0; i < frequentItems.length; i++) {
    generateCombinations(frequentItems.slice(i + 1), [frequentItems[i]]);
  }

  return frequentItemsets;
};
export const generateAssociationRules = (
  frequentPatterns: string[],
  data: string[][],
  minSupport: number
): string[] => {
  const associationRules: string[] = [];

  frequentPatterns.forEach((pattern) => {
    const items = pattern.split(",");

    // Generate rules for each item as the consequent
    for (let i = 0; i < items.length; i++) {
      const consequent = items[i];
      const antecedent = items.filter((item, index) => index !== i).join(",");

      const supportAntecedent = calculateSupport(antecedent.split(","), data);
      const supportConsequent = calculateSupport(consequent.split(","), data);

      if (supportAntecedent >= minSupport && supportConsequent >= minSupport) {
        associationRules.push(
          `<${antecedent},${consequent}:${Math.min(
            supportAntecedent,
            supportConsequent
          )}>`
        );
      }
    }
  });

  return associationRules;
};

// filter Rules By Support
export const filterRulesBySupport = (rules: string[], minSupport: number, data: string[][]): string[] => {
    const filteredRules: string[] = [];
  
    // const totalTransactions = data.length;
  
    rules.forEach(rule => {
      // Extract the antecedent, consequent, and support parts from the rule
      const ruleParts = rule.match(/<(.+):(.+)>/);
      if (ruleParts && ruleParts.length === 3) {
        const antecedent = ruleParts[1];
        // const support = parseFloat(ruleParts[2]);
  
        // Calculate support for the antecedent itemset
        const supportAntecedent = calculateSupport(antecedent.split(','), data);
  
        // Check if the calculated support meets the minimum support threshold
        if (supportAntecedent >= minSupport) {
          filteredRules.push(rule);
        }
      }
      // Handle incorrect rule format or exclude if needed
      // For instance, you can log or skip rules without the expected format
    });
  
    return filteredRules;
  };
const calculateSupport = (itemset: string[], data: string[][]): number => {
  const supportCount = data.filter((transaction) =>
    containsAllItems(transaction, itemset)
  ).length;
  // return supportCount / data.length;
  return supportCount;
};

const containsAllItems = (
  transaction: string[],
  itemset: string[]
): boolean => {
  return itemset.every((item) => transaction.includes(item));
};

type Rule = string;
export function removeRedundantRules(rules: Rule[]): Rule[] {
    const uniqueRules: { [key: string]: Rule } = {};

    for (const rule of rules) {
        const key = extractValues(rule).join(','); // Step 1: Extract values and join them
        
        const sortedKey = orderAlphabetically(key); // Step 2: Order alphabetically
        
        if (!uniqueRules.hasOwnProperty(sortedKey)) {
            uniqueRules[sortedKey] = rule;
        }
    }

    return Object.values(uniqueRules);
}

function extractValues(str: string): string[] {
    const matches = str.match(/<([^>:]+)/g);
  
    if (matches) {
        return matches.map(match => {
            return match.substring(1);
        });
    }
  
    return [];
}
function orderAlphabetically(str: string): string {
    const arr = str.split(',').sort();
    return arr.join(',');
}

