import { PatternGenerationError, MaxLoopsExceededError, NoValidContinuationsError, PatternNotFoundError } from '../exceptions/PatternGenerationError';
import { getLanguageDefinition, getLanguageDisplayName, getSupportedLanguages, LanguageDefinition, SupportedLanguage } from './core';

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
 * Generate a single name using a language definition with strict length constraints and backtracking
 * @throws {PatternNotFoundError} When no starting patterns found
 * @throws {NoValidContinuationsError} When no valid continuations exist after backtracking
 * @throws {MaxLoopsExceededError} When maximum generation loops are exceeded
 */
export function generateName(language: LanguageDefinition, minLength?: number, maxLength?: number): string {
  const startingPatterns = language.patterns[language.options.startMarker] || [];
  if (startingPatterns.length === 0) {
    throw new PatternNotFoundError(language.options.startMarker, '', 0);
  }

  const actualMinLength = minLength ?? language.options.minLength;
  const actualMaxLength = maxLength ?? language.options.maxLength;
  
  // Pick a target length between min and max for better distribution
  const targetLength = Math.floor(Math.random() * (actualMaxLength - actualMinLength + 1)) + actualMinLength;

  // Backtracking state
  interface GenerationStep {
    name: string;
    currentPattern: string;
    usedChoices: Set<string>; // Track used choices at this step
    consecutiveSingleLetters: number; // Track consecutive single letter patterns
    usedClusters: Map<string, number>; // Track cluster usage counts (pattern -> count)
  }

  const generationStack: GenerationStep[] = [];
  let name = '';
  let currentPattern = language.options.startMarker;
  let loops = 0;
  const maxLoops = language.options.maxLoops * 5; // Allow more loops for stricter backtracking

  // Helper function to check if a pattern is a single letter
  const isSingleLetter = (pattern: string): boolean => {
    return pattern.length === 1 && /^[a-zA-Z]$/.test(pattern);
  };

  // Helper function to check if a pattern is a cluster (3+ letters)
  const isCluster = (pattern: string): boolean => {
    return pattern.length >= 3 && pattern !== language.options.endMarker;
  };

  // Initialize first step
  generationStack.push({
    name: '',
    currentPattern: language.options.startMarker,
    usedChoices: new Set(),
    consecutiveSingleLetters: 0,
    usedClusters: new Map()
  });

  while (loops < maxLoops) {
    loops++;

    if (generationStack.length === 0) {
      throw new NoValidContinuationsError(currentPattern, name, loops);
    }

    const currentStep = generationStack[generationStack.length - 1];
    const possibilities = language.patterns[currentStep.currentPattern] || [];

    if (possibilities.length === 0) {
      // Dead end - backtrack
      generationStack.pop();
      if (generationStack.length > 0) {
        const previousStep = generationStack[generationStack.length - 1];
        name = previousStep.name;
        currentPattern = previousStep.currentPattern;
      }
      continue;
    }

    // Strict length constraint filtering based on target length
    let filteredPossibilities = possibilities;

    // Filter based on current name length vs target length
    filteredPossibilities = possibilities.filter(pattern => {
      if (pattern === language.options.endMarker) {
        // Allow end marker if we're at least at minimum length
        // Prefer it strongly if we're at or above target
        return currentStep.name.length >= actualMinLength;
      } else {
        // Don't allow patterns if we're already at or above max length
        if (currentStep.name.length >= actualMaxLength) {
          return false;
        }
        
        // If we're at or above target, only allow patterns that have end marker as next option
        if (currentStep.name.length >= targetLength) {
          // Check if this pattern can lead to an end marker
          const nextPatternPossibilities = language.patterns[pattern] || [];
          const canEnd = nextPatternPossibilities.includes(language.options.endMarker);
          if (!canEnd) {
            return false; // Don't use patterns that can't end soon
          }
        }
        
        const lengthCheck = (currentStep.name.length + pattern.length) <= actualMaxLength;

        // Check single letter limiter if enabled
        if (language.options.singleLetterLimiter >= 0 && isSingleLetter(pattern)) {
          const singleLetterCheck = currentStep.consecutiveSingleLetters < language.options.singleLetterLimiter;
          if (!lengthCheck || !singleLetterCheck) return false;
        }

        // Check cluster limiter if enabled
        if (language.options.clusterLimiter >= 0 && isCluster(pattern)) {
          const currentClusterCount = currentStep.usedClusters.get(pattern) || 0;
          const clusterCheck = currentClusterCount < language.options.clusterLimiter;
          if (!clusterCheck) return false;
        }

        return lengthCheck;
      }
    });

    // If we have no valid possibilities, backtrack
    if (filteredPossibilities.length === 0) {
      generationStack.pop();
      if (generationStack.length > 0) {
        const previousStep = generationStack[generationStack.length - 1];
        name = previousStep.name;
        currentPattern = previousStep.currentPattern;
      }
      continue;
    }

    // Filter out already used choices at this step
    const availableChoices = filteredPossibilities.filter(p => !currentStep.usedChoices.has(p));

    if (availableChoices.length === 0) {
      // No more valid choices at this step - backtrack
      generationStack.pop();
      if (generationStack.length > 0) {
        const previousStep = generationStack[generationStack.length - 1];
        name = previousStep.name;
        currentPattern = previousStep.currentPattern;
      }
      continue;
    }

    // Choose a random pattern from available choices
    const nextPattern = availableChoices[Math.floor(Math.random() * availableChoices.length)];

    // Mark this choice as used
    currentStep.usedChoices.add(nextPattern);

    if (nextPattern === language.options.endMarker) {
      // Check if we meet minimum length requirement before ending
      if (currentStep.name.length >= actualMinLength) {
        break;
      } else {
        // This shouldn't happen due to filtering above, but safety check
        continue;
      }
    }

    // Check if adding this pattern would exceed maximum length
    if (currentStep.name.length + nextPattern.length > actualMaxLength) {
      // This shouldn't happen due to filtering above, but safety check - backtrack
      continue;
    }

    // Move forward
    name = currentStep.name + nextPattern;
    currentPattern = nextPattern;

    // Calculate new consecutive single letter count
    const newConsecutiveCount = isSingleLetter(nextPattern)
      ? currentStep.consecutiveSingleLetters + 1
      : 0;

    // Update cluster usage map
    const newUsedClusters = new Map(currentStep.usedClusters);
    if (isCluster(nextPattern)) {
      const currentCount = newUsedClusters.get(nextPattern) || 0;
      newUsedClusters.set(nextPattern, currentCount + 1);
    }

    // Add new step to stack
    generationStack.push({
      name: name,
      currentPattern: nextPattern,
      usedChoices: new Set(),
      consecutiveSingleLetters: newConsecutiveCount,
      usedClusters: newUsedClusters
    });
  }

  if (loops >= maxLoops) {
    throw new MaxLoopsExceededError(maxLoops, name, currentPattern);
  }

  // Final validation
  if (name.length < actualMinLength || name.length > actualMaxLength) {
    throw new NoValidContinuationsError(currentPattern, name, loops);
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
      if (error instanceof PatternGenerationError) {
        // Use the partial name from the error context, if available
        const partialName = error.context.generatedName || '';
        const nameWithError = partialName.length > 0
          ? `${partialName.charAt(0).toUpperCase()}${partialName.slice(1)}~`
          : `Name${i + 1}~`;
        names.push(nameWithError);
      } else {
        names.push(`Name${i + 1}~`); // Fallback for other errors
      }
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
      if (error instanceof PatternGenerationError) {
        // Use the partial name from the error context, if available
        const partialName = error.context.generatedName || '';
        const nameWithError = partialName.length > 0
          ? `${partialName.charAt(0).toUpperCase()}${partialName.slice(1)}~`
          : `Name${i + 1}~`;
        namesWithMeanings.push({
          name: nameWithError,
          meaning: `Generation failed: ${error.message}`
        });
      } else {
        namesWithMeanings.push({
          name: `Name${i + 1}~`,
          meaning: "Generation failed"
        });
      }
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
