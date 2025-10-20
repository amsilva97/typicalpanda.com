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
