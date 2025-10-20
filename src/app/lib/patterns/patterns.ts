//#region Language Definition and Supported Languages
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
}
//#endregion

//#region Name Generation Functions

//#endregion