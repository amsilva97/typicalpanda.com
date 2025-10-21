import { LanguageDefinition } from '../core';

/**
 * Finnish language definition
 * ^ marks the start of generation
 * $ marks the end of generation
 * Keys represent pattern nodes, values are arrays of possible continuations
 */
export const finnish: LanguageDefinition = {
  patterns: {
    // Common Finnish starting patterns
    "^": [
      // Classic Finnish name elements
      "aino", "aksel", "ale", "antti", "arvo", "asko", "eero", "eino", "elias",
      "erkki", "heikki", "ilma", "ilmo", "jalo", "janne", "juha", "juhani",
      "kaarlo", "kalevi", "lauri", "lemminkäi", "marja", "mikael", "niilo",
      "onni", "paavo", "pentti", "raimo", "reino", "sakari", "seppo", "tapio",
      "urho", "väinö", "veikko", "ville", "yrjö",

      // Simple starting patterns
      "a", "e", "i", "o", "u", "y", "ä", "ö",
      "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v",

      // Common consonant starts
      "ka", "ke", "ki", "ko", "ku", "ky", "kä", "kö",
      "ta", "te", "ti", "to", "tu", "ty", "tä", "tö",
      "la", "le", "li", "lo", "lu", "ly", "lä", "lö",
      "ma", "me", "mi", "mo", "mu", "my", "mä", "mö",
      "sa", "se", "si", "so", "su", "sy", "sä", "sö",
      "ha", "he", "hi", "ho", "hu", "hy", "hä", "hö"
    ],

    // Vowel continuations - Finnish allows vowel harmony
    "a": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "ka", "la", "ma", "na", "ra", "sa", "ta", "va",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "$"
    ],
    "e": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "ke", "le", "me", "ne", "re", "se", "te", "ve",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "$"
    ],
    "i": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "ka", "ke", "ki", "ko", "ku", "ky", "kä", "kö",
      "la", "le", "li", "lo", "lu", "ly", "lä", "lö",
      "ma", "me", "mi", "mo", "mu", "my", "mä", "mö",
      "na", "ne", "ni", "no", "nu", "ny", "nä", "nö",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "nen", "nen", "nen", "$"
    ],
    "o": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "ka", "la", "ma", "na", "ra", "sa", "ta", "va",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "$"
    ],
    "u": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "ka", "la", "ma", "na", "ra", "sa", "ta", "va",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "$"
    ],
    "y": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "kä", "lä", "mä", "nä", "rä", "sä", "tä", "vä",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "$"
    ],
    "ä": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "kä", "lä", "mä", "nä", "rä", "sä", "tä", "vä",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "$"
    ],
    "ö": [
      "k", "l", "m", "n", "r", "s", "t", "v", "h", "j",
      "kä", "lä", "mä", "nä", "rä", "sä", "tä", "vä",
      "kki", "lli", "mmi", "nni", "rri", "ssi", "tti",
      "ri", "ti", "ki", "ni", "si", "mi", "vi", "hi",
      "$"
    ],

    // Consonant patterns
    "k": ["a", "e", "i", "o", "u", "y", "ä", "ö", "ki", "ka", "ke", "ko", "ku", "ky", "kä", "kö", "$"],
    "l": ["a", "e", "i", "o", "u", "y", "ä", "ö", "li", "la", "le", "lo", "lu", "ly", "lä", "lö", "$"],
    "m": ["a", "e", "i", "o", "u", "y", "ä", "ö", "mi", "ma", "me", "mo", "mu", "my", "mä", "mö", "$"],
    "n": ["a", "e", "i", "o", "u", "y", "ä", "ö", "ni", "na", "ne", "no", "nu", "ny", "nä", "nö", "$"],
    "r": ["a", "e", "i", "o", "u", "y", "ä", "ö", "ri", "ra", "re", "ro", "ru", "ry", "rä", "rö", "$"],
    "s": ["a", "e", "i", "o", "u", "y", "ä", "ö", "si", "sa", "se", "so", "su", "sy", "sä", "sö", "$"],
    "t": ["a", "e", "i", "o", "u", "y", "ä", "ö", "ti", "ta", "te", "to", "tu", "ty", "tä", "tö", "$"],
    "v": ["a", "e", "i", "o", "u", "y", "ä", "ö", "vi", "va", "ve", "vo", "vu", "vy", "vä", "vö", "$"],
    "h": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "j": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "p": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],

    // Double consonants (gemination) - characteristic of Finnish
    "kk": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "ll": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "mm": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "nn": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "pp": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "rr": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "ss": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],
    "tt": ["a", "e", "i", "o", "u", "y", "ä", "ö", "$"],

    // Consonant + vowel patterns
    "ka": ["r", "l", "n", "s", "t", "ri", "la", "na", "sa", "ta", "kki", "lli", "nni", "$"],
    "ke": ["r", "l", "n", "s", "t", "ri", "li", "ni", "si", "ti", "kki", "lli", "nni", "$"],
    "ki": ["r", "l", "n", "s", "t", "a", "e", "o", "u", "ä", "ö", "kki", "lli", "nni", "$"],
    "ko": ["r", "l", "n", "s", "t", "ri", "li", "ni", "si", "ti", "kki", "lli", "nni", "$"],
    "ku": ["r", "l", "n", "s", "t", "ri", "li", "ni", "si", "ti", "kki", "lli", "nni", "$"],
    "ky": ["r", "l", "n", "s", "t", "ri", "li", "ni", "si", "ti", "kki", "lli", "nni", "$"],
    "kä": ["r", "l", "n", "s", "t", "ri", "li", "ni", "si", "ti", "kki", "lli", "nni", "$"],
    "kö": ["r", "l", "n", "s", "t", "ri", "li", "ni", "si", "ti", "kki", "lli", "nni", "$"],

    "la": ["r", "n", "s", "t", "k", "ri", "na", "sa", "ta", "ka", "lli", "nni", "$"],
    "le": ["r", "n", "s", "t", "k", "ri", "ni", "si", "ti", "ki", "lli", "nni", "$"],
    "li": ["r", "n", "s", "t", "k", "a", "e", "o", "u", "ä", "ö", "lli", "nni", "$"],
    "lo": ["r", "n", "s", "t", "k", "ri", "ni", "si", "ti", "ki", "lli", "nni", "$"],
    "lu": ["r", "n", "s", "t", "k", "ri", "ni", "si", "ti", "ki", "lli", "nni", "$"],
    "ly": ["r", "n", "s", "t", "k", "ri", "ni", "si", "ti", "ki", "lli", "nni", "$"],
    "lä": ["r", "n", "s", "t", "k", "ri", "ni", "si", "ti", "ki", "lli", "nni", "$"],
    "lö": ["r", "n", "s", "t", "k", "ri", "ni", "si", "ti", "ki", "lli", "nni", "$"],

    "ma": ["r", "l", "n", "s", "t", "k", "ri", "la", "na", "sa", "ta", "ka", "mmi", "lli", "$"],
    "me": ["r", "l", "n", "s", "t", "k", "ri", "li", "ni", "si", "ti", "ki", "mmi", "lli", "$"],
    "mi": ["r", "l", "n", "s", "t", "k", "a", "e", "o", "u", "ä", "ö", "mmi", "lli", "$"],
    "mo": ["r", "l", "n", "s", "t", "k", "ri", "li", "ni", "si", "ti", "ki", "mmi", "lli", "$"],
    "mu": ["r", "l", "n", "s", "t", "k", "ri", "li", "ni", "si", "ti", "ki", "mmi", "lli", "$"],
    "my": ["r", "l", "n", "s", "t", "k", "ri", "li", "ni", "si", "ti", "ki", "mmi", "lli", "$"],
    "mä": ["r", "l", "n", "s", "t", "k", "ri", "li", "ni", "si", "ti", "ki", "mmi", "lli", "$"],
    "mö": ["r", "l", "n", "s", "t", "k", "ri", "li", "ni", "si", "ti", "ki", "mmi", "lli", "$"],

    "na": ["r", "l", "s", "t", "k", "m", "ri", "la", "sa", "ta", "ka", "ma", "nni", "$"],
    "ne": ["r", "l", "s", "t", "k", "m", "ri", "li", "si", "ti", "ki", "mi", "nni", "$"],
    "ni": ["r", "l", "s", "t", "k", "m", "a", "e", "o", "u", "ä", "ö", "nni", "$"],
    "no": ["r", "l", "s", "t", "k", "m", "ri", "li", "si", "ti", "ki", "mi", "nni", "$"],
    "nu": ["r", "l", "s", "t", "k", "m", "ri", "li", "si", "ti", "ki", "mi", "nni", "$"],
    "ny": ["r", "l", "s", "t", "k", "m", "ri", "li", "si", "ti", "ki", "mi", "nni", "$"],
    "nä": ["r", "l", "s", "t", "k", "m", "ri", "li", "si", "ti", "ki", "mi", "nni", "$"],
    "nö": ["r", "l", "s", "t", "k", "m", "ri", "li", "si", "ti", "ki", "mi", "nni", "$"],

    "ra": ["n", "l", "s", "t", "k", "m", "ni", "li", "si", "ti", "ki", "mi", "$"],
    "re": ["n", "l", "s", "t", "k", "m", "ni", "li", "si", "ti", "ki", "mi", "$"],
    "ri": ["n", "l", "s", "t", "k", "m", "a", "e", "o", "u", "ä", "ö", "$"],
    "ro": ["n", "l", "s", "t", "k", "m", "ni", "li", "si", "ti", "ki", "mi", "$"],
    "ru": ["n", "l", "s", "t", "k", "m", "ni", "li", "si", "ti", "ki", "mi", "$"],
    "ry": ["n", "l", "s", "t", "k", "m", "ni", "li", "si", "ti", "ki", "mi", "$"],
    "rä": ["n", "l", "s", "t", "k", "m", "ni", "li", "si", "ti", "ki", "mi", "$"],
    "rö": ["n", "l", "s", "t", "k", "m", "ni", "li", "si", "ti", "ki", "mi", "$"],

    "sa": ["r", "l", "n", "t", "k", "m", "ri", "li", "ni", "ti", "ki", "mi", "$"],
    "se": ["r", "l", "n", "t", "k", "m", "ri", "li", "ni", "ti", "ki", "mi", "$"],
    "si": ["r", "l", "n", "t", "k", "m", "a", "e", "o", "u", "ä", "ö", "$"],
    "so": ["r", "l", "n", "t", "k", "m", "ri", "li", "ni", "ti", "ki", "mi", "$"],
    "su": ["r", "l", "n", "t", "k", "m", "ri", "li", "ni", "ti", "ki", "mi", "$"],
    "sy": ["r", "l", "n", "t", "k", "m", "ri", "li", "ni", "ti", "ki", "mi", "$"],
    "sä": ["r", "l", "n", "t", "k", "m", "ri", "li", "ni", "ti", "ki", "mi", "$"],
    "sö": ["r", "l", "n", "t", "k", "m", "ri", "li", "ni", "ti", "ki", "mi", "$"],

    "ta": ["r", "l", "n", "s", "k", "m", "ri", "li", "ni", "si", "ki", "mi", "$"],
    "te": ["r", "l", "n", "s", "k", "m", "ri", "li", "ni", "si", "ki", "mi", "$"],
    "ti": ["r", "l", "n", "s", "k", "m", "a", "e", "o", "u", "ä", "ö", "$"],
    "to": ["r", "l", "n", "s", "k", "m", "ri", "li", "ni", "si", "ki", "mi", "$"],
    "tu": ["r", "l", "n", "s", "k", "m", "ri", "li", "ni", "si", "ki", "mi", "$"],
    "ty": ["r", "l", "n", "s", "k", "m", "ri", "li", "ni", "si", "ki", "mi", "$"],
    "tä": ["r", "l", "n", "s", "k", "m", "ri", "li", "ni", "si", "ki", "mi", "$"],
    "tö": ["r", "l", "n", "s", "k", "m", "ri", "li", "ni", "si", "ki", "mi", "$"],

    "va": ["r", "l", "n", "s", "t", "k", "m", "ri", "li", "ni", "si", "ti", "ki", "$"],
    "ve": ["r", "l", "n", "s", "t", "k", "m", "ri", "li", "ni", "si", "ti", "ki", "$"],
    "vi": ["r", "l", "n", "s", "t", "k", "m", "a", "e", "o", "u", "ä", "ö", "$"],
    "vo": ["r", "l", "n", "s", "t", "k", "m", "ri", "li", "ni", "si", "ti", "ki", "$"],
    "vu": ["r", "l", "n", "s", "t", "k", "m", "ri", "li", "ni", "si", "ti", "ki", "$"],
    "vy": ["r", "l", "n", "s", "t", "k", "m", "ri", "li", "ni", "si", "ti", "ki", "$"],
    "vä": ["r", "l", "n", "s", "t", "k", "m", "ri", "li", "ni", "si", "ti", "ki", "$"],
    "vö": ["r", "l", "n", "s", "t", "k", "m", "ri", "li", "ni", "si", "ti", "ki", "$"],

    "ha": ["r", "l", "n", "s", "t", "k", "m", "$"],
    "he": ["r", "l", "n", "s", "t", "k", "m", "$"],
    "hi": ["r", "l", "n", "s", "t", "k", "m", "$"],
    "ho": ["r", "l", "n", "s", "t", "k", "m", "$"],
    "hu": ["r", "l", "n", "s", "t", "k", "m", "$"],
    "hy": ["r", "l", "n", "s", "t", "k", "m", "$"],
    "hä": ["r", "l", "n", "s", "t", "k", "m", "$"],
    "hö": ["r", "l", "n", "s", "t", "k", "m", "$"],

    // Common Finnish name elements
    "aino": ["$"],      // only one, unique
    "aksel": ["i", "$"], 
    "ale": ["ksi", "ksandra", "$"],
    "antti": ["$"],
    "arvo": ["$"],      // value, worth
    "asko": ["$"],
    "eero": ["$"],      // Aaron
    "eino": ["$"],      // only one
    "elias": ["$"],
    "erkki": ["$"],     // Eric
    "heikki": ["$"],    // Henry
    "ilma": ["ri", "tar", "$"],  // air
    "ilmo": ["$"],
    "jalo": ["$"],      // noble
    "janne": ["$"],
    "juha": ["ni", "$"],
    "juhani": ["$"],
    "kaarlo": ["$"],    // Charles
    "kalevi": ["$"],    // hero name
    "lauri": ["$"],     // laurel
    "lemminkäi": ["nen", "$"],  // from Kalevala
    "marja": ["$"],     // berry
    "mikael": ["$"],    // Michael
    "niilo": ["$"],     // Nils
    "onni": ["$"],      // luck, happiness
    "paavo": ["$"],     // Paul
    "pentti": ["$"],
    "raimo": ["$"],
    "reino": ["$"],     // kingdom
    "sakari": ["$"],    // Zachary
    "seppo": ["$"],     // smith
    "tapio": ["$"],     // forest god
    "urho": ["$"],      // hero
    "väinö": ["$"],     // from Kalevala
    "veikko": ["$"],    // brother
    "ville": ["$"],     // William
    "yrjö": ["$"],      // George

    // Common Finnish endings
    "nen": ["$"],       // diminutive suffix
    "tar": ["$"],       // feminine suffix
    "ksi": ["$"],       // name suffix
    "ksandra": ["$"]    // Alexandra ending
  },

  meanings: {
    // Classic Finnish name elements
    "aino": "only one, unique",
    "aksel": "father of peace",
    "ale": "protector of mankind",
    "antti": "priceless one",
    "arvo": "value, worth",
    "asko": "ash tree",
    "eero": "eternal ruler",
    "eino": "only one",
    "elias": "the Lord is my God",
    "erkki": "eternal ruler",
    "heikki": "home ruler",
    "ilma": "air, atmosphere",
    "ilmo": "air, sky",
    "jalo": "noble, precious",
    "janne": "God is gracious",
    "juha": "God is gracious",
    "juhani": "God is gracious",
    "kaarlo": "free man",
    "kalevi": "hero of Kalevala",
    "lauri": "laurel tree",
    "lemminkäi": "beloved one (from Kalevala)",
    "marja": "berry, fruit",
    "mikael": "who is like God",
    "niilo": "victory of the people",
    "onni": "luck, happiness",
    "paavo": "small, humble",
    "pentti": "blessed",
    "raimo": "wise protector",
    "reino": "kingdom, realm",
    "sakari": "God remembers",
    "seppo": "smith, craftsman",
    "tapio": "forest god",
    "urho": "hero, brave one",
    "väinö": "river mouth (from Kalevala)",
    "veikko": "brother",
    "ville": "resolute protector",
    "yrjö": "farmer, earth worker",

    // Finnish linguistic elements
    "k": "hardness, strength",
    "l": "flow, liquid",
    "m": "softness, motherly",
    "n": "end, completion",
    "r": "rolling, movement",
    "s": "whisper, softness",
    "t": "sharp, decisive",
    "v": "water, flow",
    "h": "breath, spirit",
    "j": "yes, affirmation",
    "p": "protection",

    // Vowels
    "a": "open, vast",
    "e": "existence, being",
    "i": "life, vitality",
    "o": "round, complete",
    "u": "deep, internal",
    "y": "high, elevated",
    "ä": "clear, bright",
    "ö": "rounded brightness",

    // Common endings
    "nen": "little, dear one",
    "ri": "bearer, one who",
    "ti": "place, location",
    "ki": "small, diminutive",
    "ni": "belonging to",
    "si": "your, possession",
    "mi": "our, collective",
    "vi": "flowing, moving",
    "hi": "breathing, living",
    "tar": "woman, feminine",
    "ksi": "transformed into",
    "ksandra": "defender of people",

    // Double consonants (intensity)
    "kk": "strong hardness",
    "ll": "continuous flow",
    "mm": "deep softness",
    "nn": "firm ending",
    "pp": "strong protection",
    "rr": "intense movement",
    "ss": "persistent whisper",
    "tt": "sharp intensity"
  },

  options: {
    name: "Finnish",
    minLength: 4,
    maxLength: 15,
    startMarker: "^",
    endMarker: "$",
    maxLoops: 50,
    singleLetterLimiter: 3, // Allow more single letters due to Finnish structure
    clusterLimiter: 1 // Allow max 1 use of same cluster (3+ letters) per name
  }
};