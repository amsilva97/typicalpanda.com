import { getLanguageDefinition, LanguageDefinition, SupportedLanguage } from './core';

class PatternError extends Error { }

interface GenerationStep {
  fullName: string;
  currentPattern: string;
  availableOptions: string[];
  consecutiveSingleLetter: number;
  nonConsecutiveSingleLetterLimit: number;
  duplicateClusterLimit: { [key: string]: number; };
}

/**
 * Generate a single name using a language definition with backtracking
 */
export function generateName(languageDefinition: LanguageDefinition, timeoutMs: number = 5000): string {
  const languageDefinitionPatterns = languageDefinition.patterns;
  const languageDefinitionOptions = languageDefinition.options;
  const startTime = Date.now();
  const targetLength = Math.floor(Math.random() * (languageDefinitionOptions.maxLength - languageDefinitionOptions.minLength + 1)) + languageDefinitionOptions.minLength;

  // Initialize the stack with the starting state
  const stack: GenerationStep[] = [];
  const initialPatterns = [...(languageDefinitionPatterns[languageDefinitionOptions.startMarker] || [])];

  if (initialPatterns.length === 0) {
    throw new PatternError(`No patterns found for start marker: '${languageDefinitionOptions.startMarker}'`);
  }

  stack.push({
    fullName: '',
    currentPattern: languageDefinitionOptions.startMarker,
    availableOptions: initialPatterns,
    consecutiveSingleLetter: 0,
    nonConsecutiveSingleLetterLimit: languageDefinitionOptions.nonConsecutiveSingleLetterLimit,
    duplicateClusterLimit: {}
  });

  let maxIterations = 1000; // Total iterations allowed
  while (stack.length > 0 && maxIterations > 0) {
    // Check for timeout
    if (Date.now() - startTime > timeoutMs) {
      throw new PatternError(`Generation timed out after ${timeoutMs}ms`);
    }
    maxIterations--;

    // Get the current step and valid options
    const currentStep = stack[stack.length - 1];
    let availableOptions = currentStep.availableOptions;
    let validOptions: string[] = [];

    // Get valid options based on length constraints
    if (currentStep.fullName.length < targetLength) {
      // still need to add more pieces, don't allow end marker yet
      validOptions = availableOptions.filter(option => option !== languageDefinitionOptions.endMarker);
    } else {
      // reached or exceeded target length, allow ending
      validOptions = availableOptions.filter(option => option === languageDefinitionOptions.endMarker);
    }

    // If there are no valid options, backtrack
    if (validOptions.length === 0) {
      // No valid options, backtrack
      stack.pop();
      continue;
    }

    // Pick a random valid option
    const nextOptionIndex = Math.floor(Math.random() * validOptions.length);
    const nextOption = validOptions[nextOptionIndex];

    // Remove the chosen option from the current step's available options
    const originalIndex = currentStep.availableOptions.indexOf(nextOption);
    currentStep.availableOptions.splice(originalIndex, 1);

    // Check for end marker
    if (nextOption === languageDefinitionOptions.endMarker) {

      //lets print out each step as a list to console
      const debug_segments: string[] = [];
      for (const step of stack) {
        debug_segments.push(step.currentPattern);
      }

      return currentStep.fullName;
    }

    // Check if adding this option would make the name too long
    const newFullName = currentStep.fullName + nextOption;
    if (newFullName.length > languageDefinitionOptions.maxLength) {
      // This option would make the name too long, skip it
      continue;
    }

    // Before pushing new step, check for dead ends
    const nextPatterns = languageDefinitionPatterns[nextOption] || [];
    if (nextPatterns.length === 0) {
      // Dead end - don't push, continue to try next option
      continue;
    }

    // Build the new full name
    stack.push({
      fullName: newFullName,
      currentPattern: nextOption,
      availableOptions: [...nextPatterns],
      consecutiveSingleLetter: 0,
      nonConsecutiveSingleLetterLimit: 0,
      duplicateClusterLimit: {}
    });
  }

  // If we get here, we've exhausted all possibilities
  throw new PatternError(`Failed to generate a valid name within timeout (${timeoutMs}ms) - all possibilities exhausted`);
}

/**
 * Generate multiple names using a language definition
 */
export function generateNames(languageDefinition: LanguageDefinition, count: number = 10, timeoutMs: number = 5000): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(generateName(languageDefinition, timeoutMs));
  }
  return names;
}

/**
 * Generate multiple names for a supported language
 */
export function generateNamesForLanguage(supportedLanguage: SupportedLanguage, count: number = 10, timeoutMs: number = 5000): string[] {
  const languageDefinition = getLanguageDefinition(supportedLanguage);
  return generateNames(languageDefinition, count, timeoutMs);
}