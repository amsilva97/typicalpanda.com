
/**
 * Generic language definition interface
 */
export interface LanguageDefinition {
    patterns: { [key: string]: string[]; };
    options: {
        name: string; // Human-readable name of the language
        minLength: number; // Minimum length of generated names
        maxLength: number; // Maximum length of generated names
        startMarker: string; // Pattern to start name generation from
        endMarker: string; // Pattern to end name generation
        consecutiveSingleLetterLimit: number; // -1 = disabled, 0+ = max consecutive single letters allowed
        nonConsecutiveSingleLetterLimit: number; // -1 = disabled, 0+ = max single letters allowed in name
        duplicateClusterLimit: number; // -1 = disabled, 0+ = max times same cluster (3+ letters) can be used
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

