/**
 * Custom exception classes for pattern-based name generation
 */

export class PatternGenerationError extends Error {
  public readonly errorCode: string;
  public readonly context: Record<string, any>;

  constructor(message: string, errorCode: string, context: Record<string, any> = {}) {
    super(message);
    this.name = 'PatternGenerationError';
    this.errorCode = errorCode;
    this.context = context;
  }
}

export class MaxLoopsExceededError extends PatternGenerationError {
  constructor(loops: number, generatedName: string, currentPattern: string) {
    super(
      `Maximum generation loops (${loops}) exceeded`,
      'MAX_LOOPS_EXCEEDED',
      { loops, generatedName, currentPattern }
    );
    this.name = 'MaxLoopsExceededError';
  }
}

export class NoValidContinuationsError extends PatternGenerationError {
  constructor(currentPattern: string, generatedName: string, loops: number) {
    super(
      `No valid continuations found for pattern: ${currentPattern}`,
      'NO_VALID_CONTINUATIONS',
      { currentPattern, generatedName, loops }
    );
    this.name = 'NoValidContinuationsError';
  }
}

export class PatternNotFoundError extends PatternGenerationError {
  constructor(pattern: string, generatedName: string, loops: number) {
    super(
      `Pattern not found in dictionary: ${pattern}`,
      'PATTERN_NOT_FOUND',
      { pattern, generatedName, loops }
    );
    this.name = 'PatternNotFoundError';
  }
}