// Old English fantasy name patterns
// ^ marks the start of generation
// $ marks the end of generation
// Keys represent pattern nodes, values are arrays of possible continuations

export const oldEnglishPatterns: { [key: string]: string[] } = {
  // Starting patterns - favor complete syllables and consonant clusters
  "^": [
    "ael", "ard", "bel", "ber", "dra", "dun", "gal", "gar", "kel", "mor", 
    "tha", "thor", "wil", "wyn", "cael", "dael", "fael", "hael",
    "br", "dr", "fr", "gr", "bl", "cl", "fl", "gl", "pr", "tr", "th"
  ],
  
  // Vowel continuations - heavily favor consonants, avoid vowel chains
  "a": [
    "r", "l", "n", "d", "s", "t", "m", "th", "nd", "st", "ld", "rd", 
    "dh", "gn", "mb", "$"
  ],
  "e": [
    "l", "r", "n", "d", "s", "t", "th", "nd", "st", "ld", "rd", "mb",
    "dh", "$"
  ],
  "i": [
    "n", "r", "l", "s", "t", "d", "th", "nd", "st", "ld", "rd", "gn",
    "mb", "$"
  ],
  "o": [
    "r", "n", "l", "s", "t", "d", "th", "nd", "st", "ld", "rd", "mb",
    "dh", "$"
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
  "r": ["a", "e", "i", "o", "u", "an", "or", "$"],
  "l": ["a", "e", "i", "o", "u", "an", "or", "$"],
  "n": ["a", "e", "i", "o", "u", "$"],
  "d": ["a", "e", "i", "o", "u", "$"],
  "s": ["a", "e", "i", "o", "u", "$"],
  "t": ["a", "e", "i", "o", "u", "$"],
  "m": ["a", "e", "i", "o", "u", "$"],
  "g": ["a", "e", "i", "o", "u", "$"],
  "k": ["a", "e", "i", "o", "u", "$"],
  "p": ["a", "e", "i", "o", "u", "$"],
  "f": ["a", "e", "i", "o", "u", "$"],
  "h": ["a", "e", "i", "o", "u", "$"],
  "v": ["a", "e", "i", "o", "u", "$"],
  "w": ["a", "e", "i", "o", "u", "$"],
  
  // Common endings
  "an": ["a", "d", "s", "t", "$"],
  "or": ["a", "d", "s", "t", "n", "$"],
  
  // Starting syllables - complete units that often end
  "ael": ["d", "f", "r", "$"],
  "ard": ["a", "e", "i", "$"],
  "bel": ["a", "d", "f", "$"],
  "ber": ["a", "d", "n", "t", "$"],
  "dra": ["g", "k", "n", "$"],
  "dun": ["a", "c", "$"],
  "gal": ["a", "d", "$"],
  "gar": ["a", "d", "n", "$"],
  "kel": ["a", "d", "$"],
  "mor": ["a", "d", "g", "$"],
  "tha": ["l", "n", "r", "$"],
  "thor": ["a", "d", "n", "$"],
  "wil": ["a", "d", "$"],
  "wyn": ["a", "d", "$"],
  "cael": ["a", "d", "$"],
  "dael": ["a", "d", "$"],
  "fael": ["a", "d", "$"],
  "hael": ["a", "d", "$"],
  
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
  "tr": ["a", "e", "i", "o", "u", "$"]
};

// Helper function to generate a single name using the pattern with degrader system
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
    
    // Create a weighted array based on name length (degrader system)
    const weightedPossibilities: string[] = [];
    const nameLength = generatedName.length;
    
    for (const possibility of possibilities) {
      if (possibility === "$") {
        // Add multiple $ entries based on name length to increase termination probability
        // Short names (0-2 chars): 1x chance to end
        // Medium names (3-5 chars): 3x chance to end  
        // Longer names (6+ chars): 5x+ chance to end
        let endWeight = 1;
        if (nameLength >= 3) endWeight = 3;
        if (nameLength >= 6) endWeight = 5;
        if (nameLength >= 8) endWeight = 8;
        if (nameLength >= 10) endWeight = 12;
        
        for (let i = 0; i < endWeight; i++) {
          weightedPossibilities.push("$");
        }
      } else {
        // Regular patterns get single weight, but reduce weight for very long names
        const continueWeight = nameLength >= 10 ? 0.5 : 1;
        if (Math.random() < continueWeight) {
          weightedPossibilities.push(possibility);
        }
      }
    }
    
    // If no valid continuations after weighting, force end
    if (weightedPossibilities.length === 0) {
      break;
    }
    
    // Pick a random continuation from weighted array
    const nextPattern = weightedPossibilities[Math.floor(Math.random() * weightedPossibilities.length)];
    
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