
/**
 * Generic language definition interface
 */
export interface LanguageDefinition {
    patterns: { [key: string]: string[]; };
    meanings: { [key: string]: string; };
    options: {
        /* Name of the language */
        name: string;

        /* Minimum length of generated names */
        minLength: number;

        /* Maximum length of generated names */
        maxLength: number;

        /* Start marker for generation */
        startMarker: string;

        /* End marker for generation */
        endMarker: string;

        /**
         * Limit on consecutive single-letter patterns (-1 = disabled)
         * e.g., if set to 2, "a-b-c" would be disallowed, but "a-bc-d" would be allowed
         */
        consecutiveSingleLetterLimit: number; // -1 = disabled, 0+ = max consecutive single letters allowed

        /**
         * Limit on duplicate multi-letter clusters (-1 = disabled)
         * e.g., if set to 1, "abc" could appear only once in a name
         */
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

