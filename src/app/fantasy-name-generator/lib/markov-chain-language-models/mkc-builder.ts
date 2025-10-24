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
            minNodes: -1,
            maxNodes: -1,
            consecutiveSingleLetterLimit: -1,
            nonConsecutiveSingleLetterLimit: -1,
            duplicateClusterLimit: -1,
            totalClusterLimit: -1
        }
    };

    // Build patterns from names
    names.forEach(name => {
        const upperName = name.toLowerCase();
        const groupings = allGroupings(upperName);
        languageDefinition.patterns['^'] = languageDefinition.patterns['^'] || [];
        languageDefinition.patterns['$'] = languageDefinition.patterns['$'] || [];
        languageDefinition.patterns['^'].push(groupings[0][0]);
        languageDefinition.patterns['$'].push(groupings[0][groupings[0].length - 1]);
        groupings.forEach(grouping => {
            for (let i = 0; i < grouping.length - 1; i++) {
                const key = grouping[i];
                const next = grouping[i + 1];
                if (!languageDefinition.patterns[key]) {
                    languageDefinition.patterns[key] = [];
                }
                languageDefinition.patterns[key].push(next);
            }
        });
    });

    // Remove duplicates in patterns
    for (const key in languageDefinition.patterns) {
        languageDefinition.patterns[key] = Array.from(new Set(languageDefinition.patterns[key]));
    }

    return languageDefinition;
}

