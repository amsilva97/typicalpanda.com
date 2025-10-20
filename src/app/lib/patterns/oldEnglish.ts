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
  "tr": ["a", "e", "i", "o", "u", "$"],
  
  // Classic Old English ending clusters
  "ric": ["$"],        // -ric (ruler, king)
  "wald": ["$"],       // -wald (rule, power)
  "mund": ["$"],       // -mund (protection)
  "helm": ["$"],       // -helm (helmet, protection)
  "bert": ["$"],       // -bert (bright)
  "fred": ["$"],       // -fred (peace)
  "wulf": ["$"],       // -wulf (wolf)
  "eth": ["$"],        // -eth (common ending)
  "hed": ["$"],        // -hed (head, chief)
  "win": ["$"],        // -win (friend)
  "red": ["$"],        // -red (counsel)
  "grim": ["$"],       // -grim (mask, fierce)
  "bald": ["$"],       // -bald (bold)
  "stan": ["$"]        // -stan (stone)
};

// Configurable length settings
export const LENGTH_CONFIG = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 10
};

// Helper function to deep copy the patterns object to avoid modifying the original
function deepCopyPatterns(patterns: { [key: string]: string[] }): { [key: string]: string[] } {
  const copy: { [key: string]: string[] } = {};
  for (const key in patterns) {
    copy[key] = [...patterns[key]];
  }
  return copy;
}

// Helper function to generate a single name using the pattern with length control and backtracking
export function generateOldEnglishName(minLength: number = LENGTH_CONFIG.MIN_LENGTH, maxLength: number = LENGTH_CONFIG.MAX_LENGTH): string {
  // Choose target length between min and max
  const targetLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
  // Create a deep copy of patterns to track failed paths
  const workingPatterns = deepCopyPatterns(oldEnglishPatterns);
  
  // Track generation state for backtracking
  interface GenerationState {
    currentPattern: string;
    generatedName: string;
    usedPath: string[];
  }
  
  const history: GenerationState[] = [];
  let currentPattern = "^";
  let generatedName = "";
  let loops = 0;
  const maxLoops = 50; // Increased for backtracking
  
  while (loops < maxLoops) {
    loops++;
    
    // Save current state to history for potential backtracking
    history.push({
      currentPattern,
      generatedName,
      usedPath: [currentPattern]
    });
    
    // Check if pattern exists in working patterns
    if (!workingPatterns.hasOwnProperty(currentPattern)) {
      // Pattern not found - backtrack
      if (history.length <= 1) {
        // Can't backtrack further, this is a fundamental pattern issue
        throw new PatternNotFoundError(currentPattern, generatedName, loops);
      }
      
      // Remove the failed choice from the previous state
      const currentState = history.pop()!; // Remove current state
      const previousState = history[history.length - 1]; // Get previous state
      
      // Remove the failed pattern from previous state's possibilities
      if (workingPatterns[previousState.currentPattern]) {
        workingPatterns[previousState.currentPattern] = workingPatterns[previousState.currentPattern].filter(
          p => p !== currentPattern
        );
      }
      
      // Restore to previous state
      currentPattern = previousState.currentPattern;
      generatedName = previousState.generatedName;
      
      continue; // Try again from previous state
    }
    
    // Get possible continuations for current pattern
    const possibilities = workingPatterns[currentPattern];
    
    if (!possibilities || possibilities.length === 0) {
      // No valid continuations - backtrack
      if (history.length <= 1) {
        throw new NoValidContinuationsError(currentPattern, generatedName, loops);
      }
      
      // Remove current state and go back
      const currentState = history.pop()!;
      const previousState = history[history.length - 1];
      
      // Mark this pattern as exhausted in the previous state
      if (workingPatterns[previousState.currentPattern]) {
        workingPatterns[previousState.currentPattern] = workingPatterns[previousState.currentPattern].filter(
          p => p !== currentPattern
        );
      }
      
      // Restore to previous state
      currentPattern = previousState.currentPattern;
      generatedName = previousState.generatedName;
      
      continue;
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
    
    // If no valid filtered possibilities, backtrack
    if (filteredPossibilities.length === 0) {
      if (history.length <= 1) {
        throw new NoValidContinuationsError(currentPattern, generatedName, loops);
      }
      
      const currentState = history.pop()!;
      const previousState = history[history.length - 1];
      
      // Mark this path as failed
      if (workingPatterns[previousState.currentPattern]) {
        workingPatterns[previousState.currentPattern] = workingPatterns[previousState.currentPattern].filter(
          p => p !== currentPattern
        );
      }
      
      currentPattern = previousState.currentPattern;
      generatedName = previousState.generatedName;
      
      continue;
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