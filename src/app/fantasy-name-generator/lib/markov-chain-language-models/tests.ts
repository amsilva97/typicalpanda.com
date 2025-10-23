import { generateNamesForLanguage } from '../markov-chain-language-models/generations';
import { SupportedLanguage } from '../markov-chain-language-models/core';

function LevenshteinDistance(a: string, b: string): number {
  // If one string is empty, the distance is the length of the other
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Create a 2D array to store the distances
  const matrix: number[][] = [];

  // Initialize the first row and column
  for (let i = 0; i <= a.length; i++) {
    matrix[i] = [];
    matrix[i][0] = i;
  }
  
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,     // deletion
        matrix[i][j - 1] + 1,     // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
}

/**
 * Test to ensure generated names are diverse enough to avoid repetition
 * Returns [uniquePercentage, diversityScore]
 */
export function testNameDiversity(supportedLanguage: SupportedLanguage, sampleSize: number): [number, number] {
    const generatedNames = generateNamesForLanguage(supportedLanguage, sampleSize);
    const uniqueNames = new Set(generatedNames);
    
    // Calculate unique percentage
    const uniquePercentage = (uniqueNames.size / generatedNames.length) * 100;
    
    // Calculate Levenshtein distances between all pairs of names
    const distances: number[] = [];
    
    for (let i = 0; i < generatedNames.length; i++) {
        for (let j = i + 1; j < generatedNames.length; j++) {
            const distance = LevenshteinDistance(generatedNames[i], generatedNames[j]);
            distances.push(distance);
        }
    }
    
    // Calculate diversity score (average Levenshtein distance)
    const diversityScore = distances.length > 0 
        ? distances.reduce((sum, dist) => sum + dist, 0) / distances.length 
        : 0;
    
    return [uniquePercentage, diversityScore];
}