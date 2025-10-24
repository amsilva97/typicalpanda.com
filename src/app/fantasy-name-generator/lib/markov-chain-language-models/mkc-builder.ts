import { LanguageDefinition } from "./core";

function allGroupings(word: string): string[][] {
    const n = word.length;
    const results: string[][] = [];

    for (let mask = 0; mask < (1 << (n - 1)); mask++) {
        const grouping: string[] = [];
        let current = word[0];
        for (let i = 0; i < n - 1; i++) {
            if (mask & (1 << i)) {
                grouping.push(current);
                current = word[i + 1];
            } else {
                current += word[i + 1];
            }
        }
        grouping.push(current);
        results.push(grouping);
    }

    return results;
}

/**
 * Build a Markov chain from a list of names
 * @param names Array of name strings
 * @returns Empty JSON object for testing purposes
 */
export function buildChain(names: string[]): LanguageDefinition {
    const languageDefinition: LanguageDefinition = {
        patterns: {},
        options: {
            name: 'Custom Markov Chain',
            startMarker: '^',
            endMarker: '$',
            minNodes: 2,
            maxNodes: 6,
            consecutiveSingleLetterLimit: 2,
            nonConsecutiveSingleLetterLimit: 3,
            duplicateClusterLimit: 2,
            totalClusterLimit: 3
        }
    };

    // Build patterns from names
    names.forEach(name => {
        const cleanName = name.toLowerCase().trim();
        if (cleanName.length === 0) return;
        
        const groupings = allGroupings(cleanName);
        
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

