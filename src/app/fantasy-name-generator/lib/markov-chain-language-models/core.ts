
/**
 * Generic language definition interface
 */
export interface LanguageDefinition {
    patterns: { [key: string]: string[]; };
    reversePatterns: { [key: string]: string[]; };
    options: {
        name: string; // Human-readable name of the language
        startMarker: string; // Pattern to start name generation from
        endMarker: string; // Pattern to end name generation
        minNodes: number; // Minimum number of pattern nodes in a name (-1, disabled)
        maxNodes: number; // Maximum number of pattern nodes in a name (-1, disabled)
        consecutiveSingleLetterLimit: number; // Max consecutive single-letter patterns (-1, disabled)
        nonConsecutiveSingleLetterLimit: number; // Max non-consecutive single-letter patterns (-1, disabled)
        duplicateClusterLimit: number; // Max duplicate clusters (+3-letter patterns) (-1, disabled)
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

function generateReversePatterns(patterns: { [key: string]: string[]; }): { [key: string]: string[]; } {
    const reversePatterns: { [key: string]: string[]; } = {};
    for (const [key, values] of Object.entries(patterns)) {
        values.forEach(value => {
            if (!reversePatterns[value]) {
                reversePatterns[value] = [];
            }
            reversePatterns[value].push(key);
        });
    }
    return reversePatterns;
}

/**
 * Get the language definition for a supported language
 */
export function getLanguageDefinition(language: SupportedLanguage): LanguageDefinition {
    let languageDefinition: LanguageDefinition;
    switch (language) {
        case SupportedLanguage.OLD_ENGLISH:
            // Lazy load to avoid circular dependencies
            const { oldEnglish } = require('./languages/oldEnglish');
            languageDefinition = oldEnglish;
            break;
    }
    if (!languageDefinition) {
        throw new Error(`Language definition not found for language: ${language}`);
    }
    languageDefinition.reversePatterns = generateReversePatterns(languageDefinition.patterns);
    return languageDefinition;
}

/**
 * Get display name for a supported language
 */
export function getLanguageDisplayName(language: SupportedLanguage): string {
    return language; // Since the enum value is already the display name
}

