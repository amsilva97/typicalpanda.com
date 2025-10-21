import { LanguageDefinition } from '../core';

/**
 * Tolkien Elvish language definition (Sindarin/Quenya inspired)
 * ^ marks the start of generation
 * $ marks the end of generation
 * Keys represent pattern nodes, values are arrays of possible continuations
 */
export const tolkienElvish: LanguageDefinition = {
  patterns: {
    // Common Elvish starting patterns
    "^": [
      // Classic Sindarin/Quenya name elements
      "ael", "aear", "aeg", "ain", "al", "amal", "anar", "and", "ang", "ann",
      "ara", "aran", "arda", "arn", "arwen", "cal", "cel", "cirdan", "dain",
      "dior", "ear", "ech", "ed", "edhel", "el", "elr", "elv", "en", "eol",
      "er", "estel", "gal", "gand", "gil", "glor", "hal", "ithil", "leg",
      "lin", "luin", "luth", "mae", "mith", "mor", "nim", "or", "pel", "sil",
      "tar", "thaur", "thran", "tin", "ul", "vard", "yav",

      // Simple starting patterns
      "a", "e", "i", "o", "u",
      "c", "d", "f", "g", "h", "l", "m", "n", "p", "r", "s", "t", "th", "v"
    ],

    // Vowel continuations - Elvish loves flowing vowel combinations
    "a": [
      "l", "n", "r", "s", "t", "d", "m", "ng", "th", "rn", "nd", "st",
      "ran", "nar", "dar", "tar", "wen", "mir", "dor", "las", "rin", "$"
    ],
    "e": [
      "l", "n", "r", "s", "t", "d", "ng", "th", "rn", "nd", "st", "dh",
      "len", "ren", "del", "tel", "wen", "mir", "dor", "las", "rin", "$"
    ],
    "i": [
      "l", "n", "r", "s", "t", "d", "ng", "th", "rn", "nd", "st",
      "len", "ren", "del", "tel", "wen", "mir", "dor", "las", "rin", "el", "$"
    ],
    "o": [
      "l", "n", "r", "s", "t", "d", "ng", "th", "rn", "nd", "st",
      "ran", "nar", "dar", "tar", "wen", "mir", "dor", "las", "rin", "$"
    ],
    "u": [
      "l", "n", "r", "s", "t", "d", "ng", "th", "rn", "nd", "st",
      "len", "ren", "del", "tel", "wen", "mir", "dor", "las", "rin", "$"
    ],

    // Consonant patterns - characteristic of Elvish
    "l": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "n": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "d", "$"],
    "r": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "n", "d", "$"],
    "s": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "t", "$"],
    "t": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "h", "$"],
    "d": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "m": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "c": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "f": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "g": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "h": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "p": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],
    "v": ["a", "e", "i", "o", "u", "as", "en", "in", "or", "uin", "wen", "$"],

    // Special Elvish consonant clusters
    "th": ["a", "e", "i", "o", "u", "r", "ran", "or", "uin", "$"],
    "ng": ["a", "e", "i", "o", "u", "or", "uin", "$"],
    "rn": ["a", "e", "i", "o", "u", "$"],
    "nd": ["a", "e", "i", "o", "u", "$"],
    "st": ["a", "e", "i", "o", "u", "$"],
    "dh": ["a", "e", "i", "o", "u", "$"],

    // Classic Elvish name elements
    "ael": ["wen", "as", "os", "in", "luin", "$"],
    "aear": ["wen", "nis", "$"],
    "aeg": ["los", "$"],
    "ain": ["ur", "dil", "$"],
    "al": ["dar", "wen", "los", "mir", "$"],
    "amal": ["wen", "$"],
    "anar": ["ion", "$"],
    "and": ["uil", "ros", "$"],
    "ang": ["rod", "mar", "$"],
    "ann": ["on", "thon", "$"],
    "ara": ["gorn", "wen", "las", "$"],
    "aran": ["uin", "$"],
    "arda": ["mir", "$"],
    "arn": ["edol", "$"],
    "arwen": ["$"],
    "cal": ["en", "ad", "lon", "$"],
    "cel": ["orn", "dir", "$"],
    "cirdan": ["$"],
    "dain": ["$"],
    "dior": ["$"],
    "ear": ["endil", "wen", "$"],
    "ech": ["ant", "$"],
    "ed": ["ain", "hel", "$"],
    "edhel": ["$"],
    "el": ["rond", "en", "dar", "wen", "ros", "roh", "bereth", "las", "$"],
    "elr": ["ond", "$"],
    "elv": ["en", "$"],
    "en": ["dil", "wyn", "$"],
    "eol": ["$"],
    "er": ["ein", "estor", "$"],
    "estel": ["$"],
    "gal": ["adriel", "ad", "$"],
    "gand": ["alf", "$"],
    "gil": ["galad", "raen", "$"],
    "glor": ["findel", "$"],
    "hal": ["dir", "eth", "$"],
    "ithil": ["din", "$"],
    "leg": ["olas", "$"],
    "lin": ["dir", "wen", "$"],
    "luin": ["$"],
    "luth": ["ien", "$"],
    "mae": ["dros", "l", "$"],
    "mith": ["rellas", "randir", "$"],
    "mor": ["wen", "goth", "$"],
    "nim": ["rodel", "los", "$"],
    "or": ["opher", "on", "$"],
    "pel": ["ennor", "$"],
    "sil": ["van", "maril", "$"],
    "tar": ["ion", "menel", "$"],
    "thaur": ["iel", "$"],
    "thran": ["duil", "$"],
    "tin": ["domiel", "uviel", "$"],
    "ul": ["mo", "$"],
    "vard": ["a", "$"],
    "yav": ["anna", "$"],

    // Common Elvish endings
    "wen": ["$"],        // maiden, woman
    "iel": ["$"],        // daughter of
    "ion": ["$"],        // son of
    "dil": ["$"],        // friend, lover
    "mir": ["$"],        // jewel, precious
    "las": ["$"],        // leaf, leaves
    "rin": ["$"],        // crowned lady
    "dir": ["$"],        // man
    "los": ["$"],        // snow-white
    "ros": ["$"],        // red-haired
    "dal": ["$"],        // foot, valley
    "dor": ["$"],        // land
    "orn": ["$"],        // tree
    "ost": ["$"],        // fortress, city
    "eth": ["$"],        // feminine ending
    "uin": ["$"],        // blue, dark blue
    "on": ["$"],         // masculine ending
    "as": ["$"],         // hole, cave
    "in": ["$"],         // year
    "endil": ["$"],      // devoted to
    "ennor": ["$"],      // middle-earth
    "galad": ["$"],      // light, radiance
    "raen": ["$"],       // crowned
    "findel": ["$"],     // hair
    "olas": ["$"],       // foliage
    "rellas": ["$"],     // chain of stars
    "randir": ["$"],     // wanderer
    "goth": ["$"],       // dread, horror
    "rodel": ["$"],      // mighty
    "opher": ["$"],      // burrow
    "vannor": ["$"],     // brown lands
    "maril": ["$"],      // gold
    "menel": ["$"],      // heaven
    "duil": ["$"],       // river
    "domiel": ["$"],     // twilight maiden
    "uviel": ["$"],      // fire maiden
    "mo": ["$"],         // hand
    "anna": ["$"]        // gift
  },

  meanings: {
    // Classic Elvish name elements
    "ael": "lake, pool",
    "aear": "sea",
    "aeg": "sharp peak",
    "ain": "holy one",
    "al": "good, blessed",
    "amal": "yellow flower",
    "anar": "sun",
    "and": "long",
    "ang": "iron",
    "ann": "gift",
    "ara": "noble",
    "aran": "king",
    "arda": "world",
    "arn": "kingly",
    "arwen": "noble maiden",
    "cal": "light",
    "cel": "go away",
    "cirdan": "shipwright",
    "dain": "silent",
    "dior": "successor",
    "ear": "sea",
    "ech": "spear",
    "ed": "go",
    "edhel": "elf",
    "el": "star, elf",
    "elr": "star dome",
    "elv": "elf",
    "en": "of the",
    "eol": "dark elf",
    "er": "one, alone",
    "estel": "hope",
    "gal": "bright",
    "gand": "staff",
    "gil": "star",
    "glor": "golden",
    "hal": "veiled",
    "ithil": "moon",
    "leg": "swift",
    "lin": "music",
    "luin": "blue",
    "luth": "song",
    "mae": "beautiful",
    "mith": "grey",
    "mor": "dark",
    "nim": "white",
    "or": "over",
    "pel": "fenced",
    "sil": "silver",
    "tar": "high",
    "thaur": "secret",
    "thran": "vigorous",
    "tin": "sparkle",
    "ul": "fire",
    "vard": "home",
    "yav": "fruit",

    // Common endings
    "wen": "maiden",
    "iel": "daughter",
    "ion": "son",
    "dil": "friend",
    "mir": "jewel",
    "las": "leaves",
    "rin": "crowned lady",
    "dir": "man",
    "los": "snow-white",
    "ros": "red-haired",
    "dal": "foot",
    "dor": "land",
    "orn": "tree",
    "ost": "fortress",
    "eth": "feminine",
    "uin": "blue",
    "on": "masculine",
    "as": "hole",
    "in": "year",
    "endil": "devoted to",
    "ennor": "middle-earth",
    "galad": "light",
    "raen": "crowned",
    "findel": "hair",
    "olas": "foliage",
    "rellas": "starry chain",
    "randir": "wanderer",
    "goth": "enemy",
    "rodel": "mighty",
    "opher": "burrow",
    "vannor": "brown lands",
    "maril": "gold",
    "menel": "heaven",
    "duil": "river",
    "domiel": "twilight maiden",
    "uviel": "fire maiden",
    "mo": "hand",
    "anna": "gift"
  },

  options: {
    name: "Tolkien Elvish",
    minLength: 4,          // Elvish names can be elegant and short
    maxLength: 14,         // Allow for longer compound names like Earendil
    startMarker: "^",
    endMarker: "$",
    maxLoops: 50,          // Moderate complexity for flowing patterns
    singleLetterLimiter: 2, // Allow some single letters for vowel flow
    clusterLimiter: 2      // Allow elvish compounds and flowing clusters
  }
};