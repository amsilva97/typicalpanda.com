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

    // Common starting patterns - improved flow
    "Al": combine(vowelFlow(), ["b", "d", "f", "g", "r"], majorClusters()),
    "Ael": combine(vowelFlow(), ["f", "d", "g", "r"], majorClusters()),
    "Aeth": combine(["el", "er"], majorClusters()),
    "Ead": combine(vowelFlow(), ["g", "m", "w", "r"], majorClusters()),
    "Ed": combine(vowelFlow(), ["g", "m", "w", "r"], majorClusters()),
    "Eg": combine(vowelFlow(), ["b", "g"], majorClusters()),
    "Os": combine(vowelFlow(), ["b", "g", "w"], majorClusters()),

    // Noble starting patterns
    "Cuth": combine(majorClusters(), ["red", "win"]),
    "Sig": combine(majorClusters(), ["red", "wald"]),

    // Warrior starting patterns - smoother combinations
    "Elf": combine(vowelFlow(), ["r", "w"], ["red", "ric", "win"], majorClusters()),
    "God": combine(vowelFlow(), ["fr", "w", "r"], majorClusters()),
    "Grim": combine(vowelFlow(), ["b", "h"], majorClusters()),
    "Har": combine(vowelFlow(), ["d"], ["old", "ald"], majorClusters()),
    "Ulf": combine(vowelFlow(), ["r", "w"], ["ric", "red"], majorClusters()),
    "Wil": combine(vowelFlow(), ["f", "h"], ["fred", "helm"], majorClusters()),
    "Wulf": combine(vowelFlow(), ["r"], ["ric", "red"], majorClusters()),

    // Rare starting patterns - better flow
    "Hild": combine(vowelFlow(), ["red", "burg", "gard"], majorClusters()),
    "Leo": combine(vowelFlow(), ["f"], ["fred", "ric"], majorClusters()),
    "Dun": combine(vowelFlow(), ["stan"], majorClusters()),
    "Eor": combine(vowelFlow(), ["l", "men"], majorClusters()),
    "Thur": combine(vowelFlow(), ["stan"], majorClusters()),
    "Wend": combine(vowelFlow(), ["el", "il"], majorClusters()),
    "Oth": combine(vowelFlow(), ["helm"], majorClusters()),
    "Bri": combine(vowelFlow(), ["c"], ["cht"], majorClusters()),
    "Cen": combine(vowelFlow(), ["red"], majorClusters()),
    "Ord": combine(vowelFlow(), ["gar"], majorClusters()),

    // Single letter vowel patterns
    "a": createVowelPattern(),
    "e": createVowelPattern(), 
    "i": createVowelPattern(),
    "o": createVowelPattern(),

    // Single letter consonant patterns - improved flow
    "b": combine(vowelFlow(), ["ald", "ert", "urg"], ["$"]),
    "c": combine(vowelFlow(), ["red", "ric"], ["$"]),
    "d": combine(vowelFlow(), ["gar", "mund", "wald"], ["$"]),
    "f": combine(vowelFlow(), ["red", "ric", "rid"], ["$"]),
    "g": combine(vowelFlow(), ["ar", "er", "ulf", "ard"], ["$"]),
    "h": combine(vowelFlow(), ["ard", "ild", "elm"], ["$"]),
    "l": combine(vowelFlow(), ["d", "f", "bert", "mund"], ["$"]),
    "m": combine(vowelFlow(), ["er", "und", "ild"], ["$"]),
    "n": combine(vowelFlow(), ["d", "g"], ["$"]),
    "r": combine(vowelFlow(), ["ed", "ic", "ald", "bert"], ["$"]),
    "t": combine(vowelFlow(), ["ric", "red"], ["$"]),
    "w": combine(vowelFlow(), ["ald", "ard", "ine", "in"], ["$"]),

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
    "il": TERMINATOR,
    "cht": TERMINATOR,
    "rid": TERMINATOR,
    "elm": TERMINATOR,
    "urg": TERMINATOR,
    "in": TERMINATOR
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
