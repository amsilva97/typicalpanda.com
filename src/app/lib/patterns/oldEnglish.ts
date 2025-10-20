import { 
  MaxLoopsExceededError, 
  NoValidContinuationsError, 
  PatternNotFoundError 
} from '../exceptions/PatternGenerationError';

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

// Configurable length settings
export const LENGTH_CONFIG = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 10
};

// Helper function to generate a single name using the pattern with length control
export function generateOldEnglishName(minLength: number = LENGTH_CONFIG.MIN_LENGTH, maxLength: number = LENGTH_CONFIG.MAX_LENGTH): string {
  // Choose target length between min and max
  const targetLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
  let currentPattern = "^";
  let generatedName = "";
  let loops = 0;
  const maxLoops = 30;
  
  while (loops < maxLoops) {
    loops++;
    
    // Check if pattern exists in dictionary
    if (!oldEnglishPatterns.hasOwnProperty(currentPattern)) {
      throw new PatternNotFoundError(currentPattern, generatedName, loops);
    }
    
    // Get possible continuations for current pattern
    const possibilities = oldEnglishPatterns[currentPattern];
    
    if (!possibilities || possibilities.length === 0) {
      throw new NoValidContinuationsError(currentPattern, generatedName, loops);
    }
    
    // Filter possibilities based on current length vs target
    const currentLength = generatedName.length;
    let filteredPossibilities: string[] = [];
    
    if (currentLength < targetLength) {
      // We haven't reached target length yet - re-pick any $ (skip endings)
      filteredPossibilities = possibilities.filter(p => p !== "$");
      
      // If no non-ending possibilities, we must use what we have
      if (filteredPossibilities.length === 0) {
        filteredPossibilities = possibilities;
      }
    } else {
      // We've reached or exceeded target length - automatically take next $ if available
      const hasEndOption = possibilities.includes("$");
      if (hasEndOption) {
        // Immediately exit with $
        break;
      } else {
        // No ending available, continue with any option
        filteredPossibilities = possibilities;
      }
    }
    
    // Pick a random continuation from filtered array
    const nextPattern = filteredPossibilities[Math.floor(Math.random() * filteredPossibilities.length)];
    
    // If we hit the end marker, we're done
    if (nextPattern === "$") {
      break;
    }
    
    // Add the pattern to our name and continue
    generatedName += nextPattern;
    currentPattern = nextPattern;
  }
  
  // If we hit the loop limit, throw error
  if (loops >= maxLoops) {
    throw new MaxLoopsExceededError(maxLoops, generatedName, currentPattern);
  }
  
  // Capitalize first letter
  return generatedName.charAt(0).toUpperCase() + generatedName.slice(1);
}

// Generate multiple names
export function generateOldEnglishNames(count: number = 10, minLength: number = LENGTH_CONFIG.MIN_LENGTH, maxLength: number = LENGTH_CONFIG.MAX_LENGTH): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    try {
      names.push(generateOldEnglishName(minLength, maxLength));
    } catch (error) {
      if (error instanceof MaxLoopsExceededError) {
        console.error('Pattern generation error - Max loops exceeded:', {
          errorCode: error.errorCode,
          context: error.context,
          message: error.message
        });
        names.push(error.context.generatedName + "~");
      } else if (error instanceof NoValidContinuationsError) {
        console.error('Pattern generation error - No valid continuations:', {
          errorCode: error.errorCode,
          context: error.context,
          message: error.message
        });
        names.push(error.context.generatedName + "~");
      } else if (error instanceof PatternNotFoundError) {
        console.error('Pattern generation error - Pattern not found:', {
          errorCode: error.errorCode,
          context: error.context,
          message: error.message
        });
        names.push(error.context.generatedName + "~");
      } else {
        // Unknown error, re-throw it
        console.error('Unknown pattern generation error:', error);
        throw error;
      }
    }
  }
  return names;
}