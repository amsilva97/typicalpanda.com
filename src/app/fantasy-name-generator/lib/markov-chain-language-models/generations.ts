import {
  getLanguageDefinition, LanguageDefinition, SupportedLanguage,
  startMarker, endMarker
} from './core';

class NameGenerationError extends Error { }

interface GenerationStep {
  fullName: string;
  currentPattern: string;
  availableOptions: string[];
  nodeCount: number;
  consecutiveSingleLetter: number;
  nonConsecutiveSingleLetter: number;
  duplicateCluster: { [key: string]: number; };
  totalClusterLimit: number;
}

/**
 * Generate a single name using a language definition with backtracking
 */
function generateName(languageDefinition: LanguageDefinition, timeoutMs: number = 5000): string {
  const languageDefinitionPatterns = languageDefinition.patterns;
  const languageDefinitionOptions = languageDefinition.options;
  const startTime = Date.now();

  // Initialize the stack with the starting state
  const stack: GenerationStep[] = [];
  const initialPatterns = [...(languageDefinitionPatterns[startMarker] || [])];

  if (initialPatterns.length === 0) {
    throw new NameGenerationError(`No patterns found for start marker: '${startMarker}'`);
  }

  stack.push({
    fullName: '',
    currentPattern: startMarker,
    availableOptions: initialPatterns,
    nodeCount: 0,
    consecutiveSingleLetter: 0,
    nonConsecutiveSingleLetter: 0,
    duplicateCluster: {},
    totalClusterLimit: 0
  });

  // Picks a int between 'LanguageDefinition.options.minNodes' and 'LanguageDefinition.options.maxNodes'
  let forcedClusterIndex: number | null = null;
  if (languageDefinitionOptions.minNodes !== undefined && languageDefinitionOptions.maxNodes !== undefined) {
    forcedClusterIndex = Math.floor(Math.random()
      * (languageDefinitionOptions.maxNodes - languageDefinitionOptions.minNodes + 1)) + languageDefinitionOptions.minNodes;
  }

  let maxIterations = 1000; // Total iterations allowed
  while (stack.length > 0 && maxIterations > 0) {
    // Check for timeout
    if (Date.now() - startTime > timeoutMs) {
      throw new NameGenerationError(`Generation timed out after ${timeoutMs}ms`);
    }
    maxIterations--;

    // Get the current step and valid options
    const currentStep = stack[stack.length - 1];
    let availableOptions = currentStep.availableOptions;
    let validOptions: string[] = availableOptions;

    // Enforce forced cluster index
    if (languageDefinitionOptions.maxNodes !== undefined && forcedClusterIndex !== null && currentStep.nodeCount === forcedClusterIndex - 1) {
      validOptions = availableOptions.filter(option => option.length >= 3);
    }

    // Enforce minimum nodes constraint
    if (languageDefinitionOptions.minNodes !== undefined && currentStep.nodeCount < languageDefinitionOptions.minNodes)
      validOptions = availableOptions.filter(option => option !== endMarker);

    // Enforce maximum nodes constraint
    if (languageDefinitionOptions.maxNodes !== undefined && currentStep.nodeCount >= languageDefinitionOptions.maxNodes)
      validOptions = availableOptions.filter(option => option === endMarker);

    // Enforce consecutive single-letter limit
    if (languageDefinitionOptions.consecutiveSingleLetterLimit !== undefined && currentStep.consecutiveSingleLetter >= languageDefinitionOptions.consecutiveSingleLetterLimit)
      validOptions = validOptions.filter(option => option.length !== 1);

    // Enforce non-consecutive single-letter limit
    if (languageDefinitionOptions.nonConsecutiveSingleLetterLimit !== undefined && currentStep.nonConsecutiveSingleLetter >= languageDefinitionOptions.nonConsecutiveSingleLetterLimit)
      validOptions = validOptions.filter(option => option.length !== 1);

    // Enforce duplicate cluster limit
    if (languageDefinitionOptions.duplicateClusterLimit !== undefined) {
      validOptions = validOptions.filter(option => {
        const clusterCount = currentStep.duplicateCluster[option] || 0;
        return clusterCount < languageDefinitionOptions.duplicateClusterLimit!;
      });
    }

    // Enforce total cluster limit
    if (languageDefinitionOptions.totalClusterLimit !== undefined && currentStep.totalClusterLimit >= languageDefinitionOptions.totalClusterLimit) {
      validOptions = validOptions.filter(option => option.length < 3);
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
    if (nextOption === endMarker) {

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
    const newDuplicateCluster = { ...currentStep.duplicateCluster };
    if (nextOption.length >= 3)
      newDuplicateCluster[nextOption] = (newDuplicateCluster[nextOption] || 0) + 1;
    stack.push({
      fullName: newFullName,
      currentPattern: nextOption,
      availableOptions: [...nextPatterns],
      nodeCount: currentStep.nodeCount + 1,
      consecutiveSingleLetter: nextOption.length === 1 ? currentStep.consecutiveSingleLetter + 1 : 0,
      nonConsecutiveSingleLetter: currentStep.nonConsecutiveSingleLetter + (nextOption.length === 1 ? 1 : 0),
      duplicateCluster: newDuplicateCluster,
      totalClusterLimit: currentStep.totalClusterLimit + (nextOption.length >= 3 ? 1 : 0)
    });
  }

  // If we get here, we've exhausted all possibilities
  throw new NameGenerationError(`Failed to generate a valid name within timeout (${timeoutMs}ms) - all possibilities exhausted`);
}

/**
 * Generate multiple names using a language definition
 */
export function generateNames(languageDefinition: LanguageDefinition, count: number = 10, timeoutMs: number = 5000): string[] {
  const names: Set<string> = new Set();
  let failedAttempts = 0;
  const maxFailedAttempts = count * 5; // Arbitrary limit to prevent infinite loops

  while (names.size < count && failedAttempts < maxFailedAttempts) {
    try {
      const name = generateName(languageDefinition);
      if (!names.has(name)) {
        names.add(name);
      } else {
        failedAttempts++;
      }
    }
    catch (error) {
      failedAttempts++;
    }
  }

  if (names.size < count) {
    console.warn(`Only generated '${names.size}' unique names out of requested '${count}' after '${failedAttempts}' failed attempts.`);
  }

  return Array.from(names);
}

/**
 * Generate multiple names for a supported language
 */
export function generateNamesForLanguage(supportedLanguage: SupportedLanguage, count: number = 10, timeoutMs: number = 5000): string[] {
  const languageDefinition = getLanguageDefinition(supportedLanguage);
  return generateNames(languageDefinition, count, timeoutMs);
}