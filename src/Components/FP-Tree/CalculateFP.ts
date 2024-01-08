export const calculateFrequentPatternsByMinSupport = (conditionalPatternBases: Map<string, string[]>, minSupportValue: number): string[] => {
    let frequentPatterns: string[] = [];
  
    // Iterate through each entry in conditionalPatternBases
    conditionalPatternBases.forEach((patterns: string[], item: string) => {
      // Check if the number of patterns associated with the item meets the minimum support
      console.log("Pattern",patterns);
      
      if (patterns.length >= minSupportValue) {
        // If it meets the support, add this item to the frequent patterns
        frequentPatterns.push(item);
      }
    });
  
    return frequentPatterns;
  };
  
  
  
  export const calculateFrequentPatternsByMinConfidence = (conditionalPatternBases: Map<string, string[]>, minConfidenceValue: number): string[] => {
    let frequentPatterns: string[] = [];
  
    // Iterate through each entry in conditionalPatternBases
    conditionalPatternBases.forEach((patterns: string[], item: string) => {
      // Count occurrences of the item's patterns in the dataset
      let itemCount = 0;
  
      // Iterate through other items in the conditional pattern bases to find joint occurrences
      conditionalPatternBases.forEach((otherPatterns: string[], otherItem: string) => {
        if (otherItem !== item) {
          // Check if the other item's patterns contain the current item's patterns
          const intersection = patterns.filter(pattern => otherPatterns.includes(pattern));
          const confidence = intersection.length / patterns.length;
  
          // If confidence meets the threshold, increment the count of occurrences
          if (confidence >= minConfidenceValue) {
            itemCount++;
          }
        }
      });
  
      // Check if the confidence meets the threshold for the item itself
      const itemConfidence = itemCount / conditionalPatternBases.size;
  
      // If confidence meets the threshold, add this item to the frequent patterns
      if (itemConfidence >= minConfidenceValue) {
        frequentPatterns.push(item);
      }
    });
  
    return frequentPatterns;
  };
  
  
  export const calculateFrequentPatternsByNumPartition = (conditionalPatternBases: Map<string, string[]>, numPartitionValue: number): string[] => {
    let frequentPatterns: string[] = [];
  
    // Create a map to count partitions for each item
    const partitionCounts: Map<string, number> = new Map();
  
    // Iterate through each pattern in conditionalPatternBases
    conditionalPatternBases.forEach((patterns: string[], item: string) => {
      // Initialize count for the current item
      partitionCounts.set(item, 0);
  
      // Iterate through other items to count partitions
      conditionalPatternBases.forEach((otherPatterns: string[], otherItem: string) => {
        if (otherItem !== item) {
          // Check if there's an intersection between patterns of current item and other items
          const intersection = patterns.filter(pattern => otherPatterns.includes(pattern));
  
          // If there's an intersection, increment the partition count for the current item
          if (intersection.length > 0) {
            const count = partitionCounts.get(item) || 0;
            partitionCounts.set(item, count + 1);
          }
        }
      });
    });
  
    // Check which items meet the specified number of partitions
    partitionCounts.forEach((count, item) => {
      if (count >= numPartitionValue) {
        frequentPatterns.push(item);
      }
    });
  
    return frequentPatterns;
  };
  