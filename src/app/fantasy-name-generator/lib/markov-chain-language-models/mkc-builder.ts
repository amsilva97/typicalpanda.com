import { LanguageDefinition } from "./core";

// Configuration constants
const DEFAULT_MAX_NODE_LENGTH = 5;
const DEFAULT_OUTLIER_THRESHOLD = 0.01; // 1%
const CONSONANTS_PATTERN = /[bcdfghjklmnpqrstvwxz]{2,}/i;
const REPEATED_LETTER_PATTERN = /(.)\1/;
const CLUSTER_MIN_LENGTH = 3;

// Language-agnostic quality constants
const MIN_NAME_LENGTH = 4; // Increased to prevent short fragments like "eri", "rin"
const MAX_PHONEME_REPETITION = 3; // Limit repeated sounds like "mereradoc"
const IMPROVED_LOOKBACK_THRESHOLD = 0.8; // Stricter than 70%
const VOWEL_PATTERN = /[aeiouAEIOU]/;
const MAX_ENDING_DOMINANCE = 0.2; // Reduce ending pattern dominance to 20%

/**
 * Create an empty language definition with undefined options (all disabled by default)
 */
export function createEmptyLanguageDefinition(): LanguageDefinition {
    return {
        patterns: {},
        options: {
            name: 'Custom Markov Chain',
            minNodes: undefined,
            maxNodes: undefined,
            consecutiveSingleLetterLimit: undefined,
            nonConsecutiveSingleLetterLimit: undefined,
            duplicateClusterLimit: undefined,
            totalClusterLimit: undefined
        }
    };
}

/**
 * Generates all possible ways to segment a word into substrings.
 * Uses bit manipulation to generate 2^(n-1) different groupings,
 * where n is the word length. Each bit position represents a potential
 * split point between characters.
 * 
 * @param word - The word to segment
 * @returns Array of all possible segmentations, each as an array of substrings
 * @example allGroupings("cat") returns [["cat"], ["c", "at"], ["ca", "t"], ["c", "a", "t"]]
 */
function allGroupings(word: string): string[][] {
    const n = word.length;
    const results: string[][] = [];

    // Generate all possible splits using bit manipulation
    // Each bit represents a split point between characters
    for (let mask = 0; mask < (1 << (n - 1)); mask++) {
        const grouping: string[] = [];
        let current = word[0];
        
        for (let i = 0; i < n - 1; i++) {
            if (mask & (1 << i)) {
                // Split at this position
                grouping.push(current);
                current = word[i + 1];
            } else {
                // Continue current segment
                current += word[i + 1];
            }
        }
        grouping.push(current);
        results.push(grouping);
    }

    return results;
}

/**
 * Filters out name segmentations that don't meet the specified constraints.
 * Applies both user-configurable options and hard-coded quality filters
 * to ensure generated names follow linguistic patterns.
 * 
 * @param nameSegments - Array of name segmentations to filter
 * @param languageDefinition - Contains filtering options and constraints
 * @returns Filtered array of valid name segmentations
 */
