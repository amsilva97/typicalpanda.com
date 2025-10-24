import { LanguageDefinition } from '../core';

/**
 * Helper functions for common Old English name patterns
 */
const commonEndings = () => ["ric", "mund", "wald", "bert", "helm", "fred", "win", "wick"];
const majorClusters = () => ["bert", "mund", "wald", "helm", "fred", "bald", "win", "wick"];
const basicEndings = () => ["ric", "mund", "wald", "bert", "helm"];
const vowelConnections = () => ["a", "e", "i"];
const consonantConnections = () => ["d", "g", "r", "l", "n", "t", "s"];
const allVowels = () => ["a", "e", "i", "o"];
const shortEndings = () => ["ric", "bert", "helm", "wick"];
const mediumEndings = () => ["mund", "bert", "helm", "wick"];
const terminators = () => ["$"];

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
    "Al": ["b", "d", "fr", "g", "r", "f", "m", "w", ...commonEndings()],
    "Ael": ["f", "fr", "g", "r", "d", "m", "red", "stan", ...commonEndings()],
    "Aeth": ["el", "er", "red", "stan", ...commonEndings()],
    "Ead": ["g", "m", "w", "r", "b", ...commonEndings()],
    "Ed": ["g", "m", "w", "r", "gar", ...commonEndings()],
    "Eg": ["b", "g", ...commonEndings()],
    "Elf": ["r", "w", "red", "gar", "stan", ...commonEndings()],
    "God": ["fr", "w", "r", ...commonEndings()],
    "Grim": ["b", "h", "ald", "bald", ...commonEndings()],
    "Har": ["d", "old", "ald", "ry", "mond", ...commonEndings()],
    "Hild": ["a", "e", "red", "burg", "gard", "run", ...commonEndings()],
    "Leo": ["f", "fr", "fwin", "pold", ...commonEndings()],
    "Os": ["b", "g", "r", "w", "geat", "laf", ...commonEndings()],
    "Ulf": ["r", "w", "gar", "red", "stan", "heim", "kell", ...commonEndings()],
    "Wil": ["f", "fr", "h", "grim", "laf", ...commonEndings()],
    "Wulf": ["r", "st", "gar", "red", "here", "noth", ...commonEndings()],
    "Cuth": ["red", ...commonEndings()],
    "Dun": ["stan", ...commonEndings()],
    "Eor": ["l", "men", ...commonEndings()],
    "Sig": ["red", ...commonEndings()],
    "Thur": ["stan", ...commonEndings()],
    "Wend": ["el", "il", ...shortEndings()],
    "Oth": ["red", ...commonEndings()],
    "Bri": ["ht", "c", "ard", ...shortEndings()],
    "Cen": ["red", ...commonEndings()],
    "Ord": ["gar", "wine", ...commonEndings()],

    // Expanded single letter continuations
    "d": ["r", "w", "g", "gar", "wine", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "g": ["ar", "er", "ir", "ulf", "wen", "ard", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "l": ["d", "f", "fr", "r", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "f": ["r", "red", "stan", "rid", "ard", ...basicEndings(), ...allVowels(), ...terminators()],
    "r": ["ed", "ic", "ulf", "wen", "ald", "gar", ...basicEndings(), "i", ...vowelConnections(), ...terminators()],
    "b": ["ald", "ert", "orn", "erg", "urg", "rant", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "h": ["ard", "ild", "ulf", "elm", "ert", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "w": ["ald", "ard", "ulf", "ine", "old", "in", ...basicEndings(), ...allVowels(), ...terminators()],
    "m": ["er", "und", "ild", "ond", "ael", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "c": ["red", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "y": [...terminators()],
    "t": ["red", "h", ...basicEndings(), ...vowelConnections(), ...terminators()],

    // Single letter vowels - improved connections
    "a": [...consonantConnections(), ...terminators()],
    "e": [...consonantConnections(), ...terminators()],
    "i": ["c", ...consonantConnections(), ...terminators()],
    "o": ["n", "r", "s", "d", "l", "t", ...terminators()],
    "u": [...consonantConnections(), ...terminators()],

    // Additional single consonants
    "n": ["d", "r", "g", ...vowelConnections(), ...terminators()],
    "s": ["t", "w", ...vowelConnections(), ...terminators()],
    "k": [...vowelConnections(), ...terminators()],
    "p": [...vowelConnections(), ...terminators()],

    // Expanded two-letter patterns
    "fr": ["ed", "ic", "ith", "ied", "ank", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "th": ["red", "ulf", "ild", "ane", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "el": ["d", "f", "m", "mer", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "er": ["ic", "ed", "ald", "gar", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "ar": ["d", "ic", "ald", "ell", "ny", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "ir": ["ed", "ic", "ald", ...basicEndings(), ...vowelConnections(), ...terminators()],
    "ht": ["red", ...basicEndings(), ...terminators()],
    "ry": [...terminators()],
    "ny": [...terminators()],
    "old": [...terminators()],
    "ond": [...terminators()],
    "ell": [...terminators()],
    "ied": [...terminators()],
    "men": [...terminators()],
    "rid": [...terminators()],
    "erg": [...terminators()],
    "elm": [...terminators()],
    "in": [...terminators()],
    "il": [...terminators()],
    "ank": [...terminators()],
    "ane": [...terminators()],
    "mer": [...terminators()],
    "ael": [...terminators()],
    "urg": [...terminators()],
    "ant": [...terminators()],

    // Additional vowel combinations for flow
    "ea": ["d", "l", "r", ...terminators()],
    "ie": ["d", "l", ...terminators()],
    "ou": ["r", "s", ...terminators()],
    "ai": ["n", ...terminators()],
    "ei": ["n", ...terminators()],

    // Extended three-letter patterns - all major clusters interconnected
    "ald": ["r", "w", ...majorClusters(), ...terminators()],
    "red": [...majorClusters(), ...terminators()],
    "ert": [...majorClusters(), ...terminators()],
    "orn": [...mediumEndings(), ...terminators()],
    "ard": [...commonEndings(), ...terminators()],
    "ild": ["a", "e", ...mediumEndings(), ...terminators()],
    "ulf": [...majorClusters(), ...terminators()],
    "ine": [...mediumEndings(), ...terminators()],
    "und": ["ric", "wald", "bert", "helm", "fred", "wick", ...terminators()],
    "wen": [...mediumEndings(), ...terminators()],
    "gar": [...commonEndings(), ...terminators()],
    "ith": [...mediumEndings(), ...terminators()],
    "stan": [...commonEndings(), ...terminators()],
    "bert": [...majorClusters(), ...terminators()],
    "mund": [...majorClusters(), ...terminators()],
    "wald": [...majorClusters(), ...terminators()],
    "fred": [...majorClusters(), ...terminators()],
    "helm": [...majorClusters(), ...terminators()],
    "burg": ["ric", "mund", "bert", "helm", "wick", "$"],
    "bald": [...majorClusters(), ...terminators()],
    "win": [...majorClusters(), ...terminators()],
    "wine": ["ric", "mund", "bert", "helm", "wick", "$"],
    "gard": ["ric", "mund", "bert", "helm", "wick", "$"],
    "run": ["ric", "mund", "bert", "helm", "wick", "$"],
    "rant": [...mediumEndings(), ...terminators()],
    "fwin": [...mediumEndings(), ...terminators()],
    "pold": [...mediumEndings(), ...terminators()],
    "geat": [...mediumEndings(), ...terminators()],
    "laf": [...mediumEndings(), ...terminators()],
    "heim": [...commonEndings(), ...terminators()],
    "kell": [...mediumEndings(), ...terminators()],
    "grim": [...commonEndings(), ...terminators()],
    "here": [...mediumEndings(), ...terminators()],
    "noth": [...mediumEndings(), ...terminators()],
    "mond": ["ric", "wald", "bert", "helm", "wick", ...terminators()],
    "wick": [...majorClusters(), ...terminators()]
  },

  options: {
    name: "Old English",
    minNodes: 2,
    maxNodes: 5,
    consecutiveSingleLetterLimit: 1,
    nonConsecutiveSingleLetterLimit: 2,
    duplicateClusterLimit: 1,
    totalClusterLimit: 2
  }
};
