// Old English fantasy name patterns
// ^ marks the start of generation
// $ marks the end of generation
// Keys represent pattern nodes, values are arrays of possible continuations

export const oldEnglishPatterns: { [key: string]: string[] } = {
  // Starting patterns
  "^": [
    "ae", "al", "ar", "el", "th", "ga", "br", "dr", "fr", "gr",
    "bl", "cl", "fl", "gl", "kr", "pr", "tr", "st", "sk", "sp",
    "a", "e", "i", "o", "u", "y"
  ],
  
  // Vowel continuations
  "a": [
    "r", "l", "n", "th", "nd", "st", "mb", "dh", "gn", "ld",
    "e", "i", "o", "u", "$"
  ],
  "e": [
    "l", "r", "n", "th", "nd", "st", "mb", "ld", "rd", "dh",
    "a", "i", "o", "u", "$"
  ],
  "i": [
    "n", "r", "l", "th", "nd", "st", "mb", "ld", "rd", "gn",
    "a", "e", "o", "u", "$"
  ],
  "o": [
    "r", "n", "l", "th", "nd", "st", "mb", "ld", "rd", "dh",
    "a", "e", "i", "u", "$"
  ],
  "u": [
    "l", "r", "n", "th", "nd", "st", "mb", "ld", "rd", "gn",
    "a", "e", "i", "o", "$"
  ],
  "y": [
    "r", "n", "l", "th", "nd", "st", "mb", "ld", "rd", "dh",
    "a", "e", "i", "o", "u", "$"
  ],
  
  // Consonant clusters and continuations
  "th": [
    "a", "e", "i", "o", "u", "y", "r", "an", "el", "or", "$"
  ],
  "nd": [
    "a", "e", "i", "o", "u", "y", "r", "an", "el", "or", "$"
  ],
  "st": [
    "a", "e", "i", "o", "u", "y", "r", "an", "el", "or", "$"
  ],
  "ld": [
    "a", "e", "i", "o", "u", "y", "r", "an", "el", "or", "$"
  ],
  "rd": [
    "a", "e", "i", "o", "u", "y", "an", "el", "or", "$"
  ],
  "mb": [
    "a", "e", "i", "o", "u", "y", "r", "an", "el", "or", "$"
  ],
  "gn": [
    "a", "e", "i", "o", "u", "y", "r", "an", "el", "or", "$"
  ],
  "dh": [
    "a", "e", "i", "o", "u", "y", "r", "an", "el", "or", "$"
  ],
  
  // Single consonants
  "r": [
    "a", "e", "i", "o", "u", "y", "th", "an", "el", "or", "ic", "ed", "$"
  ],
  "l": [
    "a", "e", "i", "o", "u", "y", "th", "an", "el", "or", "ic", "ed", "$"
  ],
  "n": [
    "a", "e", "i", "o", "u", "y", "th", "d", "g", "or", "el", "$"
  ],
  "d": [
    "a", "e", "i", "o", "u", "y", "r", "h", "or", "el", "$"
  ],
  "g": [
    "a", "e", "i", "o", "u", "y", "r", "h", "or", "el", "$"
  ],
  "b": [
    "a", "e", "i", "o", "u", "y", "r", "l", "or", "el", "$"
  ],
  "c": [
    "a", "e", "i", "o", "u", "y", "h", "k", "or", "el", "$"
  ],
  "f": [
    "a", "e", "i", "o", "u", "y", "r", "l", "or", "el", "$"
  ],
  "h": [
    "a", "e", "i", "o", "u", "y", "or", "el", "$"
  ],
  "k": [
    "a", "e", "i", "o", "u", "y", "r", "or", "el", "$"
  ],
  "m": [
    "a", "e", "i", "o", "u", "y", "or", "el", "$"
  ],
  "p": [
    "a", "e", "i", "o", "u", "y", "h", "r", "or", "el", "$"
  ],
  "s": [
    "a", "e", "i", "o", "u", "y", "h", "t", "or", "el", "$"
  ],
  "t": [
    "a", "e", "i", "o", "u", "y", "h", "r", "or", "el", "$"
  ],
  "v": [
    "a", "e", "i", "o", "u", "y", "or", "el", "$"
  ],
  "w": [
    "a", "e", "i", "o", "u", "y", "or", "el", "$"
  ],
  
  // Common endings
  "an": [
    "a", "e", "d", "s", "t", "$"
  ],
  "el": [
    "a", "d", "s", "t", "f", "$"
  ],
  "or": [
    "a", "e", "d", "s", "t", "n", "$"
  ],
  "ic": [
    "a", "e", "k", "s", "$"
  ],
  "ed": [
    "a", "e", "s", "t", "$"
  ],
  
  // Starting clusters
  "ae": [
    "l", "r", "n", "d", "th", "$"
  ],
  "al": [
    "a", "e", "i", "d", "f", "r", "ic", "$"
  ],
  "ar": [
    "a", "e", "i", "n", "d", "th", "ic", "$"
  ],
  "br": [
    "a", "e", "i", "o", "u", "y", "an", "$"
  ],
  "dr": [
    "a", "e", "i", "o", "u", "y", "an", "$"
  ],
  "fr": [
    "a", "e", "i", "o", "u", "y", "an", "$"
  ],
  "gr": [
    "a", "e", "i", "o", "u", "y", "an", "$"
  ],
  "bl": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "cl": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "fl": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "gl": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "kr": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "pr": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "tr": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "sk": [
    "a", "e", "i", "o", "u", "y", "$"
  ],
  "sp": [
    "a", "e", "i", "o", "u", "y", "$"
  ]
};

// Helper function to generate a single name using the pattern
export function generateOldEnglishName(): string {
  let currentPattern = "^";
  let generatedName = "";
  let loops = 0;
  const maxLoops = 20;
  
  while (loops < maxLoops) {
    loops++;
    
    // Get possible continuations for current pattern
    const possibilities = oldEnglishPatterns[currentPattern];
    
    if (!possibilities || possibilities.length === 0) {
      // No valid continuations, mark as failed and break
      generatedName += "~";
      break;
    }
    
    // Pick a random continuation
    const nextPattern = possibilities[Math.floor(Math.random() * possibilities.length)];
    
    // If we hit the end marker, we're done
    if (nextPattern === "$") {
      break;
    }
    
    // Add the pattern to our name and continue
    generatedName += nextPattern;
    currentPattern = nextPattern;
  }
  
  // If we hit the loop limit, mark as failed
  if (loops >= maxLoops && !generatedName.endsWith("~")) {
    generatedName += "~";
  }
  
  // Capitalize first letter
  return generatedName.charAt(0).toUpperCase() + generatedName.slice(1);
}

// Generate multiple names
export function generateOldEnglishNames(count: number = 10): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(generateOldEnglishName());
  }
  return names;
}