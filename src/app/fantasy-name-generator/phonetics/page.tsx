'use client';

import React, { useState } from "react";
import Link from "next/link";
import { generateNames, deconstructWord } from "../lib/markov-chain-language-models/generator";
import { getLanguageDefinition, SupportedLanguage, getSupportedLanguages, getLanguageDisplayName } from "../lib/markov-chain-language-models/core";
import { vocalize } from "../lib/markov-chain-language-models/phonetics";

export default function PhoneticsPage() {
	const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(SupportedLanguage.OLD_ENGLISH);
	const [name, setName] = useState<string>("");
	const [segmentations, setSegmentations] = useState<string[][]>([]);
	const [isGenerating, setIsGenerating] = useState(false);

	// Generate a name and its segmentations
	const generate = () => {
		setIsGenerating(true);
		setTimeout(() => {
			const languageDefinition = getLanguageDefinition(selectedLanguage);
			const [newName] = generateNames(languageDefinition, 1);
			setName(newName);
			setSegmentations(deconstructWord(newName, languageDefinition));
			setIsGenerating(false);
		}, 400);
	};

	// On mount or language change, generate initial name
	React.useEffect(() => {
		generate();
		// eslint-disable-next-line
	}, [selectedLanguage]);

	const languageDefinition = getLanguageDefinition(selectedLanguage);
	const minSegmentation = segmentations.length > 0 ? segmentations.reduce((min, seg) => seg.length < min.length ? seg : min, segmentations[0]) : [];

	// Handler for vocalize button
	const handleVocalize = (nodes: string[]) => {
		vocalize(nodes, languageDefinition);
	};

	return (
		<div className="min-h-screen panda-bg-primary">
			<div className="px-6 py-8">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="mb-2">
						<Link 
							href="/"
							className="panda-link inline-flex items-center text-sm mr-4"
						>
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Back to Portfolio
						</Link>
						<Link 
							href="/fantasy-name-generator"
							className="panda-link inline-flex items-center text-sm"
						>
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							Back to Fantasy Name Generator
						</Link>
					</div>
					<h1 className="text-4xl md:text-6xl font-bold panda-text-primary mb-4">
						<span className="panda-text-gradient-silver">
							Fantasy Name Phonetics
						</span>
					</h1>
					<p className="text-lg panda-text-secondary">
						Explore the phonetic breakdown of generated fantasy names. Click any segmentation to vocalize it!
					</p>
				</div>

				<div>
					{/* Controls */}
					<div className="panda-card p-6 mb-6 max-w-xl mx-auto">
						<div className="mb-4">
							<div className="max-w-md mx-auto">
								<label className="block text-sm font-medium panda-text-primary mb-2 text-center">
									Language Pattern
								</label>
								<select
									value={selectedLanguage}
									onChange={e => setSelectedLanguage(e.target.value as SupportedLanguage)}
									className="w-full panda-input px-3 py-2 rounded"
								>
									{getSupportedLanguages().map(lang => (
										<option key={lang} value={lang}>{getLanguageDisplayName(lang)}</option>
									))}
								</select>
							</div>
						</div>
						<button
							onClick={generate}
							disabled={isGenerating}
							className="w-full panda-button-primary py-3 px-5 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
						>
							{isGenerating ? (
								<div className="flex items-center justify-center">
									<div className="panda-loading h-5 w-5 mr-2"></div>
									Generating Name...
								</div>
							) : (
								'Generate Random Name'
							)}
						</button>
					</div>

					{/* Results */}
					{name && (
						<div className="panda-card p-6 max-w-xl mx-auto">
							<h2 className="text-2xl font-bold panda-text-primary mb-3 text-center">
								Generated Name
							</h2>
							<div className="text-center text-3xl font-mono mb-4 panda-text-gradient-gold">
								{name}
							</div>
							<div className="mb-4 text-center">
								<b>Least Nodes Segmentation:</b> <span className="font-mono">{minSegmentation.join(' | ')}</span>
							</div>
							<div>
								<b>All Segmentations:</b>
								<div className="grid gap-2 mt-2" style={{ gridTemplateColumns: '1fr' }}>
									{segmentations.map((seg, i) => (
										<button
											key={i}
											className="panda-button-secondary w-full py-2 px-3 rounded flex items-center justify-between group hover:scale-[1.01] transition-all"
											onClick={() => handleVocalize(seg)}
										>
											<span className="font-mono text-base">{seg.join(' | ')}</span>
											<span className="ml-4 text-xs panda-text-muted group-hover:panda-accent-gold">Vocalize</span>
										</button>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
