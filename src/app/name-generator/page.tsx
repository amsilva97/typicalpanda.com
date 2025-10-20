'use client';

import { useState } from 'react';
import Link from 'next/link';

const nameCategories = {
  business: ['Tech', 'Creative', 'Professional', 'Startup', 'Consulting'],
  character: ['Fantasy', 'Modern', 'Historical', 'Sci-Fi', 'Mythology'],
  project: ['App', 'Website', 'Game', 'Book', 'Band'],
  pet: ['Dog', 'Cat', 'Bird', 'Exotic', 'Fish']
};

const sampleNames = {
  business: [
    'NexusFlow', 'VelocityLabs', 'InnovateSphere', 'PulseWorks', 'ZenithCore',
    'FluxDrive', 'QuantumLeap', 'BrightForge', 'SwiftVantage', 'EchoMind',
    'ThriveLogic', 'NovaSync', 'PeakForward', 'BlueShift', 'CatalystHub'
  ],
  character: [
    'Aria Moonwhisper', 'Zander Blackthorne', 'Luna Starweaver', 'Kai Shadowmend', 'Vera Lightbringer',
    'Declan Stormrider', 'Iris Nightfall', 'Orion Frostborn', 'Sage Emberstone', 'Atlas Windkeeper',
    'Nova Thornwick', 'Raven Goldleaf', 'Phoenix Drakemoor', 'Lyra Starforge', 'Dante Ironwill'
  ],
  project: [
    'CodeCraft', 'PixelForge', 'DataFlow', 'CloudSync', 'AppSphere',
    'DevNest', 'ByteStream', 'TechPulse', 'DigitalEdge', 'WebForce',
    'CodeVault', 'AppVibe', 'DevCore', 'TechFlow', 'PixelPush'
  ],
  pet: [
    'Whiskers', 'Buster', 'Luna', 'Charlie', 'Bella',
    'Max', 'Daisy', 'Rocky', 'Sophie', 'Milo',
    'Chloe', 'Buddy', 'Zoe', 'Jack', 'Lily'
  ]
};

export default function NameGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof nameCategories>('business');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNames = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const categoryNames = sampleNames[selectedCategory];
      const shuffled = [...categoryNames].sort(() => Math.random() - 0.5);
      setGeneratedNames(shuffled.slice(0, 10));
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Name Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose a category and style to generate unique names for your needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(nameCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category as keyof typeof nameCategories);
                        setSelectedStyle('');
                        setGeneratedNames([]);
                      }}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {nameCategories[selectedCategory].map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedStyle === style
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateNames}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-medium text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Names...
                </div>
              ) : (
                'Generate Names'
              )}
            </button>
          </div>

          {/* Results */}
          {generatedNames.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Generated Names
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedNames.map((name, index) => (
                  <div
                    key={index}
                    className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => copyToClipboard(name)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {name}
                      </span>
                      <svg 
                        className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                Click on any name to copy it to your clipboard
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}