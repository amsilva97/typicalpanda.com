import { LanguageDefinition } from '../core';

/**
 * Old English language definition
 * Built around authentic historical name patterns and meanings
 * Focuses on common starts and endings, then expands to build complete names
 */
export const oldEnglish: LanguageDefinition = {
  patterns: {
    // === STARTING PATTERNS ===
    // Most common Old English name beginnings (historically authentic)
    "^": [
      // Tier 1: Most common authentic starts (60% of generated names should use these)
      "ael", "ael", "ael",           // "noble, elf" - very common
      "aethel", "aethel",            // "noble" - royal names
      "ead", "ead", "ed", "ed",      // "blessed, wealth" - very common
      "god", "god", "god",           // "good, divine" - extremely common
      "wulf", "wulf",                // "wolf" - warrior names

      // Tier 2: Common authentic starts (25% of names)
      "alf", "beorn", "cyne", "hild", "leod", "osw", "raed", "sig", "theod",
      "ber", "cuth", "dun", "earl", "hun", "mil", "ord", "stan", "wil",

      // Tier 3: Single letter starts (10% of names) - authentic Old English initials
      "a", "b", "c", "d", "e", "f", "g", "h", "l", "m", "n", "o", "r", "s", "t", "w",

      // Tier 4: Double letter starts (5% of names) - common Old English pairs
      "ae", "al", "an", "ar", "as", "be", "br", "bu", "cy", "de", "dr", "du", 
      "ea", "ec", "el", "er", "es", "fl", "fr", "ge", "gi", "gr", "gu", 
      "ha", "he", "hi", "hr", "hu", "le", "li", "ma", "me", "ni", "no", 
      "or", "ra", "re", "ri", "ro", "sa", "se", "si", "st", "th", "tr", 
      "ul", "un", "ur", "wa", "we", "wi", "wy"
    ],

    // === MAJOR NAME ELEMENTS ===
    // These are the core building blocks of Old English names

    // "Ael" family - "noble, elf"
    "ael": [
      "red",    // counsel -> "Aelred" (Elf-counsel)
      "ric",    // ruler -> "Aelric" (Elf-ruler) 
      "ward",   // guardian -> "Aelward" (Elf-guardian)
      "wyn",    // friend -> "Aelwyn" (Elf-friend)
      "fred",   // peace -> "Aelfred" (Elf-peace)
      "$"       // Can end as just "Ael"
    ],

    // "Aethel" family - "noble" (royal prefix)
    "aethel": [
      "red",    // -> "Aethelred" (Noble-counsel)
      "stan",   // -> "Aethelstan" (Noble-stone)
      "wald",   // -> "Aethelwald" (Noble-power)
      "ric",    // -> "Aethelric" (Noble-ruler)
      "wyn",    // -> "Aethelwyn" (Noble-friend)
      "$"
    ],

    // "Ead/Ed" family - "blessed, wealth"
    "ead": [
      "mund",   // -> "Eadmund" (Blessed-protection)
      "ward",   // -> "Eadward" (Blessed-guardian) - "Edward"
      "ric",    // -> "Eadric" (Blessed-ruler)
      "wyn",    // -> "Eadwyn" (Blessed-friend)
      "$"
    ],

    "ed": [
      "mund",   // -> "Edmund" (Blessed-protection)
      "ward",   // -> "Edward" (Blessed-guardian)
      "ric",    // -> "Edric" (Blessed-ruler)
      "gar",    // -> "Edgar" (Blessed-spear)
      "win",    // -> "Edwin" (Blessed-friend)
      "$"
    ],

    // "God" family - "good, divine" 
    "god": [
      "ric",    // -> "Godric" (God-ruler)
      "win",    // -> "Godwin" (God-friend) - very common
      "fred",   // -> "Godfrey" (God-peace)
      "mund",   // -> "Godmund" (God-protection)
      "wald",   // -> "Godwald" (God-power)
      "$"
    ],

    // "Wulf" family - "wolf" (warrior names)
    "wulf": [
      "ric",    // -> "Wulfric" (Wolf-ruler)
      "stan",   // -> "Wulfstan" (Wolf-stone)
      "red",    // -> "Wulfred" (Wolf-counsel)
      "gar",    // -> "Wulfgar" (Wolf-spear)
      "$"
    ],

    // === SECONDARY ELEMENTS ===
    "alf": ["red", "ric", "wald", "$"],              // "elf, wise"
    "beorn": ["red", "ric", "wald", "hard", "$"],    // "warrior, bear-man"
    "cyne": ["ric", "wald", "mund", "$"],            // "royal, kingly"
    "hild": ["a", "e", "red", "ric", "$"],           // "battle" (often feminine)
    "leod": ["ric", "mund", "gar", "$"],             // "people, folk"
    "osw": ["ald", "ine", "ulf", "$"],               // "divine"
    "raed": ["mund", "ric", "wyn", "$"],             // "counsel, advice"
    "sig": ["mund", "ric", "wald", "wyn", "$"],      // "victory"
    "theod": ["ric", "wald", "mund", "$"],           // "people, nation"

    // === TERTIARY ELEMENTS ===
    "ber": ["ht", "nard", "wyn", "$"],               // "bright"
    "cuth": ["bert", "red", "wald", "$"],            // "known, famous"
    "dun": ["stan", "ric", "wald", "$"],             // "hill"
    "earl": ["ing", "ric", "$"],                     // "nobleman"
    "hun": ["ric", "wald", "$"],                     // "bear cub, young warrior"
    "mil": ["dred", "ric", "$"],                     // "gentle, mild"
    "ord": ["ric", "gar", "$"],                      // "point, spear"
    "stanlow": ["ley", "ford", "$"],                 // "stone" - renamed to avoid duplicate
    "wil": ["fred", "ric", "helm", "$"],             // "will, desire"

    // === SINGLE LETTER ELEMENTS ===
    // Single letters that can build into larger patterns
    "a": ["l", "n", "ld", "nd", "el", "red", "ric", "$"],          // Vowel starter
    "b": ["e", "a", "i", "ern", "ert", "eorn", "ald", "$"],        // Consonant starter
    "c": ["y", "u", "yne", "uth", "eol", "ric", "$"],              // Hard consonant
    "d": ["u", "a", "e", "un", "ead", "ric", "mund", "$"],         // Consonant starter
    "e": ["l", "r", "n", "ld", "nd", "ad", "ric", "mund", "$"],    // Vowel starter
    "f": ["r", "l", "red", "ric", "ord", "$"],                     // Consonant starter
    "g": ["a", "e", "i", "od", "ar", "rim", "ric", "$"],           // Consonant starter
    "h": ["i", "a", "e", "ild", "ard", "elm", "un", "$"],          // Aspirated starter
    "l": ["e", "i", "eod", "eof", "ric", "mund", "$"],             // Liquid consonant
    "m": ["i", "a", "e", "il", "ild", "ric", "und", "$"],          // Nasal consonant
    "n": ["o", "i", "ic", "ric", "mund", "$"],                     // Nasal consonant
    "o": ["r", "s", "ld", "sw", "ric", "$"],                       // Vowel starter
    "r": ["a", "e", "i", "aed", "ic", "ed", "$"],                  // Liquid consonant
    "s": ["i", "a", "e", "ig", "tan", "ric", "$"],                 // Sibilant starter
    "t": ["h", "i", "a", "hur", "heod", "ric", "$"],               // Stop consonant
    "w": ["i", "a", "e", "ulf", "ine", "ald", "ric", "$"],         // Consonant starter

    // === DOUBLE LETTER ELEMENTS ===
    // Common Old English letter pairs that form authentic patterns
    "ae": ["l", "s", "t", "thel", "sc", "ric", "$"],               // Ash vowel pair
    "al": ["f", "d", "red", "ric", "bert", "$"],                   // Liquid combination
    "an": ["d", "t", "ric", "mund", "$"],                          // Nasal combination
    "ar": ["e", "i", "nold", "thur", "ric", "$"],                  // Liquid combination
    "as": ["c", "t", "ric", "mund", "$"],                          // Sibilant combination
    "be": ["orn", "ald", "rt", "rht", "ric", "$"],                 // Consonant start
    "br": ["and", "yni", "ict", "ric", "$"],                       // Consonant cluster
    "bu": ["rh", "rg", "ric", "$"],                                // Consonant start
    "cy": ["ne", "ric", "mund", "$"],                              // Royal element
    "de": ["or", "ric", "mund", "$"],                              // Consonant start
    "dr": ["ed", "ric", "mund", "$"],                              // Consonant cluster
    "du": ["n", "nn", "ric", "$"],                                 // Consonant start
    "ea": ["d", "l", "rl", "dric", "lred", "mund", "$"],           // Vowel combination
    "ec": ["g", "bert", "ric", "$"],                               // Consonant start
    "el": ["f", "m", "d", "red", "ric", "mund", "$"],              // Liquid combination
    "er": ["ic", "man", "ric", "mund", "$"],                       // Liquid combination
    "es": ["t", "ric", "mund", "$"],                               // Sibilant combination
    "fl": ["ed", "ow", "ric", "$"],                                // Consonant cluster
    "fr": ["ed", "ith", "ric", "$"],                               // Consonant cluster
    "ge": ["ard", "off", "ric", "$"],                              // Consonant start
    "gi": ["s", "fu", "ric", "$"],                                 // Consonant start
    "gr": ["im", "ant", "ric", "$"],                               // Consonant cluster
    "gu": ["n", "th", "ric", "$"],                                 // Consonant start
    "ha": ["rd", "l", "lla", "ric", "$"],                          // Aspirated start
    "he": ["ard", "lm", "nry", "ric", "$"],                        // Aspirated start
    "hi": ["ld", "lda", "ric", "$"],                               // Aspirated start
    "hr": ["oth", "ric", "$"],                                     // Consonant cluster
    "hu": ["n", "bert", "ric", "$"],                               // Aspirated start
    "le": ["od", "of", "ric", "mund", "$"],                        // Liquid start
    "li": ["n", "lian", "ric", "$"],                               // Liquid start
    "ma": ["r", "gn", "ric", "mund", "$"],                         // Nasal start
    "me": ["l", "rc", "ric", "mund", "$"],                         // Nasal start
    "ni": ["c", "ht", "ric", "$"],                                 // Nasal start
    "no": ["r", "th", "ric", "$"],                                 // Nasal start
    "or": ["d", "ic", "ric", "$"],                                 // Vowel start
    "ra": ["ed", "nd", "ven", "ric", "$"],                         // Liquid start
    "re": ["d", "gin", "x", "ric", "$"],                           // Liquid start
    "ri": ["c", "chard", "ric", "$"],                              // Liquid start
    "ro": ["d", "bert", "ric", "$"],                               // Liquid start
    "sa": ["x", "ric", "mund", "$"],                               // Sibilant start
    "se": ["l", "ward", "ric", "$"],                               // Sibilant start
    "si": ["g", "ward", "ric", "$"],                               // Sibilant start
    "st": ["an", "orm", "ric", "$"],                               // Consonant cluster
    "th": ["ur", "eod", "omas", "ric", "$"],                       // Fricative start
    "tr": ["uth", "ric", "$"],                                     // Consonant cluster
    "ul": ["f", "ric", "$"],                                       // Vowel start
    "un": ["a", "ric", "mund", "$"],                               // Vowel start
    "ur": ["ic", "ry", "ric", "$"],                                // Vowel start
    "wa": ["l", "ld", "lter", "ric", "$"],                         // Consonant start
    "we": ["a", "ald", "ric", "$"],                                // Consonant start
    "wi": ["l", "ne", "fred", "ric", "$"],                         // Consonant start
    "wy": ["n", "nn", "ric", "$"],                                 // Consonant start

    // === INTERMEDIATE CONNECTORS ===
    // These help build longer, more complex names

    // === ENDING PATTERNS ===
    // These are the classic Old English name endings that terminate names

    // Primary endings (most common)
    "ric": ["$"],      // "ruler, king" - extremely common ending
    "mund": ["$"],     // "protection, guardian" - very common
    "ward": ["$"],     // "guardian, protector" - common (Ward, Edward)
    "win": ["$"],      // "friend" - very common (Edwin, Godwin)
    "wyn": ["$"],      // "joy, friend" - common feminine ending
    "red": ["$"],      // "counsel, advice" - common (Alfred, Aelred)
    "fred": ["$"],     // "peace" - common (Alfred, Godfred)
    "gar": ["$"],      // "spear" - warrior ending
    "stan": ["$"],     // "stone" - strong ending (Dunstan, Wulfstan)
    "wald": ["$"],     // "rule, power" - noble ending

    // Secondary endings
    "helm": ["$"],     // "helmet, protection"
    "bert": ["$"],     // "bright, shining"
    "hard": ["$"],     // "hardy, strong"
    "ine": ["$"],      // "descendant of" (often in royal names)
    "ing": ["$"],      // "son of, people of"
    "nard": ["$"],     // "bold, hardy"
    "ht": ["$"],       // "bright" (in names like Berht)

    // Compound endings that can extend
    "ald": ["ric", "$"],          // "old" -> can become "ric" or end
    "ng": ["$"],                  // consonant cluster ending
    "ld": ["$"],                  // consonant cluster ending  
    "nd": ["$"],                  // consonant cluster ending

    // Place-name endings (less common in personal names)
    "ford": ["$"],     // "river crossing"
    "ley": ["$"],      // "meadow, clearing"
    "ton": ["$"],      // "enclosure, settlement"
    "ham": ["$"],      // "home, village"
    "burg": ["$"]      // "fortress, town"
  },

  options: {
    name: "Old English",
    startMarker: "^",
    endMarker: "$",
    minNodes: 4,
    maxNodes: -1,
    consecutiveSingleLetterLimit: 2,
    nonConsecutiveSingleLetterLimit: -1,
    duplicateClusterLimit: -1
  }
};
