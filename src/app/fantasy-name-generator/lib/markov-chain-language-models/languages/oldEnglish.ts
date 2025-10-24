import { LanguageDefinition } from '../core';

/**
 * Old English language definition
 * Built around authentic historical name patterns and meanings
 * Focuses on common starts and endings, then expands to build complete names
 */
export const oldEnglish: LanguageDefinition = {
  patterns: {
    // Start marker - expanded Old English name beginnings
    "^": ["Al", "Ael", "Aeth", "Ead", "Ed", "Eg", "Elf", "God", "Grim", "Har", "Hild", "Leo", "Os", "Ulf", "Wil", "Wulf", "Cuth", "Dun", "Eor", "Sig", "Thur", "Wend", "Oth", "Bri", "Cen", "Ord"],
    
    // Expanded starting patterns
    "Al": ["b", "d", "fr", "g", "r", "f", "m", "w", "ric", "win"],
    "Ael": ["f", "fr", "g", "r", "d", "m", "red", "stan"],
    "Aeth": ["el", "er", "red", "ric", "stan", "wald"],
    "Ead": ["g", "m", "w", "r", "b", "mund", "ric", "win"],
    "Ed": ["g", "m", "w", "r", "gar", "mund", "ric", "win"],
    "Eg": ["b", "g", "bert", "wald", "ric", "mund"],
    "Elf": ["r", "w", "red", "ric", "gar", "win", "stan"],
    "God": ["fr", "w", "r", "win", "ric", "mund", "wald"],
    "Grim": ["b", "h", "ald", "bald", "mund", "wald"],
    "Har": ["d", "r", "old", "ald", "ry", "bert"],
    "Hild": ["a", "e", "red", "burg", "gard", "run"],
    "Leo": ["f", "fr", "ric", "wald", "bert"],
    "Os": ["b", "g", "r", "w", "wald", "ric", "mund", "win"],
    "Ulf": ["r", "w", "ric", "gar", "red", "stan"],
    "Wil": ["f", "fr", "h", "fred", "helm", "ric", "bert"],
    "Wulf": ["r", "st", "ric", "gar", "red", "helm"],
    "Cuth": ["bert", "red", "ric", "win"],
    "Dun": ["stan", "wald", "ric"],
    "Eor": ["l", "men", "ric", "mund"],
    "Sig": ["mund", "red", "wald", "ric", "bert"],
    "Thur": ["stan", "wald", "ric", "mund"],
    "Wend": ["el", "il", "ric"],
    "Oth": ["helm", "ric", "wald", "red"],
    "Bri": ["ht", "c", "ard"],
    "Cen": ["red", "ric", "wald"],
    "Ord": ["gar", "ric", "wine"],
    
    // Expanded single letter continuations
    "d": ["r", "w", "g", "gar", "mund", "ric", "wald", "wine", "a", "e", "$"],
    "g": ["ar", "er", "ir", "ulf", "wen", "bert", "mund", "wald", "ard", "a", "e", "$"],
    "l": ["d", "f", "fr", "r", "bert", "mund", "ric", "wald", "a", "e", "i", "$"],
    "f": ["r", "red", "ric", "stan", "rid", "ard", "a", "e", "i", "o", "$"],
    "r": ["ed", "ic", "ulf", "wen", "ald", "bert", "mund", "gar", "i", "a", "e", "$"],
    "b": ["ald", "ert", "orn", "erg", "urg", "rant", "a", "e", "i", "$"],
    "h": ["ard", "ild", "ulf", "elm", "ert", "a", "e", "i", "$"],
    "w": ["ald", "ard", "ulf", "ine", "old", "in", "a", "e", "i", "o", "$"],
    "m": ["er", "und", "ild", "ond", "ael", "a", "e", "i", "$"],
    "c": ["red", "ric", "a", "e", "i", "$"],
    "y": ["$"],
    "t": ["ric", "red", "a", "e", "i", "h", "$"],
    
    // Single letter vowels - improved connections
    "a": ["l", "r", "n", "d", "g", "b", "t", "s", "$"],
    "e": ["l", "r", "n", "d", "g", "b", "t", "s", "$"],
    "i": ["c", "l", "n", "r", "d", "g", "s", "t", "$"],
    "o": ["n", "r", "s", "d", "l", "t", "$"],
    "u": ["l", "r", "n", "s", "d", "g", "t", "$"],
    
    // Additional single consonants
    "n": ["d", "r", "g", "a", "e", "i", "$"],
    "s": ["t", "w", "a", "e", "i", "$"],
    "k": ["a", "e", "i", "$"],
    "p": ["a", "e", "i", "$"],
    
    // Expanded two-letter patterns
    "fr": ["ed", "ic", "ith", "ied", "ank", "$"],
    "th": ["red", "ulf", "ild", "ane", "$"],
    "el": ["d", "f", "m", "bert", "mund", "ric", "mer", "$"],
    "er": ["ic", "ed", "ald", "bert", "mund", "gar", "$"],
    "ar": ["d", "ic", "ald", "ell", "ny", "$"],
    "ir": ["ed", "ic", "ald", "$"],
    "ht": ["ric", "red", "$"],
    "ry": ["$"],
    "ny": ["$"],
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
    "ank": ["$"],
    "ane": ["$"],
    "mer": ["$"],
    "ael": ["$"],
    "urg": ["$"],
    "ant": ["$"],
    
    // Additional vowel combinations for flow
    "ea": ["d", "l", "r", "$"],
    "ie": ["d", "l", "$"],
    "ou": ["r", "s", "$"],
    "ai": ["n", "$"],
    "ei": ["n", "$"],
    
    // Extended three-letter patterns
    "ald": ["r", "w", "ric", "$"],
    "red": ["$"],
    "ert": ["$"],
    "orn": ["$"],
    "ard": ["$"],
    "ild": ["a", "e", "$"],
    "ulf": ["$"],
    "ine": ["$"],
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
    "wine": ["$"],
    "gard": ["$"],
    "run": ["$"],
    "rant": ["$"]
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
