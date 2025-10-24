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
      // Single letter transitions
      "d", "f", "m", "n", "r", "s", "t", "w",
      // Double letter transitions
      "br", "dr", "st", "th", "wi", "ma", "no",
      "$"       // Can end as just "Ael"
    ],

    // "Aethel" family - "noble" (royal prefix)
    "aethel": [
      "red",    // -> "Aethelred" (Noble-counsel)
      "stan",   // -> "Aethelstan" (Noble-stone)
      "wald",   // -> "Aethelwald" (Noble-power)
      "ric",    // -> "Aethelric" (Noble-ruler)
      "wyn",    // -> "Aethelwyn" (Noble-friend)
      // Single letter transitions
      "b", "f", "h", "m", "n", "r", "w",
      // Double letter transitions
      "br", "fl", "st", "wi", "no",
      "$"
    ],

    // "Ead/Ed" family - "blessed, wealth"
    "ead": [
      "mund",   // -> "Eadmund" (Blessed-protection)
      "ward",   // -> "Eadward" (Blessed-guardian) - "Edward"
      "ric",    // -> "Eadric" (Blessed-ruler)
      "wyn",    // -> "Eadwyn" (Blessed-friend)
      // Single letter transitions
      "d", "g", "m", "r", "w",
      // Double letter transitions
      "br", "gr", "ma", "wi",
      "$"
    ],

    "ed": [
      "mund",   // -> "Edmund" (Blessed-protection)
      "ward",   // -> "Edward" (Blessed-guardian)
      "ric",    // -> "Edric" (Blessed-ruler)
      "gar",    // -> "Edgar" (Blessed-spear)
      "win",    // -> "Edwin" (Blessed-friend)
      // Single letter transitions
      "d", "g", "m", "r", "w",
      // Double letter transitions
      "wa", "wi", "ma", "ra",
      "$"
    ],

    // "God" family - "good, divine" 
    "god": [
      "ric",    // -> "Godric" (God-ruler)
      "win",    // -> "Godwin" (God-friend) - very common
      "fred",   // -> "Godfrey" (God-peace)
      "mund",   // -> "Godmund" (God-protection)
      "wald",   // -> "Godwald" (God-power)
      "ward",   // -> "Godward" (God-guardian)
      "gar",    // -> "Godgar" (God-spear)
      // Single letter transitions - avoid "ri" patterns
      "b", "d", "f", "w",
      // Double letter transitions - more variety
      "br", "fr", "wi", "wa",
      "$"
    ],

    // "Wulf" family - "wolf" (warrior names)
    "wulf": [
      "ric",    // -> "Wulfric" (Wolf-ruler)
      "stan",   // -> "Wulfstan" (Wolf-stone)
      "red",    // -> "Wulfred" (Wolf-counsel)
      "gar",    // -> "Wulfgar" (Wolf-spear)
      "ard",    // -> "Wulfard" (Wolf-hardy)
      "win",    // -> "Wulfwin" (Wolf-friend)
      // Single letter transitions - avoid problematic patterns
      "a", "e", "i",
      // Double letter transitions
      "ar", "er", "ra",
      "$"
    ],

    // === SECONDARY ELEMENTS ===
    "alf": ["red", "ric", "wald", "ward", "gar", "ra", "ri", "$"],              // "elf, wise"
    "beorn": ["red", "ric", "wald", "hard", "ard", "e", "ar", "er", "$"],    // "warrior, bear-man"
    "cyne": ["ric", "wald", "mund", "ward", "gar", "w", "ri", "wa", "ma", "$"],            // "royal, kingly"
    "hild": ["a", "e", "red", "ric", "ard", "d", "ar", "er", "$"],           // "battle" (often feminine)
    "leod": ["ric", "mund", "gar", "wyn", "m", "g", "ri", "ma", "$"],             // "people, folk"
    "osw": ["ald", "ine", "ulf", "ard", "i", "u", "al", "in", "$"],               // "divine"
    "raed": ["mund", "ric", "wyn", "ward", "r", "w", "ma", "ri", "$"],             // "counsel, advice"
    "sig": ["mund", "ric", "wald", "wyn", "ward", "r", "w", "ma", "ri", "$"],      // "victory"
    "theod": ["ric", "wald", "mund", "wyn", "w", "m", "ri", "wa", "$"],           // "people, nation"

    // === TERTIARY ELEMENTS ===
    "ber": ["ht", "nard", "wyn", "h", "n", "w", "ht", "na", "$"],               // "bright"
    "cuth": ["bert", "red", "wald", "b", "r", "w", "be", "re", "$"],            // "known, famous"
    "dun": ["stan", "ric", "wald", "s", "r", "w", "st", "ri", "$"],             // "hill"
    "earl": ["ing", "ric", "i", "r", "in", "ri", "$"],                     // "nobleman"
    "hun": ["ric", "wald", "r", "w", "ri", "wa", "$"],                     // "bear cub, young warrior"
    "mil": ["dred", "ric", "d", "r", "dr", "ri", "$"],                     // "gentle, mild"
    "ord": ["ric", "gar", "r", "g", "ri", "ga", "$"],                      // "point, spear"
    "stanlow": ["ley", "ford", "l", "f", "le", "fo", "$"],                 // "stone" - renamed to avoid duplicate
    "wil": ["fred", "ric", "helm", "f", "r", "h", "fr", "ri", "$"],             // "will, desire"

    // === SINGLE LETTER ELEMENTS ===
    // Single letters that can build into larger patterns
    "a": ["l", "n", "ld", "nd", "el", "red", "gar", "ward", "$"],          // Vowel starter - diversified
    "b": ["e", "a", "i", "ern", "ert", "eorn", "ald", "ert", "$"],        // Consonant starter
    "c": ["y", "u", "yne", "uth", "eol", "uth", "yne", "$"],              // Hard consonant - removed "ric"
    "d": ["u", "a", "e", "un", "ead", "mund", "gar", "ward", "$"],         // Consonant starter - diversified
    "e": ["l", "r", "n", "ld", "nd", "ad", "mund", "gar", "ward", "$"],    // Vowel starter - diversified
    "f": ["r", "l", "red", "ord", "red", "ord", "$"],                     // Consonant starter - removed "ric"
    "g": ["a", "e", "i", "od", "ar", "rim", "ar", "od", "$"],           // Consonant starter - removed "ric"
    "h": ["i", "a", "e", "ild", "ard", "elm", "un", "ard", "$"],          // Aspirated starter
    "l": ["e", "i", "eod", "eof", "mund", "eof", "eod", "$"],             // Liquid consonant - removed "ric"
    "m": ["i", "a", "e", "il", "ild", "und", "il", "ild", "$"],          // Nasal consonant - removed "ric"
    "n": ["o", "i", "ic", "mund", "ic", "o", "$"],                     // Nasal consonant - reduced "ric"
    "o": ["r", "s", "ld", "sw", "sw", "ld", "$"],                       // Vowel starter - removed "ric"
    "r": ["a", "e", "i", "aed", "ic", "ed", "aed", "oy", "$"],                  // Liquid consonant - removed problem "ri"
    "s": ["i", "a", "e", "ig", "tan", "wy", "tan", "$"],                 // Sibilant starter - reduced "ric"
    "t": ["h", "i", "a", "hur", "heod", "wy", "hur", "$"],               // Stop consonant - reduced "ric"
    "w": ["i", "a", "e", "ulf", "ine", "ald", "yn", "ine", "$"],         // Consonant starter - added "yn"

    // === DOUBLE LETTER ELEMENTS ===
    // Common Old English letter pairs that form authentic patterns
    "ae": ["l", "s", "t", "thel", "sc", "ric", "red", "mund", "l", "$"],         // Ash vowel pair
    "al": ["f", "d", "red", "ric", "bert", "fred", "mund", "f", "$"],            // Liquid combination
    "an": ["d", "t", "ric", "mund", "red", "gar", "d", "$"],                     // Nasal combination
    "ar": ["e", "i", "nold", "thur", "ric", "red", "mund", "nold", "$"],        // Liquid combination
    "as": ["c", "t", "ric", "mund", "red", "c", "$"],                            // Sibilant combination
    "be": ["orn", "ald", "rt", "rht", "ric", "red", "mund", "orn", "$"],        // Consonant start
    "br": ["and", "yni", "ict", "ht", "and", "ict", "$"],                       // Consonant cluster - removed ric/mund heavy
    "bu": ["rh", "rg", "ric", "red", "mund", "rh", "$"],                        // Consonant start
    "cy": ["ne", "mund", "ward", "gar", "$"],                                // Royal element - diversified
    "de": ["or", "mund", "ward", "gar", "$"],                                // Consonant start - diversified
    "dr": ["ed", "mund", "aft", "aft", "$"],                         // Consonant cluster - reduced "red"
    "du": ["n", "nn", "mund", "gar", "$"],                           // Consonant start
    "ea": ["d", "l", "rl", "dric", "lred", "mund", "red", "ric", "$"],      // Vowel combination
    "ec": ["g", "bert", "ric", "red", "mund", "$"],                         // Consonant start
    "el": ["f", "m", "d", "red", "ric", "mund", "wyn", "$"],                // Liquid combination
    "er": ["ic", "man", "ric", "mund", "red", "wyn", "$"],                  // Liquid combination
    "es": ["t", "ric", "mund", "red", "$"],                                 // Sibilant combination
    "fl": ["ed", "ow", "ric", "red", "mund", "$"],                          // Consonant cluster
    "fr": ["ed", "ith", "ric", "red", "mund", "ank", "$"],                  // Consonant cluster
    "ge": ["ard", "off", "ric", "red", "mund", "$"],                        // Consonant start
    "gi": ["s", "fu", "ric", "red", "mund", "$"],                           // Consonant start
    "gr": ["im", "ant", "mund", "ey", "ald", "ey", "$"],            // Consonant cluster - reduced "red"
    "gu": ["n", "th", "mund", "ward", "$"],                           // Consonant start - diversified
    "ha": ["rd", "l", "lla", "ric", "red", "mund", "$"],                        // Aspirated start
    "he": ["ard", "lm", "nry", "ric", "red", "mund", "$"],                  // Aspirated start
    "hi": ["ld", "lda", "ric", "red", "mund", "$"],                         // Aspirated start
    "hr": ["oth", "ric", "red", "mund", "$"],                               // Consonant cluster
    "hu": ["n", "bert", "ric", "red", "mund", "$"],                         // Aspirated start
    "le": ["od", "of", "ric", "mund", "red", "wyn", "$"],                   // Liquid start
    "li": ["n", "lian", "ric", "red", "mund", "$"],                         // Liquid start
    "ma": ["r", "gn", "ric", "mund", "red", "ld", "$"],                     // Nasal start
    "me": ["l", "rc", "ric", "mund", "red", "$"],                           // Nasal start
    "ni": ["c", "ht", "ric", "red", "mund", "$"],                           // Nasal start
    "no": ["r", "th", "ric", "red", "mund", "$"],                           // Nasal start
    "or": ["d", "ic", "ric", "red", "mund", "$"],                           // Vowel start
    "ra": ["ed", "nd", "ven", "ric", "red", "mund", "$"],                   // Liquid start
    "re": ["d", "gin", "x", "ric", "red", "mund", "$"],                     // Liquid start
    "ri": ["c", "chard", "ric", "red", "mund", "$"],                        // Liquid start
    "ro": ["d", "bert", "ric", "red", "mund", "$"],                         // Liquid start
    "sa": ["x", "ric", "mund", "red", "$"],                                 // Sibilant start
    "se": ["l", "ward", "ric", "red", "mund", "$"],                         // Sibilant start
    "si": ["g", "ward", "ric", "red", "mund", "$"],                         // Sibilant start
    "st": ["an", "orm", "ric", "red", "mund", "$"],                         // Consonant cluster
    "th": ["ur", "eod", "omas", "ric", "red", "mund", "$"],                 // Fricative start
    "tr": ["uth", "ric", "red", "mund", "$"],                               // Consonant cluster
    "ul": ["f", "ric", "red", "mund", "$"],                                 // Vowel start
    "un": ["a", "ric", "mund", "red", "$"],                                 // Vowel start
    "ur": ["ic", "ry", "ric", "red", "mund", "$"],                          // Vowel start
    "wa": ["l", "ld", "lter", "ric", "red", "mund", "$"],                   // Consonant start
    "we": ["a", "ald", "ric", "red", "mund", "$"],                          // Consonant start
    "wi": ["l", "ne", "fred", "ric", "red", "mund", "$"],                   // Consonant start
    "wy": ["n", "nn", "ric", "red", "mund", "$"],                           // Consonant start

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
    minNodes: 2,              // Historical names like "Ed", "Ulf" were common (2 nodes: start + end)
    maxNodes: 4,              // Reduced from 6 to prevent overly long names like "mildeadmund"
    consecutiveSingleLetterLimit: 1,     // Rarely had consecutive single letters in authentic names
    nonConsecutiveSingleLetterLimit: 2,  // Limited single letters to maintain syllable integrity
    duplicateClusterLimit: 1             // Old English avoided repetitive patterns within names
  }
};
