import { LanguageDefinition } from '../core';

/**
 * Old English language definition
 * ^ marks the start of generation
 * $ marks the end of generation
 * Keys represent pattern nodes, values are arrays of possible continuations
 */
export const oldEnglish: LanguageDefinition = {
  patterns: {
    // Common Old English starting patterns
    "^": [
      // Authentic Old English name elements (favor these heavily)
      "ael", "aed", "alf", "aethel", "beorn", "cyne", "ead", "ed", "god",
      "hild", "leod", "ost", "raed", "sig", "theod", "wulf", "wyn",
      
      // Simple but authentic starts (use sparingly)
      "a", "e", "i", "o"
    ],

    // Major Old English name elements - lead to meaningful endings
    "ael": ["red", "ric", "wyn", "ward", "mund", "$"],
    "aed": ["ward", "mund", "ric", "wyn", "$"],
    "alf": ["red", "ric", "wald", "$"],
    "aethel": ["red", "ric", "wald", "stan", "wyn", "$"],
    "beorn": ["red", "ric", "wald", "$"],
    "cyne": ["ric", "wald", "mund", "$"],
    "ead": ["mund", "ric", "ward", "wyn", "$"],
    "ed": ["mund", "ric", "ward", "wyn", "$"],
    "god": ["ric", "mund", "wyn", "win", "$"],
    "hild": ["a", "e", "red", "ric", "helm", "$"],
    "leod": ["ric", "mund", "gar", "$"],
    "ost": ["ric", "mund", "gar", "$"],
    "raed": ["mund", "ric", "wyn", "$"],
    "sig": ["mund", "ric", "wald", "wyn", "$"],
    "theod": ["ric", "wald", "mund", "$"],
    "wulf": ["ric", "red", "stan", "$"],
    "wyn": ["a", "d", "red", "ric", "$"],

    // Vowel continuations - lead to authentic consonants or endings
    "a": ["l", "n", "d", "ld", "nd", "red", "ric", "$"],
    "e": ["l", "r", "n", "d", "ld", "nd", "ric", "fred", "$"],
    "i": ["n", "r", "l", "s", "ld", "ric", "mund", "$"],
    "o": ["r", "n", "l", "s", "ld", "ric", "wald", "$"],

    // Consonant endings - mostly terminate
    "l": ["a", "e", "d", "f", "$"],
    "n": ["a", "e", "d", "$"],
    "d": ["a", "e", "$"],
    "r": ["a", "e", "ed", "$"],
    "s": ["a", "e", "$"],
    "t": ["a", "e", "$"],

    // Compound endings - mostly terminate
    "ld": ["a", "e", "$"],
    "nd": ["a", "e", "$"],

    // Classic Old English endings - always terminate
    "ric": ["$"],        // ruler, king
    "wald": ["$"],       // rule, power
    "mund": ["$"],       // protection
    "helm": ["$"],       // helmet, protection
    "red": ["$"],        // counsel
    "win": ["$"],        // friend
    "ward": ["$"],       // guard, protector
    "stan": ["$"],       // stone
    "fred": ["$"],       // peace
    "gar": ["$"]         // spear
  },

  meanings: {
    // Classic Old English name elements
    "ael": "elf, supernatural being",
    "aed": "fire, prosperity",
    "alf": "elf, wise counselor",
    "aethel": "noble, nobility",
    "beorn": "warrior, bear-like man",
    "cyne": "royal, kingly",
    "ead": "blessed, fortunate",
    "ed": "blessed, wealth",
    "god": "good, divine",
    "hild": "battle, war",
    "leod": "people, folk",
    "ost": "divine, east",
    "raed": "counsel, advice",
    "sig": "victory, triumph",
    "theod": "people, nation",
    "wulf": "wolf",
    "wyn": "joy, friend",

    // Ending clusters with meanings
    "ric": "ruler, king, powerful",
    "wald": "rule, power, authority",
    "mund": "protection, guardian",
    "helm": "helmet, protector",
    "bert": "bright, shining",
    "fred": "peace, peaceful",
    "win": "friend, beloved",
    "red": "counsel, advisor",
    "grim": "fierce, masked warrior",
    "bald": "bold, brave",
    "stan": "stone, steadfast",
    "weard": "guard, protector",
    "wine": "friend, lord",
    "thane": "servant, warrior",
    "here": "army, host",
    "flee": "refuge, sanctuary",
    "geat": "gate, way",
    "mon": "man, person",
    "noth": "boldness, daring",
    "hard": "hardy, strong",
    "fast": "firm, steadfast",
    "leof": "dear, beloved",
    "maer": "famous, renowned",
    "mod": "courage, spirit",
    "wig": "war, battle",
    "hun": "bear cub, young warrior",
    "ulf": "wolf",
    "ing": "meadow, descendant of",
    "ton": "enclosure, settlement",
    "ham": "home, village",
    "ley": "meadow, clearing",
    "ford": "river crossing",
    "burg": "fortress, fortified town",
    "wick": "village, dwelling place",
    "eth": "noble heritage",
    "en": "one who",
    "ar": "honor, glory",
    "er": "honor, glory",
    "el": "nobility",
    "id": "time, season",
    "od": "wealth, fortune",
    "ad": "nobility, heritage",

    // Additional elements that might appear
    "ward": "guardian, protector",
    "gar": "spear, warrior"
  },

  options: {
    name: "Old English",
    minLength: 5,
    maxLength: 12,
    startMarker: "^",
    endMarker: "$",
    consecutiveSingleLetterLimit: 1, // Stricter: max 1 consecutive single letter
    duplicateClusterLimit: 1        // Stricter: each pattern can only be used once
  }
};

