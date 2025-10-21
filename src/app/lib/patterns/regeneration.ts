import { getLanguageDefinition } from './core';
import { SupportedLanguage } from './core';

/**
 * Name variation with its type and description
 */
export interface NameVariation {
    name: string;
    type: 'remove' | 'add' | 'replace' | 'original';
    description: string;
    segments: string[];
    isValid: boolean;
}

/**
 * Check if a sequence of segments creates a valid name in the language
 */
function isValidSegmentSequence(segments: string[], language: SupportedLanguage): boolean {
    const patternDefinition = getLanguageDefinition(language);
    const patterns = patternDefinition.patterns;
    
    // Check if all segments exist in the patterns
    return segments.every(segment => patterns[segment] && patterns[segment].length > 0);
}

/**
 * Get random patterns from the language definition
 */
function getRandomPatterns(language: SupportedLanguage, count: number = 3): string[] {
    const patternDefinition = getLanguageDefinition(language);
    const allPatterns = Object.keys(patternDefinition.patterns).filter(
        pattern => pattern !== patternDefinition.options.startMarker && 
                  pattern !== patternDefinition.options.endMarker
    );
    
    const shuffled = [...allPatterns].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * Generate variations of a name based on its segment analysis
 */
export function generateNameVariations(segments: string[], language: SupportedLanguage, originalName: string): NameVariation[] {
    const variations: NameVariation[] = [];
    
    // Add original
    variations.push({
        name: originalName,
        type: 'original',
        description: 'Original name',
        segments: segments,
        isValid: true
    });
    
    // Remove segments (if more than 1 segment)
    if (segments.length > 1) {
        for (let i = 0; i < segments.length; i++) {
            const newSegments = segments.filter((_, index) => index !== i);
            const newName = newSegments.join('');
            const isValid = isValidSegmentSequence(newSegments, language);
            
            variations.push({
                name: newName.charAt(0).toUpperCase() + newName.slice(1),
                type: 'remove',
                description: `Removed segment "${segments[i]}"`,
                segments: newSegments,
                isValid: isValid
            });
        }
    }
    
    // Add segments between existing ones
    const randomPatterns = getRandomPatterns(language, 5);
    for (let i = 0; i <= segments.length; i++) {
        for (const pattern of randomPatterns.slice(0, 2)) { // Limit to 2 patterns per position
            const newSegments = [...segments];
            newSegments.splice(i, 0, pattern);
            const newName = newSegments.join('');
            const isValid = isValidSegmentSequence(newSegments, language);
            
            const position = i === 0 ? 'beginning' : i === segments.length ? 'end' : `position ${i + 1}`;
            variations.push({
                name: newName.charAt(0).toUpperCase() + newName.slice(1),
                type: 'add',
                description: `Added "${pattern}" at ${position}`,
                segments: newSegments,
                isValid: isValid
            });
        }
    }
    
    // Replace segments
    for (let i = 0; i < segments.length; i++) {
        for (const pattern of randomPatterns.slice(0, 2)) { // Limit to 2 patterns per segment
            if (pattern !== segments[i]) {
                const newSegments = [...segments];
                newSegments[i] = pattern;
                const newName = newSegments.join('');
                const isValid = isValidSegmentSequence(newSegments, language);
                
                variations.push({
                    name: newName.charAt(0).toUpperCase() + newName.slice(1),
                    type: 'replace',
                    description: `Replaced "${segments[i]}" with "${pattern}"`,
                    segments: newSegments,
                    isValid: isValid
                });
            }
        }
    }
    
    // Remove duplicates and limit results
    const seen = new Set<string>();
    const uniqueVariations = variations.filter(variation => {
        if (seen.has(variation.name.toLowerCase())) {
            return false;
        }
        seen.add(variation.name.toLowerCase());
        return true;
    });
    
    // Sort by validity and type (original first, then valid variations, then invalid)
    return uniqueVariations.sort((a, b) => {
        if (a.type === 'original') return -1;
        if (b.type === 'original') return 1;
        if (a.isValid && !b.isValid) return -1;
        if (!a.isValid && b.isValid) return 1;
        return 0;
    }).slice(0, 15); // Limit to 15 variations total
}

/**
 * Generate multiple sets of variations for different segment paths
 */
export function generateVariationsForPaths(paths: string[][], language: SupportedLanguage, originalName: string): NameVariation[][] {
    return paths.map(segments => generateNameVariations(segments, language, originalName));
}