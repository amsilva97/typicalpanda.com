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
const finalize = (n: string[]) => Array.from(new Set(n));

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
    "Al": finalize(["b", "d", "fr", "g", "r", "f", "m", "w", ...commonEndings()]),
    "Ael": finalize(["f", "fr", "g", "r", "d", "m", "red", "stan", ...commonEndings()]),
    "Aeth": finalize(["el", "er", "red", "stan", ...commonEndings()]),
    "Ead": finalize(["g", "m", "w", "r", "b", ...commonEndings()]),
    "Ed": finalize(["g", "m", "w", "r", "gar", ...commonEndings()]),
    "Eg": finalize(["b", "g", ...commonEndings()]),
    "Elf": finalize(["r", "w", "red", "gar", "stan", ...commonEndings()]),
    "God": finalize(["fr", "w", "r", ...commonEndings()]),
    "Grim": finalize(["b", "h", "ald", "bald", ...commonEndings()]),
    "Har": finalize(["d", "old", "ald", "ry", "mond", ...commonEndings()]),
    "Hild": finalize(["a", "e", "red", "burg", "gard", "run", ...commonEndings()]),
    "Leo": finalize(["f", "fr", "fwin", "pold", ...commonEndings()]),
    "Os": finalize(["b", "g", "r", "w", "geat", "laf", ...commonEndings()]),
    "Ulf": finalize(["r", "w", "gar", "red", "stan", "heim", "kell", ...commonEndings()]),
    "Wil": finalize(["f", "fr", "h", "grim", "laf", ...commonEndings()]),
    "Wulf": finalize(["r", "st", "gar", "red", "here", "noth", ...commonEndings()]),
    "Cuth": finalize(["red", ...commonEndings()]),
    "Dun": finalize(["stan", ...commonEndings()]),
    "Eor": finalize(["l", "men", ...commonEndings()]),
    "Sig": finalize(["red", ...commonEndings()]),
    "Thur": finalize(["stan", ...commonEndings()]),
    "Wend": finalize(["el", "il", ...shortEndings()]),
    "Oth": finalize(["red", ...commonEndings()]),
    "Bri": finalize(["ht", "c", "ard", ...shortEndings()]),
    "Cen": finalize(["red", ...commonEndings()]),
    "Ord": finalize(["gar", "wine", ...commonEndings()]),

    // Expanded single letter continuations
    "d": finalize(["r", "w", "g", "gar", "wine", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "g": finalize(["ar", "er", "ir", "ulf", "wen", "ard", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "l": finalize(["d", "f", "fr", "r", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "f": finalize(["r", "red", "stan", "rid", "ard", ...basicEndings(), ...allVowels(), ...terminators()]),
    "r": finalize(["ed", "ic", "ulf", "wen", "ald", "gar", ...basicEndings(), "i", ...vowelConnections(), ...terminators()]),
    "b": finalize(["ald", "ert", "orn", "erg", "urg", "rant", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "h": finalize(["ard", "ild", "ulf", "elm", "ert", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "w": finalize(["ald", "ard", "ulf", "ine", "old", "in", ...basicEndings(), ...allVowels(), ...terminators()]),
    "m": finalize(["er", "und", "ild", "ond", "ael", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "c": finalize(["red", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "y": finalize([...terminators()]),
    "t": finalize(["red", "h", ...basicEndings(), ...vowelConnections(), ...terminators()]),

    // Single letter vowels - improved connections
    "a": finalize([...consonantConnections(), ...terminators()]),
    "e": finalize([...consonantConnections(), ...terminators()]),
    "i": finalize(["c", ...consonantConnections(), ...terminators()]),
    "o": finalize(["n", "r", "s", "d", "l", "t", ...terminators()]),
    "u": finalize([...consonantConnections(), ...terminators()]),

    // Additional single consonants
    "n": finalize(["d", "r", "g", ...vowelConnections(), ...terminators()]),
    "s": finalize(["t", "w", ...vowelConnections(), ...terminators()]),
    "k": finalize([...vowelConnections(), ...terminators()]),
    "p": finalize([...vowelConnections(), ...terminators()]),

    // Expanded two-letter patterns
    "fr": finalize(["ed", "ic", "ith", "ied", "ank", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "th": finalize(["red", "ulf", "ild", "ane", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "el": finalize(["d", "f", "m", "mer", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "er": finalize(["ic", "ed", "ald", "gar", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "ar": finalize(["d", "ic", "ald", "ell", "ny", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "ir": finalize(["ed", "ic", "ald", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "ht": finalize(["red", ...basicEndings(), ...terminators()]),
    "ry": finalize([...terminators()]),
    "ny": finalize([...terminators()]),
    "old": finalize([...terminators()]),
    "ond": finalize([...terminators()]),
    "ell": finalize([...terminators()]),
    "ied": finalize([...terminators()]),
    "men": finalize([...terminators()]),
    "rid": finalize([...terminators()]),
    "erg": finalize([...terminators()]),
    "elm": finalize([...terminators()]),
    "in": finalize([...terminators()]),
    "il": finalize([...terminators()]),
    "ank": finalize([...terminators()]),
    "ane": finalize([...terminators()]),
    "mer": finalize([...terminators()]),
    "ael": finalize([...terminators()]),
    "urg": finalize([...terminators()]),
    "ant": finalize([...terminators()]),

    // Additional vowel combinations for flow
    "ea": finalize(["d", "l", "r", ...terminators()]),
    "ie": finalize(["d", "l", ...terminators()]),
    "ou": finalize(["r", "s", ...terminators()]),
    "ai": finalize(["n", ...terminators()]),
    "ei": finalize(["n", ...terminators()]),

    // Extended three-letter patterns - all major clusters interconnected
    "ald": finalize(["r", "w", ...majorClusters(), ...terminators()]),
    "red": finalize([...majorClusters(), ...terminators()]),
    "ert": finalize([...majorClusters(), ...terminators()]),
    "orn": finalize([...mediumEndings(), ...terminators()]),
    "ard": finalize([...commonEndings(), ...terminators()]),
    "ild": finalize(["a", "e", ...mediumEndings(), ...terminators()]),
    "ulf": finalize([...majorClusters(), ...terminators()]),
    "ine": finalize([...mediumEndings(), ...terminators()]),
    "und": finalize(["ric", "wald", "bert", "helm", "fred", "wick", ...terminators()]),
    "wen": finalize([...mediumEndings(), ...terminators()]),
    "gar": finalize([...commonEndings(), ...terminators()]),
    "ith": finalize([...mediumEndings(), ...terminators()]),
    "stan": finalize([...commonEndings(), ...terminators()]),
    "bert": finalize([...majorClusters(), ...terminators()]),
    "mund": finalize([...majorClusters(), ...terminators()]),
    "wald": finalize([...majorClusters(), ...terminators()]),
    "fred": finalize([...majorClusters(), ...terminators()]),
    "helm": finalize([...majorClusters(), ...terminators()]),
    "burg": finalize(["ric", "mund", "bert", "helm", "wick", "$"]),
    "bald": finalize([...majorClusters(), ...terminators()]),
    "win": finalize([...majorClusters(), ...terminators()]),
    "wine": finalize(["ric", "mund", "bert", "helm", "wick", "$"]),
    "gard": finalize(["ric", "mund", "bert", "helm", "wick", "$"]),
    "run": finalize(["ric", "mund", "bert", "helm", "wick", "$"]),
    "rant": finalize([...mediumEndings(), ...terminators()]),
    "fwin": finalize([...mediumEndings(), ...terminators()]),
    "pold": finalize([...mediumEndings(), ...terminators()]),
    "geat": finalize([...mediumEndings(), ...terminators()]),
    "laf": finalize([...mediumEndings(), ...terminators()]),
    "heim": finalize([...commonEndings(), ...terminators()]),
    "kell": finalize([...mediumEndings(), ...terminators()]),
    "grim": finalize([...commonEndings(), ...terminators()]),
    "here": finalize([...mediumEndings(), ...terminators()]),
    "noth": finalize([...mediumEndings(), ...terminators()]),
    "mond": finalize(["ric", "wald", "bert", "helm", "wick", ...terminators()]),
    "wick": finalize([...majorClusters(), ...terminators()])
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