function removeInvalidPatterns(nameSegments: string[][], languageDefinition: LanguageDefinition): string[][] {
    const options = languageDefinition.options;

    // Enforce minimum nodes constraint
    if (options.minNodes !== undefined) {
        const minNodes = options.minNodes;
        nameSegments = nameSegments.filter(segments => segments.length >= minNodes);
    }

    // Enforce maximum nodes constraint
    if (options.maxNodes !== undefined) {
        const maxNodes = options.maxNodes;
        nameSegments = nameSegments.filter(segments => segments.length <= maxNodes);
    }

    // Enforce non-consecutive single letter limit
    if (options.nonConsecutiveSingleLetterLimit !== undefined) {
        const limit = options.nonConsecutiveSingleLetterLimit;
        nameSegments = nameSegments.filter(segments => {
            const singleLetterCount = segments.filter(s => s.length === 1).length;
            return singleLetterCount <= limit;
        })
    }

    // Enforce consecutive single letter limit
    if (options.consecutiveSingleLetterLimit !== undefined) {
        const limit = options.consecutiveSingleLetterLimit;
        nameSegments = nameSegments.filter(segments => {
            let maxConsecutive = 0;
            let currentConsecutive = 0;
            segments.forEach(s => {
                if (s.length === 1) {
                    currentConsecutive++;
                    if (currentConsecutive > maxConsecutive) {
                        maxConsecutive = currentConsecutive;
                    }
                } else {
                    currentConsecutive = 0;
                }
            });
            return maxConsecutive <= limit;
        })
    }

    // Enforce total cluster limit
    if (options.totalClusterLimit !== undefined) {
        const limit = options.totalClusterLimit;
        nameSegments = nameSegments.filter(segments => {
            const clusterCount = segments.filter(s => s.length >= CLUSTER_MIN_LENGTH).length;
            return clusterCount <= limit;
        })
    }

    // Enforce duplicate cluster limit
    if (options.duplicateClusterLimit !== undefined) {
        const limit = options.duplicateClusterLimit;
        nameSegments = nameSegments.filter(segments => {
            const clusterCounts: { [key: string]: number } = {};
            for (const s of segments) {
                if (s.length >= CLUSTER_MIN_LENGTH) {
                    clusterCounts[s] = (clusterCounts[s] || 0) + 1;
                    if (clusterCounts[s] > limit) {
                        return false;
                    }
                }
            }
            return true;
        })
    }

    return nameSegments
}

/**
 * Build a Markov chain from a list of names by analyzing all possible
 * segmentations of each name and creating transition patterns between segments.
 * 
 * @param names - Array of name strings to analyze
 * @param languageDefinition - Language definition to populate with patterns
 * @returns The updated language definition with generated patterns
 * @throws Error if inputs are invalid
 */
export function buildChain(names: string[], languageDefinition: LanguageDefinition): LanguageDefinition {
    // Input validation
    if (!Array.isArray(names)) {
        throw new Error('Names must be an array');
    }
    
    if (!languageDefinition || typeof languageDefinition !== 'object') {
        throw new Error('Language definition must be a valid object');
    }
    
    if (!languageDefinition.options || typeof languageDefinition.options !== 'object') {
        throw new Error('Language definition must have valid options object');
    }
    
    const validNames = names.filter(name => 
        typeof name === 'string' && name.trim().length > 0
    );
    
    if (validNames.length === 0) {
        throw new Error('At least one valid non-empty name is required');
    }

    // Reset patterns
    languageDefinition.patterns = {};

    let nameGroupingList: string[][][] = [];

    // Process each valid name to get valid groupings
    validNames.forEach(name => {
        const cleanName = name.toLowerCase().trim();
        let groupings = allGroupings(cleanName);
        groupings = removeInvalidPatterns(groupings, languageDefinition);
        nameGroupingList.push(groupings);
    });

    // Build patterns from names
    nameGroupingList.forEach(groupings => {
        // Initialize pattern arrays if they don't exist
        if (!languageDefinition.patterns['^']) {
            languageDefinition.patterns['^'] = [];
        }

        // Process each possible grouping of the name
        groupings.forEach(grouping => {
            if (grouping.length === 0) return;

            // Add start pattern
            languageDefinition.patterns['^'].push(grouping[0]);

            // Add transitions between segments
            for (let i = 0; i < grouping.length - 1; i++) {
                const key = grouping[i];
                const next = grouping[i + 1];
                if (!languageDefinition.patterns[key]) {
                    languageDefinition.patterns[key] = [];
                }
                languageDefinition.patterns[key].push(next);
            }

            // Add end pattern
            const lastSegment = grouping[grouping.length - 1];
            if (!languageDefinition.patterns[lastSegment]) {
                languageDefinition.patterns[lastSegment] = [];
            }
            languageDefinition.patterns[lastSegment].push('$');
        });
    });

    // Remove duplicates in patterns
    for (const key in languageDefinition.patterns) {
        languageDefinition.patterns[key] = Array.from(new Set(languageDefinition.patterns[key]));
    }

    return languageDefinition;
}
