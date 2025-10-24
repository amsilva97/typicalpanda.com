import { LanguageDefinition } from '../core';

/**
 * Old English language definition
 * Built around authentic historical name patterns and meanings
 * Focuses on common starts and endings, then expands to build complete names
 */
export const oldEnglish: LanguageDefinition = {
  patterns: {
  },

  options: {
    name: "Old English",
    startMarker: "^",
    endMarker: "$",
    minNodes: 2,              // Historical names like "Ed", "Ulf" were common (2 nodes: start + end)
    maxNodes: 4,              // Reduced from 6 to prevent overly long names like "mildeadmund"
    consecutiveSingleLetterLimit: 1,     // Rarely had consecutive single letters in authentic names
    nonConsecutiveSingleLetterLimit: 2,  // Limited single letters to maintain syllable integrity
    duplicateClusterLimit: 1             // Old English avoided repetitive patterns within names
  }
};
