import { 
  MaxLoopsExceededError, 
  NoValidContinuationsError, 
  PatternNotFoundError 
} from '../exceptions/PatternGenerationError';

/**
 * Generic language definition interface
 */
export interface LanguageDefinition {
  patterns: { [key: string]: string[] };
  meanings: { [key: string]: string };
  options: {
    name: string;
    minLength: number;
    maxLength: number;
    startMarker: string;
    endMarker: string;
    maxLoops: number;
  };
}

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
    maxLength: 10,
    startMarker: "^",
    endMarker: "$",
    maxLoops: 50
  }
};

// Helper function to deep copy the patterns object to avoid modifying the original
function deepCopyPatterns(patterns: { [key: string]: string[] }): { [key: string]: string[] } {
  const copy: { [key: string]: string[] } = {};
  for (const key in patterns) {
    copy[key] = [...patterns[key]];
  }
  return copy;
}

/**
 * Attempts to break down a generated name into meaningful components
 * and construct a semantic meaning with visible word parts
 */
function getNameMeaning(name: string, language: LanguageDefinition): string {
  const lowercaseName = name.toLowerCase();
  const meanings: string[] = [];
  const parts: string[] = [];
  let remainingName = lowercaseName;

  // Try to find the longest matching elements first
  const sortedElements = Object.keys(language.meanings).sort((a, b) => b.length - a.length);
  
  while (remainingName.length > 0) {
    let foundMatch = false;
    
    // Look for matching elements starting from the beginning of remaining name
    for (const element of sortedElements) {
      if (remainingName.startsWith(element)) {
        parts.push(element);
        meanings.push(language.meanings[element]);
        remainingName = remainingName.slice(element.length);
        foundMatch = true;
        break;
      }
    }
    
    // If no match found, skip one character and continue
    if (!foundMatch) {
      remainingName = remainingName.slice(1);
    }
  }

  // Construct meaning with parts on separate lines
  if (parts.length === 0) {
    return "";
  } else if (parts.length === 1) {
    return `${parts[0]}: ${meanings[0]}`;
  } else {
    // Format each part with prefix/suffix notation
    const formattedParts = parts.map((part, index) => {
      if (index === 0) {
        return `${part}-: ${meanings[index]}`;
      } else if (index === parts.length - 1) {
        return `-${part}: ${meanings[index]}`;
      } else {
        return `-${part}-: ${meanings[index]}`;
      }
    });
    
    return formattedParts.join('\n');
  }
}

/**
 * Extended function that returns both name and meaning
 */
function generateNameWithMeaning(name: string, language: LanguageDefinition): { name: string, meaning: string } {
  return {
    name: name,
    meaning: getNameMeaning(name, language)
  };
}

// Helper function to generate a single name using the pattern with length control and backtracking
export function generateName(language: LanguageDefinition, minLength?: number, maxLength?: number): string {
  const actualMinLength = minLength ?? language.options.minLength;
  const actualMaxLength = maxLength ?? language.options.maxLength;
  // Choose target length between min and max
  const targetLength = Math.floor(Math.random() * (actualMaxLength - actualMinLength + 1)) + actualMinLength;
  
  // Create a deep copy of patterns to track failed paths
  const workingPatterns = deepCopyPatterns(language.patterns);
  
  // Track generation state for backtracking
  interface GenerationState {
    currentPattern: string;
    generatedName: string;
    usedPath: string[];
  }
  
  const history: GenerationState[] = [];
  let currentPattern = language.options.startMarker;
  let generatedName = "";
  let loops = 0;
  const maxLoops = language.options.maxLoops;
  
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
      // We haven't reached target length yet - skip endings
      filteredPossibilities = possibilities.filter(p => p !== language.options.endMarker);
      
      // If no non-ending possibilities, we must use what we have
      if (filteredPossibilities.length === 0) {
        filteredPossibilities = possibilities;
      }
    } else {
      // We've reached or exceeded target length - automatically take next end marker if available
      const hasEndOption = possibilities.includes(language.options.endMarker);
      if (hasEndOption) {
        // Immediately exit with end marker
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
    if (nextPattern === language.options.endMarker) {
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

// Generate multiple names with a language definition
export function generateNames(language: LanguageDefinition, count: number = 10, minLength?: number, maxLength?: number): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    try {
      names.push(generateName(language, minLength, maxLength));
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

// Generate names with meanings using a language definition
export function generateNamesWithMeanings(language: LanguageDefinition, count: number = 10, minLength?: number, maxLength?: number): Array<{name: string, meaning: string}> {
  const namesWithMeanings: Array<{name: string, meaning: string}> = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const name = generateName(language, minLength, maxLength);
      namesWithMeanings.push(generateNameWithMeaning(name, language));
    } catch (error) {
      if (error instanceof MaxLoopsExceededError) {
        console.error('Pattern generation error - Max loops exceeded:', {
          errorCode: error.errorCode,
          context: error.context,
          message: error.message
        });
        namesWithMeanings.push({
          name: error.context.generatedName + "~",
          meaning: "generation incomplete"
        });
      } else if (error instanceof NoValidContinuationsError) {
        console.error('Pattern generation error - No valid continuations:', {
          errorCode: error.errorCode,
          context: error.context,
          message: error.message
        });
        namesWithMeanings.push({
          name: error.context.generatedName + "~",
          meaning: "generation incomplete"
        });
      } else if (error instanceof PatternNotFoundError) {
        console.error('Pattern generation error - Pattern not found:', {
          errorCode: error.errorCode,
          context: error.context,
          message: error.message
        });
        namesWithMeanings.push({
          name: error.context.generatedName + "~",
          meaning: "generation incomplete"
        });
      } else {
        // Unknown error, re-throw it
        console.error('Unknown pattern generation error:', error);
        throw error;
      }
    }
  }
  
  return namesWithMeanings;
}

// Old English specific convenience functions
export function generateOldEnglishName(minLength?: number, maxLength?: number): string {
  return generateName(oldEnglish, minLength, maxLength);
}

export function generateOldEnglishNames(count: number = 10, minLength?: number, maxLength?: number): string[] {
  return generateNames(oldEnglish, count, minLength, maxLength);
}

export function generateOldEnglishNamesWithMeanings(count: number = 10, minLength?: number, maxLength?: number): Array<{name: string, meaning: string}> {
  return generateNamesWithMeanings(oldEnglish, count, minLength, maxLength);
}

// Helper function to get meaning for an existing name
export function getOldEnglishNameMeaning(name: string): string {
  return getNameMeaning(name, oldEnglish);
}