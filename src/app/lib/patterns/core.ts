
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

        // Limits how many consecutive single-letter patterns can appear
        consecutiveSingleLetterLimit: number; // -1 = disabled, 0+ = max consecutive single letters allowed

        // Limits how many times the same multi-letter cluster can appear
        duplicateClusterLimit: number; // -1 = disabled, 0+ = max times same cluster (2+ letters) can be used
        maxVowelChain: number; // -1 = disabled, 0+ = max consecutive vowels allowed
        maxConsonantChain: number; // -1 = disabled, 0+ = max consecutive consonants allowed
        forbiddenPatterns: string[]; // Patterns that should never be used
        requiredPatterns: string[]; // Patterns that must appear at least once (empty = no requirement)
        minPatternLength: number; // -1 = disabled, 0+ = minimum length for non-single-letter patterns
        maxPatternLength: number; // -1 = disabled, 0+ = maximum length for any pattern
        vowelRatio: number; // -1 = disabled, 0.0-1.0 = target ratio of vowels to total letters
        doubleLetterLimit: number; // -1 = disabled, 0+ = max consecutive identical letters (aa, bb, etc.)
        endingPatternWeight: number; // 0.0-1.0 = probability bias toward ending patterns when near target length
        preferredStartPatterns: string[]; // Patterns to favor at the beginning (empty = no preference)
        preferredEndPatterns: string[]; // Patterns to favor at the end (empty = no preference)
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
};

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

