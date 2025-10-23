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
      // Tier 1: Most common authentic starts (80% of generated names should use these)
      "ael", "ael", "ael",           // "noble, elf" - very common
      "aethel", "aethel",            // "noble" - royal names
      "ead", "ead", "ed", "ed",      // "blessed, wealth" - very common
      "god", "god", "god",           // "good, divine" - extremely common
      "wulf", "wulf",                // "wolf" - warrior names
      
      // Tier 2: Common authentic starts (15% of names)
      "alf", "beorn", "cyne", "hild", "leod", "osw", "raed", "sig", "theod",
      
      // Tier 3: Less common but authentic (5% of names)
      "ber", "cuth", "dun", "earl", "hun", "mil", "ord", "stan", "wil"
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

    // === INTERMEDIATE CONNECTORS ===
    // These help build longer, more complex names
    "a": ["l", "n", "ld", "nd", "$"],                // Short vowel connectors
    "e": ["l", "r", "n", "ld", "nd", "$"],
    "i": ["n", "ng", "ld", "$"],
    "o": ["r", "ld", "$"],

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
    "l": ["$"],                   // simple consonant ending
    "n": ["$"],                   // simple consonant ending
    "r": ["$"],                   // simple consonant ending

    // Place-name endings (less common in personal names)
    "ford": ["$"],     // "river crossing"
    "ley": ["$"],      // "meadow, clearing"
    "ton": ["$"],      // "enclosure, settlement"
    "ham": ["$"],      // "home, village"
    "burg": ["$"]      // "fortress, town"
  },

  options: {
    name: "Old English",
    minLength: 4,          // Allow shorter authentic names like "Beda"
    maxLength: 10,         // Keep names manageable
    startMarker: "^",
    endMarker: "$",
    consecutiveSingleLetterLimit: 1,  // Max 1 single letter in sequence
    nonConsecutiveSingleLetterLimit: 2, // Max 2 single-letter patterns in name
    duplicateClusterLimit: 1          // Each pattern used only once per name
  }
};
