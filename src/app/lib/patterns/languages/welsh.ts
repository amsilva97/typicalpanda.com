import { LanguageDefinition } from '../core';

/**
 * Welsh language definition
 * ^ marks the start of generation
 * $ marks the end of generation
 * Keys represent pattern nodes, values are arrays of possible continuations
 */
export const welsh: LanguageDefinition = {
  patterns: {
    // Common Welsh starting patterns
    "^": [
      // Classic Welsh name elements
      "ael", "aer", "an", "arn", "bran", "bry", "cad", "car", "cer", "cym", 
      "daf", "del", "der", "dew", "dwy", "eil", "ein", "ely", "emr", "eur",
      "gal", "gar", "gwe", "gwy", "haf", "hel", "hun", "hyw", "iac", "ief",
      "ior", "lly", "mae", "mal", "mar", "mer", "mor", "myf", "neb", "ner",
      "ow", "pen", "pri", "rhi", "rhy", "tal", "teg", "tre", "tud", "wal",
      "wyn", "ysb", "ysg",

      // Common starting consonant clusters
      "bl", "br", "ch", "cl", "cr", "dr", "ff", "fl", "fr", "gl", "gr", 
      "ll", "mh", "nh", "ph", "pl", "pr", "rh", "th", "tr",

      // Simple consonant starts
      "b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "r", "s", "t", "w", "y"
    ],

    // Vowel continuations - heavily favor consonants, avoid vowel chains
    "a": [
      "r", "l", "n", "d", "s", "t", "m", "ff", "dd", "th", "ng", "ch", "ll",
      "wen", "ron", "lyn", "nes", "led", "nel", "edd", "eth", "nog", "$"
    ],
    "e": [
      "l", "r", "n", "d", "s", "t", "dd", "ff", "th", "ng", "ch", "ll",
      "lyn", "ron", "wen", "led", "nel", "edd", "lys", "ris", "$"
    ],
    "i": [
      "n", "r", "l", "s", "t", "d", "ff", "dd", "th", "ng", "ch", "ll",
      "on", "an", "wen", "lyn", "edd", "ael", "$"
    ],
    "o": [
      "r", "n", "l", "s", "t", "d", "ff", "dd", "th", "ng", "ch", "ll",
      "wen", "ron", "lyn", "nes", "edd", "rys", "$"
    ],
    "u": [
      "l", "r", "n", "s", "t", "d", "ff", "dd", "th", "ng", "ch", "ll",
      "wen", "ron", "edd", "$"
    ],
    "w": [
      "r", "n", "l", "s", "t", "d", "ff", "dd", "th", "ng", "ch", "ll",
      "en", "yn", "ys", "el", "$"
    ],
    "y": [
      "r", "n", "l", "s", "t", "d", "ff", "dd", "th", "ng", "ch", "ll",
      "n", "s", "l", "wen", "ron", "$"
    ],

    // Welsh consonant clusters - lead to vowels or endings
    "ch": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "dd": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "ff": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "ll": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "ng": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "rh": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "th": ["a", "e", "i", "o", "u", "w", "y", "$"],

    // Single consonants - can continue or end
    "r": ["a", "e", "i", "o", "u", "w", "y", "on", "yn", "ys", "wen", "$"],
    "l": ["a", "e", "i", "o", "u", "w", "y", "yn", "ys", "wen", "an", "$"],
    "n": ["a", "e", "i", "o", "u", "w", "y", "wen", "edd", "$"],
    "d": ["a", "e", "i", "o", "u", "w", "y", "wen", "ys", "$"],
    "s": ["a", "e", "i", "o", "u", "w", "y", "wen", "$"],
    "t": ["a", "e", "i", "o", "u", "w", "y", "ys", "$"],
    "m": ["a", "e", "i", "o", "u", "w", "y", "ys", "$"],
    "g": ["a", "e", "i", "o", "u", "w", "y", "wen", "$"],
    "p": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "f": ["a", "e", "i", "o", "u", "w", "y", "ys", "$"],
    "h": ["a", "e", "i", "o", "u", "w", "y", "ys", "$"],
    "c": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "b": ["a", "e", "i", "o", "u", "w", "y", "$"],

    // Common Welsh name elements - can continue or end
    "ael": ["ed", "wen", "ys", "on", "$"],
    "aer": ["on", "wen", "ys", "$"],
    "an": ["wen", "gha", "nes", "ys", "$"],
    "arn": ["edd", "wen", "ys", "$"],
    "bran": ["wen", "ys", "$"],
    "bry": ["n", "s", "ach", "$"],
    "cad": ["an", "ell", "wal", "ys", "$"],
    "car": ["ys", "wen", "on", "$"],
    "cer": ["i", "ys", "edd", "$"],
    "cym": ["ru", "ry", "$"],
    "daf": ["ydd", "ys", "$"],
    "del": ["yn", "ys", "wen", "$"],
    "der": ["wyn", "ys", "wen", "$"],
    "dew": ["i", "ys", "$"],
    "dwy": ["r", "s", "$"],
    "eil": ["ir", "ys", "$"],
    "ein": ["ir", "ys", "$"],
    "ely": ["s", "r", "$"],
    "emr": ["ys", "$"],
    "eur": ["on", "ys", "$"],
    "gal": ["wen", "ys", "$"],
    "gar": ["eth", "ys", "$"],
    "gwe": ["n", "nno", "ys", "$"],
    "gwy": ["n", "r", "nedd", "$"],
    "haf": ["ren", "ys", "$"],
    "hel": ["yn", "ys", "$"],
    "hun": ["ydd", "ys", "$"],
    "hyw": ["el", "ys", "$"],
    "iac": ["o", "ys", "$"],
    "ief": ["an", "ys", "$"],
    "ior": ["werth", "ys", "$"],
    "lly": ["r", "s", "$"],
    "mae": ["l", "s", "$"],
    "mal": ["lt", "ys", "$"],
    "mar": ["ed", "ys", "$"],
    "mer": ["edd", "ys", "$"],
    "mor": ["ys", "wen", "$"],
    "myf": ["anwy", "ys", "$"],
    "neb": ["edd", "ys", "$"],
    "ner": ["ys", "wen", "$"],
    "ow": ["ain", "en", "ys", "$"],
    "pen": ["ri", "ry", "ys", "$"],
    "pri": ["s", "ys", "$"],
    "rhi": ["an", "s", "ys", "$"],
    "rhy": ["s", "dd", "$"],
    "tal": ["iesin", "ys", "$"],
    "teg": ["an", "ys", "$"],
    "tre": ["for", "ys", "$"],
    "tud": ["ur", "ys", "$"],
    "wal": ["ter", "ys", "$"],
    "wyn": ["$"],
    "ysb": ["addaden", "ys", "$"],
    "ysg": ["ard", "ys", "$"],

    // Consonant cluster starters
    "bl": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "br": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "cl": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "cr": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "dr": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "fl": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "fr": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "gl": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "gr": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "mh": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "nh": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "ph": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "pl": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "pr": ["a", "e", "i", "o", "u", "w", "y", "$"],
    "tr": ["a", "e", "i", "o", "u", "w", "y", "$"],

    // Classic Welsh ending clusters
    "wen": ["$"],        // white, blessed
    "ys": ["$"],         // genitive/possessive ending
    "on": ["$"],         // diminutive ending
    "edd": ["$"],        // ending indicating past/agent
    "lyn": ["$"],        // lake, pool
    "ron": ["$"],        // lance, spear
    "nel": ["$"],        // related to light
    "led": ["$"],        // broad
    "nes": ["$"],        // -ness quality
    "eth": ["$"],        // goes, went
    "nog": ["$"],        // enough
    "lys": ["$"],        // court, hall
    "ris": ["$"],        // ardor, rush
    "rys": ["$"],        // ardor

    // Additional Welsh endings
    "anwy": ["$"],       // dear, beloved
    "gha": ["$"],        // dog (in compounds)
    "ach": ["$"],        // suffix indicating lineage
    "ydd": ["$"],        // day, or agent suffix
    "ir": ["$"],         // long, tall
    "nno": ["$"],        // grandson of
    "nedd": ["$"],       // flowing
    "ren": ["$"],        // maiden
    "werth": ["$"],      // value, worth
    "lt": ["$"],         // gentle
    "ed": ["$"],         // lord, chief
    "iesin": ["$"],      // little Jesus
    "for": ["$"],        // sea
    "ur": ["$"],         // lord, golden
    "ter": ["$"],        // land
    "addaden": ["$"],    // butterfly
    "ard": ["$"],        // high, noble
    "ru": ["$"],         // red
    "ry": ["$"],         // hill
    "ell": ["$"],        // second, other
    "idydd": ["$"]       // day
  },

  meanings: {
    // Classic Welsh name elements
    "ael": "brow, hill",
    "aer": "battle, slaughter",
    "an": "very, intensifier",
    "arn": "high, exalted", 
    "bran": "raven, crow",
    "bry": "hill, high place",
    "cad": "battle, war",
    "car": "love, beloved",
    "cer": "music, song",
    "cym": "Welsh, from Cymru",
    "daf": "favorite, beloved",
    "del": "pretty, neat",
    "der": "oak tree",
    "dew": "divine, godly",
    "dwy": "two, pair",
    "eil": "second, another",
    "ein": "our, anvil",
    "ely": "second, goes",
    "emr": "immortal",
    "eur": "gold, golden",
    "gal": "enemy, power",
    "gar": "rough, near",
    "gwe": "web, tissue",
    "gwy": "water, river",
    "haf": "summer",
    "hel": "salt, brine",
    "hun": "sleep, self",
    "hyw": "bold, eminent",
    "iac": "healthy, healing",
    "ief": "young, youthful",
    "ior": "lord, chief",
    "lly": "place, court",
    "mae": "field, plain",
    "mal": "prince, chief",
    "mar": "sea, great",
    "mer": "marrow, pith",
    "mor": "sea, great",
    "myf": "my, mine",
    "neb": "anyone, someone",
    "ner": "lord, chief",
    "ow": "grandson, descendant",
    "pen": "head, chief",
    "pri": "precious, valuable",
    "rhi": "king, ruler",
    "rhy": "too, very",
    "tal": "tall, high",
    "teg": "beautiful, fair",
    "tre": "town, settlement",
    "tud": "country, territory",
    "wal": "wall, rampart",
    "wyn": "white, fair, blessed",
    "ysb": "dry",
    "ysg": "shield",

    // Ending clusters with meanings
    "wen": "white, fair, blessed",
    "ys": "possession, of",
    "on": "little, descendant",
    "edd": "went, has gone",
    "lyn": "lake, pool",
    "ron": "spear, lance",
    "nel": "light, bright",
    "led": "broad, wide",
    "nes": "quality, -ness",
    "eth": "goes, course",
    "nog": "enough, sufficient",
    "lys": "court, palace",
    "ris": "ardor, impetuosity",
    "rys": "ardor, rush",
    "anwy": "dear, beloved",
    "gha": "hound, dog",
    "ach": "lineage, offspring",
    "ydd": "day, agent",
    "ir": "long, tall",
    "nno": "grandson",
    "nedd": "flowing",
    "ren": "maiden",
    "werth": "worth, value",
    "lt": "gentle, mild",
    "ed": "lord, chief",
    "iesin": "little Jesus",
    "for": "sea, ocean",
    "ur": "golden, lord",
    "ter": "land, territory",
    "addaden": "butterfly",
    "ard": "high, noble",
    "ru": "red",
    "ry": "hill",
    "ell": "second, other",
    "idydd": "day"
  },

  options: {
    name: "Welsh",
    minLength: 4,
    maxLength: 15,
    startMarker: "^",
    endMarker: "$",
    maxLoops: 50,
    singleLetterLimiter: 2, // Allow max 2 consecutive single letters
    clusterLimiter: 1 // Allow max 1 use of same cluster (3+ letters) per name
  }
};