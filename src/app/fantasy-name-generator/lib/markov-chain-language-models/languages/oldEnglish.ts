import { LanguageDefinition } from '../core';

/**
 * Old English language definition
 * Built around authentic historical name patterns and meanings
 * Focuses on common starts and endings, then expands to build complete names
 */
export const oldEnglish: LanguageDefinition = {
  patterns: {
    // Start marker - expanded Old English name beginnings
    "^": ["Al", "Ael", "Aeth", "Ead", "Ed", "Eg", "Elf", "God", "Grim", "Har", "Hild", "Leo", "Os", "Ulf", "Wil", "Wulf", "Cuth", "Dun", "Eor", "Sig", "Thur", "Wend"],
    
    // Expanded starting patterns
    "Al": ["b", "d", "fr", "g", "r", "f", "m", "w"],
    "Ael": ["f", "fr", "g", "r", "d", "m"],
    "Aeth": ["el", "er", "red", "ric"],
    "Ead": ["g", "m", "w", "r", "b", "mund"],
    "Ed": ["g", "m", "w", "r", "gar", "mund"],
    "Eg": ["b", "g", "bert", "wald"],
    "Elf": ["r", "w", "red", "ric", "gar"],
    "God": ["fr", "w", "r", "win", "ric"],
    "Grim": ["b", "h", "ald", "bald"],
    "Har": ["d", "r", "old", "ald"],
    "Hild": ["a", "e", "red", "burg"],
    "Leo": ["f", "fr", "ric"],
    "Os": ["b", "g", "r", "w", "wald", "ric"],
    "Ulf": ["r", "w", "ric", "gar"],
    "Wil": ["f", "fr", "h", "fred", "helm"],
    "Wulf": ["r", "st", "ric", "gar"],
    "Cuth": ["bert", "red"],
    "Dun": ["stan", "wald"],
    "Eor": ["l", "men", "ric"],
    "Sig": ["mund", "red", "wald"],
    "Thur": ["stan", "wald"],
    "Wend": ["el", "il"],
    
    // Expanded single letter continuations
    "d": ["r", "w", "g", "gar", "mund", "ric", "wald", "$"],
    "g": ["ar", "er", "ir", "ulf", "wen", "bert", "mund", "$"],
    "l": ["d", "f", "fr", "r", "bert", "mund", "$"],
    "f": ["r", "red", "ric", "stan", "rid", "$"],
    "r": ["ed", "ic", "ulf", "wen", "ald", "bert", "$"],
    "b": ["ald", "ert", "orn", "ald", "erg", "$"],
    "h": ["ard", "ild", "ulf", "elm", "$"],
    "w": ["ald", "ard", "ulf", "ine", "old", "in", "$"],
    "m": ["er", "und", "ild", "ond", "$"],
    
    // Expanded two-letter patterns
    "fr": ["ed", "ic", "ith", "ied", "$"],
    "th": ["red", "ulf", "ild", "$"],
    "el": ["d", "f", "m", "bert", "mund", "$"],
    "er": ["ic", "ed", "ald", "bert", "$"],
    "ar": ["d", "ic", "ald", "ell", "$"],
    "ir": ["ed", "ic", "$"],
    "old": ["$"],
    "ond": ["$"],
    "ell": ["$"],
    "ied": ["$"],
    "men": ["$"],
    "rid": ["$"],
    "erg": ["$"],
    "elm": ["$"],
    "in": ["$"],
    "il": ["$"],
    
    // Extended three-letter patterns
    "ald": ["r", "w", "ric", "$"],
    "red": ["$"],
    "ric": ["$"],
    "ert": ["$"],
    "orn": ["$"],
    "ard": ["$"],
    "ild": ["a", "e", "$"],
    "ulf": ["$"],
    "ine": ["$"],
    "mer": ["$"],
    "und": ["$"],
    "wen": ["$"],
    "gar": ["$"],
    "ith": ["$"],
    "stan": ["$"],
    "bert": ["$"],
    "mund": ["$"],
    "wald": ["$"],
    "fred": ["$"],
    "helm": ["$"],
    "burg": ["$"],
    "bald": ["$"],
    "win": ["$"],
    
    // Vowel endings
    "a": ["$"],
    "e": ["$"]
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
