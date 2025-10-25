'use client';
import React from "react";
import { generateNames, deconstructWord } from "../lib/markov-chain-language-models/generator";
import { getLanguageDefinition, SupportedLanguage } from "../lib/markov-chain-language-models/core";
import { vocalize } from "../lib/markov-chain-language-models/phonetics";

export default function PhoneticsPage() {
	// Get the Old English language definition
	const languageDefinition = getLanguageDefinition(SupportedLanguage.OLD_ENGLISH);
	// Generate one name
	const [name] = generateNames(languageDefinition, 1);
	// Get all possible segmentations
	const segmentations = deconstructWord(name, languageDefinition);
	// Find the segmentation with the least nodes
	const minSegmentation = segmentations.reduce((min, seg) => seg.length < min.length ? seg : min, segmentations[0]);

	// Call vocalize (side effect)
	React.useEffect(() => {
		if (name) vocalize(name);
	}, [name]);

	return (
		<div style={{ padding: 24 }}>
			<h1>Phonetics Demo</h1>
			<div><b>Generated Name:</b> {name}</div>
			<div><b>Least Nodes Segmentation:</b> {minSegmentation.join(' | ')}</div>
			<div><b>All Segmentations:</b>
				<ul>
					{segmentations.map((seg, i) => (
						<li key={i}>{seg.join(' | ')}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
