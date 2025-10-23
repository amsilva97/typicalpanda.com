import { getLanguageDefinition, LanguageDefinition, SupportedLanguage } from './core';

class PatternError extends Error { }

interface GenerationStep {
  fullName: string;
  currentPattern: string;
  availableOptions: string[];
}

/**
 * Generate a single name using a language definition with backtracking
 */
export function generateName(languageDefinition: LanguageDefinition, timeoutMs: number = 5000): string {
  const languageDefinitionPatterns = languageDefinition.patterns;
  const languageDefinitionOptions = languageDefinition.options;
  const startTime = Date.now();

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
    let validOptions: string[] = availableOptions.filter(option => true);

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

    // Before pushing new step, check for dead ends
    const nextPatterns = languageDefinitionPatterns[nextOption] || [];
    if (nextPatterns.length === 0) {
      // Dead end - don't push, continue to try next option
      continue;
    }

    // Build the new full name
    const newFullName = currentStep.fullName + nextOption;
    stack.push({
      fullName: newFullName,
      currentPattern: nextOption,
      availableOptions: [...nextPatterns],
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