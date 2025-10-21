import { LanguageDefinition } from '../core';

/**
 * Custom Experimental language definition
 * ^ marks the start of generation
 * $ marks the end of generation
 * Keys represent pattern nodes, values are arrays of possible continuations
 * This language allows every letter to connect to every other letter for maximum flexibility
 */
export const customExperimental: LanguageDefinition = {
    patterns: {
        "^": [
            // Elf-like starting patterns with double l's and i-l combos
            "syl", "fyl", "fel", "fal", "ely", "aly", "ivy", "eva", "ava", "efy", "afy",
            "ill", "ell", "all", "ull", "sill", "fill", "sall", "fall", "ill", "illy", "ally"
        ],

        // Elvish two-letter flows for consistent sound
        "ly": [
            "a", "e", "i", "o", "u", "f", "v", "ll", "ael", "iel", "elly", "illy", "$"
        ],
        "al": [
            "a", "e", "i", "o", "u", "y", "f", "v", "l", "ll", "ael", "iel", "illy", "$"
        ],
        "el": [
            "a", "e", "i", "o", "u", "y", "f", "v", "l", "ll", "ael", "iel", "elly", "$"
        ],
        // Three-letter elf-like clusters
        "syl": [
            "a", "e", "i", "o", "u", "v", "f", "y", "vel", "lyn", "ath", "ien", "$"
        ],
        "vyl": [
            "a", "e", "i", "o", "u", "f", "y", "l", "ael", "iel", "uen", "ath", "$"
        ],
        "fyl": [
            "a", "e", "i", "o", "u", "v", "y", "l", "ael", "iel", "uen", "eth", "$"
        ],
        "vel": [
            "a", "e", "i", "o", "u", "y", "f", "v", "lyn", "ath", "ien", "$"
        ],
        "fel": [
            "a", "e", "i", "o", "u", "y", "v", "l", "lyn", "eth", "ien", "$"
        ],
        "val": [
            "a", "e", "i", "o", "u", "y", "f", "v", "lyn", "ath", "ien", "$"
        ],
        "fal": [
            "a", "e", "i", "o", "u", "y", "v", "l", "lyn", "eth", "ien", "$"
        ],

        // Flowing vowel-y combinations
        "ely": [
            "a", "e", "i", "o", "u", "f", "v", "n", "s", "ath", "eth", "ien", "$"
        ],
        "aly": [
            "a", "e", "i", "o", "u", "f", "v", "n", "s", "ath", "eth", "ien", "$"
        ],
        "ivy": [
            "a", "e", "i", "o", "u", "f", "v", "l", "n", "ael", "iel", "$"
        ],
        "eva": [
            "l", "n", "r", "s", "y", "f", "v", "lyn", "eth", "$"
        ],
        "ava": [
            "l", "n", "r", "s", "y", "f", "v", "lyn", "ath", "$"
        ],
        "uvy": [
            "a", "e", "i", "o", "u", "l", "n", "s", "ael", "iel", "$"
        ],
        "efy": [
            "a", "e", "i", "o", "u", "l", "n", "r", "s", "ael", "iel", "$"
        ],
        "afy": [
            "a", "e", "i", "o", "u", "l", "n", "r", "s", "uel", "iel", "$"
        ],
        "yva": [
            "l", "n", "r", "s", "f", "lyn", "eth", "$"
        ],
        "yfa": [
            "l", "n", "r", "s", "v", "lyn", "ath", "$"
        ],

        // Elvish vowel flows for coherent sound patterns  
        "a": [
            "l", "ll", "ly", "el", "il", "ael", "iel", "elly", "illy", "lyn", "$"
        ],
        "e": [
            "l", "ll", "ly", "al", "il", "ael", "iel", "elly", "illy", "lyn", "$"
        ],
        "i": [
            "l", "ll", "ly", "al", "el", "ael", "iel", "elly", "illy", "lyn", "$"
        ],
        "o": [
            "l", "ll", "ly", "al", "el", "il", "ael", "iel", "elly", "lyn", "$"
        ],
        "u": [
            "l", "ll", "ly", "al", "el", "il", "ael", "iel", "elly", "lyn", "$"
        ],
        "y": [
            "l", "ll", "al", "el", "il", "ael", "iel", "elly", "illy", "$"
        ],

        // Elvish soft consonants - focus on l-based flows
        "f": [
            "a", "e", "i", "o", "u", "al", "el", "il", "ael", "iel", "elly", "$"
        ],
        "v": [
            "a", "e", "i", "o", "u", "al", "el", "il", "ael", "iel", "elly", "$"
        ],
        "l": [
            "a", "e", "i", "o", "u", "y", "l", "ly", "ael", "iel", "elly", "illy", "$"
        ],
        "n": [
            "a", "e", "i", "o", "u", "al", "el", "il", "ael", "iel", "$"
        ],
        "r": [
            "a", "e", "i", "o", "u", "al", "el", "il", "ael", "iel", "$"
        ],
        "s": [
            "a", "e", "i", "o", "u", "al", "el", "il", "ael", "iel", "$"
        ],

        // Soft elf-like endings
        "lyn": ["$"],         // Like "Evelyn"
        "ael": ["$"],         // Like "Galadriel" 
        "iel": ["$"],         // Like "Ariel"
        "uel": ["$"],         // Like "Samuel"
        "ath": ["$"],         // Like "Legolas" (soft th)
        "eth": ["$"],         // Like "Elrond" (soft th)
        "ien": ["$"],         // Like "Vivien"

        // Double L patterns and I-L combinations
        "ll": [
            "a", "e", "i", "o", "u", "y", "f", "v", "ael", "iel", "uel", "ily", "aly", "$"
        ],
        "ill": [
            "a", "e", "o", "u", "y", "f", "v", "l", "ael", "iel", "uel", "ily", "$"
        ],
        "ell": [
            "a", "e", "i", "o", "u", "y", "f", "v", "ael", "iel", "uel", "ily", "$"
        ],
        "all": [
            "a", "e", "i", "o", "u", "y", "f", "v", "ael", "iel", "uel", "ily", "$"
        ],
        "ull": [
            "a", "e", "i", "o", "u", "y", "f", "v", "ael", "iel", "uel", "ily", "$"
        ],
        "sill": [
            "a", "e", "i", "o", "u", "y", "f", "v", "ael", "iel", "ily", "$"
        ],
        "fill": [
            "a", "e", "i", "o", "u", "y", "v", "l", "ael", "iel", "ily", "$"
        ],
        "sall": [
            "a", "e", "i", "o", "u", "y", "f", "v", "ael", "iel", "ily", "$"
        ],
        "fall": [
            "a", "e", "i", "o", "u", "y", "v", "l", "ael", "iel", "ily", "$"
        ],
        "illy": [
            "a", "e", "i", "o", "u", "f", "v", "l", "n", "s", "$"
        ],
        "ally": [
            "a", "e", "i", "o", "u", "f", "v", "l", "n", "s", "$"
        ],

        // More I-L combinations
        "il": [
            "a", "e", "i", "o", "u", "y", "f", "v", "l", "ael", "iel", "ily", "$"
        ],
        "ali": [
            "a", "e", "o", "u", "y", "f", "v", "l", "ll", "ael", "iel", "$"
        ],
        "eli": [
            "a", "e", "o", "u", "y", "f", "v", "l", "ll", "ael", "iel", "$"
        ],
        "ili": [
            "a", "e", "o", "u", "y", "f", "v", "l", "ll", "ael", "iel", "$"
        ],
        "uli": [
            "a", "e", "o", "u", "y", "f", "v", "l", "ll", "ael", "iel", "$"
        ],

        // I-L ending combinations
        "ily": ["$"],         // Like "lily"
        "elly": ["$"],        // Like "kelly"
        "ully": ["$"],        // Like "fully"
        "illi": ["$"],        // Like "chili"
        "alli": ["$"],        // Like "bali"
        "elli": ["$"]         // Like "deli"
    },

    // Ignore meanings for this experimental language
    meanings: {
    },

    options: {
        name: "Elvish Experimental",
        minLength: 3,          // Elf names should have some length
        maxLength: 10,         // Keep elegant length
        startMarker: "^",
        endMarker: "$",
        maxLoops: 25,          // Allow flowing combinations
        singleLetterLimiter: 3, // Allow some repetition for flow
        clusterLimiter: 2      // Allow elegant repetition
    }
};