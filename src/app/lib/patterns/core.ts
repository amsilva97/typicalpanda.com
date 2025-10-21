
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
        singleLetterLimiter: number; // -1 = disabled, 0+ = max consecutive single letters allowed
        clusterLimiter: number; // -1 = disabled, 0+ = max times same cluster (3+ letters) can be used
    };
}

/**
 * Supported languages enumeration
 */
export enum SupportedLanguage {
    OLD_ENGLISH = 'Old English',
    WELSH = 'Welsh'
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
        case SupportedLanguage.WELSH:
            // Lazy load to avoid circular dependencies
            const { welsh } = require('./languages/welsh');
            return welsh;
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

