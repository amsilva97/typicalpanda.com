//#region Language Definition and Supported Languages
/**
 * Generic language definition interface
 */
export interface LanguageDefinition {
  patterns: { [key: string]: string[]; };
  meanings: { [key: string]: string; };
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
 * Supported languages enumeration
 */
export enum SupportedLanguage {
  OLD_ENGLISH = 'Old English'
}

/**
 * Get list of supported languages
 */
export const getSupportedLanguages = (): SupportedLanguage[] => {
  return Object.values(SupportedLanguage);
}

/**
 * Get the language definition for a supported language
 */
export function getLanguageDefinition(language: SupportedLanguage): LanguageDefinition {
  switch (language) {
    case SupportedLanguage.OLD_ENGLISH:
      // Lazy load to avoid circular dependencies
      const { oldEnglish } = require('./languages/oldEnglish');
      return oldEnglish;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

/**
 * Get display name for a supported language
 */
export function getLanguageDisplayName(language: SupportedLanguage): string {
  return language; // Since the enum value is already the display name
}
//#endregion

//#region Name Generation Functions

/**
 * Interface for name analysis results
 */
export interface AnalysisResult {
  originalName: string;
  isGeneratable: boolean;
  suggestions: Array<{
    name: string;
    similarity: number;
    reason: string;
  }>;
}

/**
 * Analyze a name generically (placeholder implementation)
 */
export function analyzeNameGeneric(inputName: string): AnalysisResult {
  // Basic implementation - can be enhanced later
  return {
    originalName: inputName,
    isGeneratable: true,
    suggestions: [
      {
        name: inputName,
        similarity: 100,
        reason: "Original name is already valid"
      }
    ]
  };
}

/**
 * Generate a single name using a language definition
 */
export function generateName(language: LanguageDefinition, minLength?: number, maxLength?: number): string {
  // Simple name generation logic
  const startingPatterns = language.patterns[language.options.startMarker] || [];
  if (startingPatterns.length === 0) {
    throw new Error('No starting patterns found');
  }

  const actualMinLength = minLength ?? language.options.minLength;
  const actualMaxLength = maxLength ?? language.options.maxLength;
  const targetLength = Math.floor(Math.random() * (actualMaxLength - actualMinLength + 1)) + actualMinLength;

  let name = '';
  let currentPattern = language.options.startMarker;
  let loops = 0;
  const maxLoops = language.options.maxLoops;

  while (loops < maxLoops && name.length < targetLength) {
    loops++;
    const possibilities = language.patterns[currentPattern] || [];
    
    if (possibilities.length === 0) break;
    
    // Filter out end markers if we haven't reached minimum length
    let filteredPossibilities = possibilities;
    if (name.length < actualMinLength) {
      filteredPossibilities = possibilities.filter(p => p !== language.options.endMarker);
      if (filteredPossibilities.length === 0) {
        filteredPossibilities = possibilities;
      }
    }

    const nextPattern = filteredPossibilities[Math.floor(Math.random() * filteredPossibilities.length)];
    
    if (nextPattern === language.options.endMarker) {
      break;
    }
    
    name += nextPattern;
    currentPattern = nextPattern;
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Generate multiple names using a language definition
 */
export function generateNames(language: LanguageDefinition, count: number = 10, minLength?: number, maxLength?: number): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    try {
      names.push(generateName(language, minLength, maxLength));
    } catch (error) {
      names.push(`Name${i + 1}`); // Fallback
    }
  }
  return names;
}

/**
 * Get meaning for a generated name
 */
export function getNameMeaning(name: string, language: LanguageDefinition): string {
  const lowercaseName = name.toLowerCase();
  const meanings: string[] = [];
  const parts: string[] = [];
  let remainingName = lowercaseName;

  // Try to find the longest matching elements first
  const sortedElements = Object.keys(language.meanings).sort((a, b) => b.length - a.length);

  while (remainingName.length > 0) {
    let foundMatch = false;

    for (const element of sortedElements) {
      if (remainingName.startsWith(element)) {
        parts.push(element);
        meanings.push(language.meanings[element]);
        remainingName = remainingName.slice(element.length);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      remainingName = remainingName.slice(1);
    }
  }

  if (parts.length === 0) {
    return "";
  } else if (parts.length === 1) {
    return `${parts[0]}: ${meanings[0]}`;
  } else {
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
 * Generate names with meanings using a language definition
 */
export function generateNamesWithMeanings(language: LanguageDefinition, count: number = 10, minLength?: number, maxLength?: number): Array<{ name: string; meaning: string; }> {
  const namesWithMeanings: Array<{ name: string; meaning: string; }> = [];

  for (let i = 0; i < count; i++) {
    try {
      const name = generateName(language, minLength, maxLength);
      const meaning = getNameMeaning(name, language);
      namesWithMeanings.push({ name, meaning });
    } catch (error) {
      namesWithMeanings.push({
        name: `Name${i + 1}`,
        meaning: "generation failed"
      });
    }
  }

  return namesWithMeanings;
}

/**
 * Generate names with meanings for a specific supported language
 */
export function generateNamesWithMeaningsForLanguage(language: SupportedLanguage, count: number = 10, minLength?: number, maxLength?: number): Array<{ name: string; meaning: string; }> {
  const languageDefinition = getLanguageDefinition(language);
  return generateNamesWithMeanings(languageDefinition, count, minLength, maxLength);
}

/**
 * Check if a language is currently supported
 */
export function isLanguageSupported(language: string): language is SupportedLanguage {
  return Object.values(SupportedLanguage).includes(language as SupportedLanguage);
}

/**
 * Get language from display name
 */
export function getLanguageFromDisplayName(displayName: string): SupportedLanguage | null {
  const supportedLanguages = getSupportedLanguages();
  return supportedLanguages.find(lang => getLanguageDisplayName(lang) === displayName) || null;
}

//#endregion