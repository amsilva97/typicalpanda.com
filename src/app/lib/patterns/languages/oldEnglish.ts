import { LanguageDefinition } from '../generations';

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
      // Classic Old English name elements
      "ael", "aed", "alf", "aethel", "beorn", "cyne", "ead", "ed", "god",
      "hild", "leod", "ost", "raed", "sig", "theod", "wulf", "wyn",

      // Common starting consonant clusters
      "br", "dr", "fr", "gr", "bl", "cl", "fl", "gl", "pr", "tr", "th", "sc", "sw",

      // Simple consonant starts
      "b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "w"
    ],

    // Vowel continuations - heavily favor consonants, avoid vowel chains
    "a": [
      "r", "l", "n", "d", "s", "t", "m", "th", "nd", "st", "ld", "rd",
      "dh", "gn", "mb", "wyn", "ric", "wald", "mund", "helm", "bert", "$"
    ],
    "e": [
      "l", "r", "n", "d", "s", "t", "th", "nd", "st", "ld", "rd", "mb",
      "dh", "wyn", "ric", "wald", "mund", "helm", "bert", "fred", "eth", "$"
    ],
    "i": [
      "n", "r", "l", "s", "t", "d", "th", "nd", "st", "ld", "rd", "gn",
      "mb", "wyn", "ric", "mund", "helm", "grim", "$"
    ],
    "o": [
      "r", "n", "l", "s", "t", "d", "th", "nd", "st", "ld", "rd", "mb",
      "dh", "wyn", "ric", "wald", "mund", "helm", "$"
    ],
    "u": [
      "l", "r", "n", "s", "t", "d", "th", "nd", "st", "ld", "rd", "gn",
      "mb", "$"
    ],
    "y": [
      "r", "n", "l", "s", "t", "d", "th", "nd", "st", "ld", "rd", "$"
    ],

    // Consonant clusters - lead to vowels or endings
    "th": ["a", "e", "i", "o", "u", "an", "or", "$"],
    "nd": ["a", "e", "i", "o", "u", "or", "$"],
    "st": ["a", "e", "i", "o", "u", "or", "$"],
    "ld": ["a", "e", "i", "o", "u", "or", "$"],
    "rd": ["a", "e", "i", "o", "u", "or", "$"],
    "mb": ["a", "e", "i", "o", "u", "or", "$"],
    "gn": ["a", "e", "i", "o", "u", "or", "$"],
    "dh": ["a", "e", "i", "o", "u", "or", "$"],

    // Single consonants - can continue or end
    "r": ["a", "e", "i", "o", "u", "an", "or", "wyn", "ic", "ed", "$"],
    "l": ["a", "e", "i", "o", "u", "an", "or", "wyn", "m", "d", "f", "$"],
    "n": ["a", "e", "i", "o", "u", "wyn", "$"],
    "d": ["a", "e", "i", "o", "u", "wyn", "$"],
    "s": ["a", "e", "i", "o", "u", "tan", "$"],
    "t": ["a", "e", "i", "o", "u", "an", "$"],
    "m": ["a", "e", "i", "o", "u", "und", "$"],
    "g": ["a", "e", "i", "o", "u", "rim", "$"],
    "k": ["a", "e", "i", "o", "u", "$"],
    "p": ["a", "e", "i", "o", "u", "$"],
    "f": ["a", "e", "i", "o", "u", "red", "$"],
    "h": ["a", "e", "i", "o", "u", "elm", "$"],
    "v": ["a", "e", "i", "o", "u", "$"],
    "w": ["a", "e", "i", "o", "u", "ulf", "in", "ald", "$"],
    "c": ["a", "e", "i", "o", "u", "$"],

    // Common endings
    "an": ["a", "d", "s", "t", "$"],
    "or": ["a", "d", "s", "t", "n", "$"],

    // Classic Old English name elements - can continue or end
    "ael": ["d", "f", "r", "red", "ric", "wyn", "$"],
    "aed": ["ward", "mund", "ric", "wyn", "$"],
    "alf": ["red", "ric", "wald", "$"],
    "aethel": ["red", "ric", "wald", "stan", "wyn", "$"],
    "beorn": ["red", "ric", "wald", "$"],
    "cyne": ["ric", "wald", "mund", "$"],
    "ead": ["mund", "ric", "ward", "wyn", "$"],
    "ed": ["mund", "ric", "ward", "wyn", "$"],
    "god": ["ric", "mund", "wyn", "$"],
    "hild": ["a", "e", "red", "ric", "helm", "$"],
    "leod": ["ric", "mund", "gar", "$"],
    "ost": ["ric", "mund", "gar", "$"],
    "raed": ["mund", "ric", "wyn", "$"],
    "sig": ["mund", "ric", "wald", "wyn", "$"],
    "theod": ["ric", "wald", "mund", "$"],
    "wulf": ["ric", "red", "stan", "$"],
    "wyn": ["a", "d", "red", "ric", "$"],

    // Consonant cluster starters
    "br": ["a", "e", "i", "o", "u", "$"],
    "dr": ["a", "e", "i", "o", "u", "$"],
    "fr": ["a", "e", "i", "o", "u", "$"],
    "gr": ["a", "e", "i", "o", "u", "$"],
    "bl": ["a", "e", "i", "o", "u", "$"],
    "cl": ["a", "e", "i", "o", "u", "$"],
    "fl": ["a", "e", "i", "o", "u", "$"],
    "gl": ["a", "e", "i", "o", "u", "$"],
    "pr": ["a", "e", "i", "o", "u", "$"],
    "tr": ["a", "e", "i", "o", "u", "$"],

    // Classic Old English ending clusters
    "ric": ["$"],        // -ric (ruler, king)
    "wald": ["$"],       // -wald (rule, power) 
    "mund": ["$"],       // -mund (protection)
    "helm": ["$"],       // -helm (helmet, protection)
    "bert": ["$"],       // -bert (bright)
    "fred": ["$"],       // -fred (peace)
    "win": ["$"],        // -win (friend)
    "red": ["$"],        // -red (counsel)
    "grim": ["$"],       // -grim (mask, fierce)
    "bald": ["$"],       // -bald (bold)
    "stan": ["$"],       // -stan (stone)

    // Additional authentic Old English endings
    "weard": ["$"],      // -weard (guard, protector)
    "wine": ["$"],       // -wine (friend, lord)
    "thane": ["$"],      // -thane (servant, warrior)
    "here": ["$"],       // -here (army)
    "flee": ["$"],       // -flee (refuge)
    "geat": ["$"],       // -geat (gate, way)
    "mon": ["$"],        // -mon (man)
    "noth": ["$"],       // -noth (boldness)
    "hard": ["$"],       // -hard (hardy)
    "fast": ["$"],       // -fast (firm)
    "leof": ["$"],       // -leof (dear, beloved)
    "maer": ["$"],       // -maer (famous)
    "mod": ["$"],        // -mod (courage)
    "wig": ["$"],        // -wig (war)
    "hun": ["$"],        // -hun (bear cub, young warrior)
    "ulf": ["$"],        // -ulf (wolf)
    "ing": ["$"],        // -ing (meadow, descendant)
    "ton": ["$"],        // -ton (enclosure, town)
    "ham": ["$"],        // -ham (home, village)
    "ley": ["$"],        // -ley (meadow, clearing)
    "ford": ["$"],       // -ford (ford, crossing)
    "burg": ["$"],       // -burg (fortress, town)
    "wick": ["$"],       // -wick (village, dwelling)

    // Common simple endings
    "eth": ["$"],        // -eth
    "en": ["$"],         // -en
    "ar": ["$"],         // -ar
    "er": ["$"],         // -er
    "el": ["$"],         // -el
    "id": ["$"],         // -id
    "od": ["$"],         // -od
    "ad": ["$"]          // -ad
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
    minLength: 4,
    maxLength: 15,
    startMarker: "^",
    endMarker: "$",
    maxLoops: 50,
    singleLetterLimiter: 2 // Allow max 2 consecutive single letters
  }
};

