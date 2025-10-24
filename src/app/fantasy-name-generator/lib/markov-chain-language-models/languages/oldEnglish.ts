import { LanguageDefinition } from '../core';

/**
 * Helper functions for Old English name pattern construction
 * Organized by semantic meaning and usage patterns
 */

// Core building blocks
const VOWELS = ["a", "e", "i", "o", "u"];
const CONSONANTS = ["b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "w"];
const TERMINATOR = ["$"];

// Semantic name elements (meanings)
const POWER_ELEMENTS = ["ric", "wald", "mund"];        // ruler, ruler, protection
const NOBLE_ELEMENTS = ["bert", "helm", "fred"];        // bright, helmet, peace
const BATTLE_ELEMENTS = ["gar", "here", "geat"];        // spear, army, Geat
const MYSTICAL_ELEMENTS = ["elf", "god", "wulf"];       // elf, god, wolf
const PLACE_ELEMENTS = ["burg", "wick", "stan"];        // fortress, settlement, stone

// Starting patterns by category
const COMMON_STARTS = ["Al", "Ed", "Eg", "Os"];
const NOBLE_STARTS = ["Ael", "Aeth", "Ead", "Cuth", "Sig"];
const WARRIOR_STARTS = ["Elf", "God", "Grim", "Har", "Ulf", "Wil", "Wulf"];
const RARE_STARTS = ["Hild", "Leo", "Dun", "Eor", "Thur", "Wend", "Oth", "Bri", "Cen", "Ord"];

// Pattern construction helpers
const majorClusters = () => combine(POWER_ELEMENTS, NOBLE_ELEMENTS, BATTLE_ELEMENTS, PLACE_ELEMENTS);
const allStarts = () => combine(COMMON_STARTS, NOBLE_STARTS, WARRIOR_STARTS, RARE_STARTS);
const vowelFlow = () => VOWELS.filter(v => v !== "u"); // Exclude 'u' for more natural flow
const consonantFlow = () => ["d", "g", "l", "m", "n", "r", "t", "w"];
const singleLetterFlow = () => combine(consonantFlow(), vowelFlow());

// Two-letter pattern builders
const createTwoLetterPattern = (endings: string[]) => combine(endings, majorClusters(), vowelFlow(), ["$"]);
const createVowelPattern = () => combine(consonantFlow(), ["$"]);
const createConsonantPattern = () => combine(majorClusters(), vowelFlow(), ["$"]);

// Ending constructors
const clusterEndings = () => combine(POWER_ELEMENTS, NOBLE_ELEMENTS, ["$"]);

// Utility functions
const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr));
const combine = (...arrays: string[][]) => unique(arrays.flat());
const withTerminator = (patterns: string[]) => combine(patterns, ["$"]);

/**
 * Old English language definition
 * Built around authentic historical name patterns and meanings
 * Focuses on common starts and endings, then expands to build complete names
 */
export const oldEnglish: LanguageDefinition = {
  patterns: {
    // Start marker - all possible name beginnings
    "^": allStarts(),

    // Common starting patterns - high connectivity
    "Al": combine(singleLetterFlow(), majorClusters()),
    "Ael": combine(singleLetterFlow(), majorClusters()),
    "Aeth": combine(["el", "er"], majorClusters()),
    "Ead": combine(consonantFlow(), majorClusters()),
    "Ed": combine(consonantFlow(), majorClusters()),
    "Eg": combine(["b", "g"], majorClusters()),
    "Os": combine(consonantFlow(), majorClusters()),

    // Noble starting patterns
    "Cuth": combine(majorClusters(), ["red", "win"]),
    "Sig": combine(majorClusters(), ["red", "wald"]),

    // Warrior starting patterns  
    "Elf": combine(consonantFlow(), majorClusters()),
    "God": combine(["fr", "w", "r"], majorClusters()),
    "Grim": combine(["b", "h"], majorClusters()),
    "Har": combine(["d", "old"], majorClusters()),
    "Ulf": combine(consonantFlow(), majorClusters()),
    "Wil": combine(["f", "fr", "h"], majorClusters()),
    "Wulf": combine(["r", "st"], majorClusters()),

    // Rare starting patterns
    "Hild": combine(vowelFlow(), ["red", "burg", "gard"]),
    "Leo": combine(["f", "fr"], majorClusters()),
    "Dun": combine(["stan"], majorClusters()),
    "Eor": combine(["l", "men"], majorClusters()),
    "Thur": combine(["stan"], majorClusters()),
    "Wend": combine(["el", "il"], majorClusters()),
    "Oth": combine(["helm"], majorClusters()),
    "Bri": combine(["ht", "c"], majorClusters()),
    "Cen": combine(["red"], majorClusters()),
    "Ord": combine(["gar"], majorClusters()),

    // Single letter vowel patterns
    "a": createVowelPattern(),
    "e": createVowelPattern(), 
    "i": createVowelPattern(),
    "o": createVowelPattern(),

    // Single letter consonant patterns
    "b": createConsonantPattern(),
    "c": createConsonantPattern(),
    "d": createConsonantPattern(),
    "f": createConsonantPattern(),
    "g": createConsonantPattern(),
    "h": createConsonantPattern(),
    "l": createConsonantPattern(),
    "m": createConsonantPattern(),
    "n": createConsonantPattern(),
    "r": createConsonantPattern(),
    "t": createConsonantPattern(),
    "w": createConsonantPattern(),

    // Two-letter patterns
    "fr": createTwoLetterPattern(["ed", "ic", "ith"]),
    "th": createTwoLetterPattern(["red", "ane"]),
    "el": createTwoLetterPattern(["d", "f", "m"]),
    "er": createTwoLetterPattern(["ic", "ed"]),
    "ar": createTwoLetterPattern(["d", "ic", "ny"]),
    "ir": createTwoLetterPattern(["ed", "ic"]),
    "st": createTwoLetterPattern(["an"]),

    // Major clusters - fully interconnected
    "ric": clusterEndings(),
    "mund": clusterEndings(),
    "wald": clusterEndings(),
    "bert": clusterEndings(),
    "helm": clusterEndings(),
    "fred": clusterEndings(),
    "gar": clusterEndings(),
    "here": clusterEndings(),
    "geat": clusterEndings(),
    "burg": clusterEndings(),
    "wick": clusterEndings(),
    "stan": clusterEndings(),

    // Supporting patterns
    "red": withTerminator(POWER_ELEMENTS),
    "win": withTerminator(POWER_ELEMENTS),
    "old": TERMINATOR,
    "ald": combine(["r", "w"], POWER_ELEMENTS, ["$"]),
    "ert": withTerminator(POWER_ELEMENTS),
    "orn": withTerminator(POWER_ELEMENTS),
    "ard": withTerminator(POWER_ELEMENTS),
    "ild": combine(vowelFlow(), POWER_ELEMENTS, ["$"]),
    "ulf": withTerminator(POWER_ELEMENTS),
    "ine": withTerminator(POWER_ELEMENTS),
    "und": withTerminator(POWER_ELEMENTS),
    "wen": withTerminator(POWER_ELEMENTS),
    "ith": withTerminator(POWER_ELEMENTS),

    // Terminal patterns
    "an": TERMINATOR,
    "ic": TERMINATOR,
    "ed": TERMINATOR,
    "ny": TERMINATOR,
    "gard": TERMINATOR,
    "men": TERMINATOR,
    "il": TERMINATOR
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
