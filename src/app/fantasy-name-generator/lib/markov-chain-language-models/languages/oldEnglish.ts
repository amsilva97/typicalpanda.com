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

    // Expanded starting patterns - now connected to major clusters
    "Al": ["b", "d", "fr", "g", "r", "f", "m", "w", "ric", "win", "bert", "mund", "wald", "helm", "fred", "wick"],
    "Ael": ["f", "fr", "g", "r", "d", "m", "red", "stan", "bert", "mund", "wald", "helm", "ric", "wick"],
    "Aeth": ["el", "er", "red", "ric", "stan", "wald", "bert", "mund", "helm", "fred", "wick"],
    "Ead": ["g", "m", "w", "r", "b", "mund", "ric", "win", "bert", "wald", "helm", "fred", "wick"],
    "Ed": ["g", "m", "w", "r", "gar", "mund", "ric", "win", "bert", "wald", "helm", "fred", "wick"],
    "Eg": ["b", "g", "bert", "wald", "ric", "mund", "helm", "fred", "win", "wick"],
    "Elf": ["r", "w", "red", "ric", "gar", "win", "stan", "bert", "mund", "wald", "helm", "fred", "wick"],
    "God": ["fr", "w", "r", "win", "ric", "mund", "wald", "bert", "helm", "fred", "wick"],
    "Grim": ["b", "h", "ald", "bald", "mund", "wald", "bert", "helm", "ric", "fred", "wick"],
    "Har": ["d", "old", "ald", "ry", "bert", "mond", "wick", "mund", "wald", "helm", "ric", "fred"],
    "Hild": ["a", "e", "red", "burg", "gard", "run", "bert", "mund", "wald", "helm", "ric", "wick"],
    "Leo": ["f", "fr", "ric", "wald", "bert", "fwin", "pold", "mund", "helm", "fred", "wick"],
    "Os": ["b", "g", "r", "w", "wald", "ric", "mund", "win", "geat", "laf", "bert", "helm", "fred", "wick"],
    "Ulf": ["r", "w", "ric", "gar", "red", "stan", "heim", "kell", "bert", "mund", "wald", "helm", "fred", "wick"],
    "Wil": ["f", "fr", "h", "fred", "helm", "ric", "bert", "grim", "laf", "mund", "wald", "wick"],
    "Wulf": ["r", "st", "ric", "gar", "red", "helm", "here", "noth", "bert", "mund", "wald", "fred", "wick"],
    "Cuth": ["bert", "red", "ric", "win", "mund", "wald", "helm", "fred", "wick"],
    "Dun": ["stan", "wald", "ric", "bert", "mund", "helm", "fred", "wick"],
    "Eor": ["l", "men", "ric", "mund", "bert", "wald", "helm", "fred", "wick"],
    "Sig": ["mund", "red", "wald", "ric", "bert", "helm", "fred", "win", "wick"],
    "Thur": ["stan", "wald", "ric", "mund", "bert", "helm", "fred", "wick"],
    "Wend": ["el", "il", "ric", "bert", "mund", "wald", "helm", "wick"],
    "Oth": ["helm", "ric", "wald", "red", "bert", "mund", "fred", "wick"],
    "Bri": ["ht", "c", "ard", "bert", "mund", "wald", "ric", "helm", "wick"],
    "Cen": ["red", "ric", "wald", "bert", "mund", "helm", "fred", "wick"],
    "Ord": ["gar", "ric", "wine", "bert", "mund", "wald", "helm", "fred", "wick"],

    // Expanded single letter continuations
    "d": ["r", "w", "g", "gar", "mund", "ric", "wald", "wine", "bert", "helm", "fred", "a", "e", "$"],
    "g": ["ar", "er", "ir", "ulf", "wen", "bert", "mund", "wald", "ard", "ric", "helm", "a", "e", "$"],
    "l": ["d", "f", "fr", "r", "bert", "mund", "ric", "wald", "helm", "fred", "a", "e", "i", "$"],
    "f": ["r", "red", "ric", "stan", "rid", "ard", "bert", "mund", "wald", "helm", "a", "e", "i", "o", "$"],
    "r": ["ed", "ic", "ulf", "wen", "ald", "bert", "mund", "gar", "wald", "ric", "helm", "i", "a", "e", "$"],
    "b": ["ald", "ert", "orn", "erg", "urg", "rant", "bert", "mund", "wald", "a", "e", "i", "$"],
    "h": ["ard", "ild", "ulf", "elm", "ert", "bert", "mund", "wald", "helm", "a", "e", "i", "$"],
    "w": ["ald", "ard", "ulf", "ine", "old", "in", "bert", "mund", "wald", "ric", "a", "e", "i", "o", "$"],
    "m": ["er", "und", "ild", "ond", "ael", "bert", "mund", "wald", "a", "e", "i", "$"],
    "c": ["red", "ric", "bert", "mund", "wald", "a", "e", "i", "$"],
    "y": ["$"],
    "t": ["ric", "red", "bert", "mund", "wald", "helm", "a", "e", "i", "h", "$"],

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
    "fr": ["ed", "ic", "ith", "ied", "ank", "bert", "mund", "wald", "ric", "helm", "a", "e", "i", "$"],
    "th": ["red", "ulf", "ild", "ane", "bert", "mund", "wald", "ric", "a", "e", "$"],
    "el": ["d", "f", "m", "bert", "mund", "ric", "mer", "wald", "helm", "a", "e", "$"],
    "er": ["ic", "ed", "ald", "bert", "mund", "gar", "wald", "ric", "helm", "a", "e", "$"],
    "ar": ["d", "ic", "ald", "ell", "ny", "bert", "mund", "wald", "ric", "a", "e", "$"],
    "ir": ["ed", "ic", "ald", "bert", "mund", "wald", "ric", "a", "e", "$"],
    "ht": ["ric", "red", "bert", "mund", "wald", "$"],
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

    // Extended three-letter patterns - all major clusters interconnected
    "ald": ["r", "w", "ric", "bert", "mund", "wald", "helm", "fred", "bald", "win", "wick", "$"],
    "red": ["ric", "mund", "wald", "bert", "helm", "fred", "bald", "win", "wick", "$"],
    "ert": ["ric", "mund", "wald", "helm", "fred", "bald", "win", "wick", "$"],
    "orn": ["mund", "wald", "ric", "bert", "helm", "wick", "$"],
    "ard": ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "ild": ["a", "e", "bert", "mund", "ric", "wald", "helm", "wick", "$"],
    "ulf": ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "ine": ["mund", "wald", "ric", "bert", "helm", "wick", "$"],
    "und": ["ric", "wald", "bert", "helm", "fred", "wick", "$"],
    "wen": ["ric", "mund", "bert", "helm", "wick", "$"],
    "gar": ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "ith": ["ric", "mund", "bert", "helm", "wick", "$"],
    "stan": ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "bert": ["ric", "mund", "wald", "helm", "fred", "bald", "win", "wick", "$"],
    "mund": ["ric", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "wald": ["ric", "bert", "helm", "fred", "win", "wick", "$"],
    "fred": ["ric", "mund", "bert", "helm", "wald", "win", "wick", "$"],
    "helm": ["ric", "mund", "wald", "bert", "fred", "bald", "win", "wick", "$"],
    "burg": ["ric", "mund", "bert", "helm", "wick", "$"],
    "bald": ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "win": ["ric", "mund", "wald", "bert", "helm", "fred", "wick", "$"],
    "wine": ["ric", "mund", "bert", "helm", "wick", "$"],
    "gard": ["ric", "mund", "bert", "helm", "wick", "$"],
    "run": ["ric", "mund", "bert", "helm", "wick", "$"],
    "rant": ["ric", "mund", "bert", "helm", "wick", "$"],
    "fwin": ["ric", "mund", "bert", "helm", "wick", "$"],
    "pold": ["ric", "mund", "bert", "helm", "wick", "$"],
    "geat": ["ric", "mund", "bert", "helm", "wick", "$"],
    "laf": ["ric", "mund", "bert", "helm", "wick", "$"],
    "heim": ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "kell": ["ric", "mund", "bert", "helm", "wick", "$"],
    "grim": ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick", "$"],
    "here": ["ric", "mund", "bert", "helm", "wick", "$"],
    "noth": ["ric", "mund", "bert", "helm", "wick", "$"],
    "mond": ["ric", "wald", "bert", "helm", "wick", "$"],
    "wick": ["ric", "mund", "wald", "bert", "helm", "fred", "bald", "win", "$"]
  },

  options: {
    name: "Old English",
    startMarker: "^",
    endMarker: "$",
    minNodes: -1,
    maxNodes: -1,
    consecutiveSingleLetterLimit: -1,
    nonConsecutiveSingleLetterLimit: -1,
    duplicateClusterLimit: -1
  }
};
