import { generateName } from '../markov-chain-language-models/generations';
import { SupportedLanguage, getLanguageDefinition } from '../markov-chain-language-models/core';

/**
 * Calculate the Levenshtein distance between two strings
 */
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
 * Calculate diversity score using average Levenshtein distance
 */
function getDiversityScore(names: string[]): number {
    if (names.length < 2) return 0;

    const distances: number[] = [];

    for (let i = 0; i < names.length; i++) {
        for (let j = i + 1; j < names.length; j++) {
            const distance = LevenshteinDistance(names[i], names[j]);
            distances.push(distance);
        }
    }

    return distances.reduce((sum, dist) => sum + dist, 0) / distances.length;
}

/**
 * Simple diversity test that generates names one by one until it fails
 * Returns [finalNameCount, finalUniquePercentage, finalDiversityScore]
 */
export function testNameDiversity(supportedLanguage: SupportedLanguage): [number, number, number] {
    const languageDefinition = getLanguageDefinition(supportedLanguage);
    const generatedNames: Set<string> = new Set();
    let totalGeneratedNames = 0;
    let totalDuplicatesGenerated = 0;
    let uniquePercentage: number;

    for (let i = 0; i < 1000; i++) {
        const name = generateName(languageDefinition);
        totalGeneratedNames++;
        if (generatedNames.has(name)) {
            totalDuplicatesGenerated++;
        } else {
            generatedNames.add(name);
        }
        uniquePercentage = ((totalGeneratedNames - totalDuplicatesGenerated) / totalGeneratedNames) * 100;
        if (uniquePercentage < 95) {
            break;
        }
    }

    const finalNameCount = totalGeneratedNames;
    const finalUniquePercentage = ((totalGeneratedNames - totalDuplicatesGenerated) / totalGeneratedNames) * 100;
    const finalDiversityScore = getDiversityScore(Array.from(generatedNames));

    return [finalNameCount, finalUniquePercentage, finalDiversityScore];
}