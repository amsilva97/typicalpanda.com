
export const startMarker = '^';
export const endMarker = '$';

export interface LanguageDefinitionOptions {
    name: string; // Human-readable name of the language
    minNodes?: number; // Minimum number of pattern nodes in a name
    maxNodes?: number; // Maximum number of pattern nodes in a name
    consecutiveSingleLetterLimit?: number; // Max consecutive single-letter patterns
    nonConsecutiveSingleLetterLimit?: number; // Max non-consecutive single-letter patterns
    duplicateClusterLimit?: number; // Max duplicate clusters (+3-letter patterns)
    totalClusterLimit?: number; // Max total clusters (+3-letter patterns)
}

/**
 * Generic language definition interface
 */
export interface LanguageDefinition {
    patterns: { [key: string]: string[]; };
    options: LanguageDefinitionOptions;
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

