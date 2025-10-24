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
const simpleConsonants = () => ["b", "d", "f", "g", "h", "r", "w", "m"];
const twoLetterStarts = () => ["fr", "th", "el", "er"];
const commonPrefixes = () => ["red", "stan", "gar"];
const rareEndings = () => ["ric", "mund", "bert", "helm", "wick"];
const vowelEndings = () => ["a", "e"];
const redPatterns = () => ["red", ...commonEndings()];
const stanPatterns = () => ["stan", ...commonEndings()];
const singleLetterFlow = () => ["d", "f", "fr", "r"];
const commonStarts = () => ["Al", "Ael", "Aeth", "Ead", "Ed", "Eg"];
const godlyStarts = () => ["Elf", "God", "Grim"];
const heroicStarts = () => ["Har", "Hild", "Leo", "Os"];
const warriorStarts = () => ["Ulf", "Wil", "Wulf"];
const nobleStarts = () => ["Cuth", "Dun", "Eor", "Sig", "Thur"];
const rareStarts = () => ["Wend", "Oth", "Bri", "Cen", "Ord"];
const singleVowelFlow = () => ["n", "r", "s", "d", "l", "t"];
const commonSyllables = () => ["ed", "ic", "ald"];
const rareElements = () => ["ric", "wald", "bert", "helm", "wick"];
const multiLetterEndings = () => ["ar", "er", "ir", "ulf", "wen", "ard"];
const shortSyllables = () => ["d", "l", "r"];
const complexEndings = () => ["ald", "ert", "orn", "erg", "urg", "rant"];
const structuralElements = () => ["ard", "ild", "ulf", "elm", "ert"];
const flowElements = () => ["ald", "ard", "ulf", "ine", "old", "in"];
const buildingBlocks = () => ["er", "und", "ild", "ond", "ael"];
const frPatterns = () => ["ed", "ic", "ith", "ied", "ank"];
const thPatterns = () => ["red", "ulf", "ild", "ane"];
const elPatterns = () => ["d", "f", "m", "mer"];
const basicConsonantFlow = () => ["g", "m", "w", "r"];
const simpleLetterGroups = () => ["f", "fr", "g", "r", "d", "m"];
const specialElements = () => ["heim", "kell"];
const rareSpecialElements = () => ["fwin", "pold"];
const battleElements = () => ["geat", "laf"];
const mysticalElements = () => ["here", "noth"];
const structureElements = () => ["burg", "gard", "run"];
const arPattern = () => ["d", "ic", "ald", "ell", "ny"];
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
    "^": finalize([...commonStarts(), ...godlyStarts(), ...heroicStarts(), ...warriorStarts(), ...nobleStarts(), ...rareStarts()]),

    // Expanded starting patterns - now connected to major clusters
    "Al": finalize([...simpleConsonants(), ...commonEndings()]),
    "Ael": finalize([...simpleLetterGroups(), ...commonPrefixes(), ...commonEndings()]),
    "Aeth": finalize([...twoLetterStarts(), ...commonPrefixes(), ...commonEndings()]),
    "Ead": finalize([...basicConsonantFlow(), "b", ...commonEndings()]),
    "Ed": finalize([...basicConsonantFlow(), "gar", ...commonEndings()]),
    "Eg": finalize(["b", "g", ...commonEndings()]),
    "Elf": finalize(["r", "w", ...commonPrefixes(), ...commonEndings()]),
    "God": finalize(["fr", "w", "r", ...commonEndings()]),
    "Grim": finalize(["b", "h", "ald", "bald", ...commonEndings()]),
    "Har": finalize(["d", "old", "ald", "ry", "mond", ...commonEndings()]),
    "Hild": finalize([...vowelEndings(), "red", ...structureElements(), ...commonEndings()]),
    "Leo": finalize(["f", "fr", ...rareSpecialElements(), ...commonEndings()]),
    "Os": finalize(["b", "g", "r", "w", ...battleElements(), ...commonEndings()]),
    "Ulf": finalize(["r", "w", ...commonPrefixes(), ...specialElements(), ...commonEndings()]),
    "Wil": finalize(["f", "fr", "h", "grim", "laf", ...commonEndings()]),
    "Wulf": finalize(["r", "st", "gar", "red", ...mysticalElements(), ...commonEndings()]),
    "Cuth": finalize(redPatterns()),
    "Dun": finalize(stanPatterns()),
    "Eor": finalize(["l", "men", ...commonEndings()]),
    "Sig": finalize(redPatterns()),
    "Thur": finalize(stanPatterns()),
    "Wend": finalize(["el", "il", ...shortEndings()]),
    "Oth": finalize(redPatterns()),
    "Bri": finalize(["ht", "c", "ard", ...shortEndings()]),
    "Cen": finalize(redPatterns()),
    "Ord": finalize(["gar", "wine", ...commonEndings()]),

    // Expanded single letter continuations
    "d": finalize(["r", "w", "g", "gar", "wine", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "g": finalize([...multiLetterEndings(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "l": finalize([...singleLetterFlow(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "f": finalize(["r", "red", "stan", "rid", "ard", ...basicEndings(), ...allVowels(), ...terminators()]),
    "r": finalize([...commonSyllables(), "ulf", "wen", "gar", ...basicEndings(), "i", ...vowelConnections(), ...terminators()]),
    "b": finalize([...complexEndings(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "h": finalize([...structuralElements(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "w": finalize([...flowElements(), ...basicEndings(), ...allVowels(), ...terminators()]),
    "m": finalize([...buildingBlocks(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "c": finalize(["red", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "y": finalize([...terminators()]),
    "t": finalize(["red", "h", ...basicEndings(), ...vowelConnections(), ...terminators()]),

    // Single letter vowels - improved connections
    "a": finalize([...consonantConnections(), ...terminators()]),
    "e": finalize([...consonantConnections(), ...terminators()]),
    "i": finalize(["c", ...consonantConnections(), ...terminators()]),
    "o": finalize([...singleVowelFlow(), ...terminators()]),
    "u": finalize([...consonantConnections(), ...terminators()]),

    // Additional single consonants
    "n": finalize(["d", "r", "g", ...vowelConnections(), ...terminators()]),
    "s": finalize(["t", "w", ...vowelConnections(), ...terminators()]),
    "k": finalize([...vowelConnections(), ...terminators()]),
    "p": finalize([...vowelConnections(), ...terminators()]),

    // Expanded two-letter patterns
    "fr": finalize([...frPatterns(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "th": finalize([...thPatterns(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "el": finalize([...elPatterns(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "er": finalize([...commonSyllables(), "gar", ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "ar": finalize([...arPattern(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
    "ir": finalize([...commonSyllables(), ...basicEndings(), ...vowelConnections(), ...terminators()]),
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
    "ea": finalize([...shortSyllables(), ...terminators()]),
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
    "ild": finalize([...vowelEndings(), ...mediumEndings(), ...terminators()]),
    "ulf": finalize([...majorClusters(), ...terminators()]),
    "ine": finalize([...mediumEndings(), ...terminators()]),
    "und": finalize([...rareElements(), "fred", ...terminators()]),
    "wen": finalize([...mediumEndings(), ...terminators()]),
    "gar": finalize([...commonEndings(), ...terminators()]),
    "ith": finalize([...mediumEndings(), ...terminators()]),
    "stan": finalize([...commonEndings(), ...terminators()]),
    "bert": finalize([...majorClusters(), ...terminators()]),
    "mund": finalize([...majorClusters(), ...terminators()]),
    "wald": finalize([...majorClusters(), ...terminators()]),
    "fred": finalize([...majorClusters(), ...terminators()]),
    "helm": finalize([...majorClusters(), ...terminators()]),
    "burg": finalize([...rareEndings(), ...terminators()]),
    "bald": finalize([...majorClusters(), ...terminators()]),
    "win": finalize([...majorClusters(), ...terminators()]),
    "wine": finalize([...rareEndings(), ...terminators()]),
    "gard": finalize([...rareEndings(), ...terminators()]),
    "run": finalize([...rareEndings(), ...terminators()]),
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
    "mond": finalize([...rareElements(), ...terminators()]),
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
