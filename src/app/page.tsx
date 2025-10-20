import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Hero Section */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}Fantasy Name Generator
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Forge legendary names from ancient linguistic patterns. Our advanced pattern-based 
            algorithms weave authentic fantasy names using historical language structures.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="text-3xl mb-4">�️</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Linguistic Patterns</h3>
              <p className="text-gray-600 dark:text-gray-300">Based on authentic historical language structures and phonetic rules</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-800">
              <div className="text-3xl mb-4">⚔️</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fantasy Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">Specialized for characters, places, and titles in fantasy settings</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-pink-100 dark:border-pink-800">
              <div className="text-3xl mb-4">🔮</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Algorithmic Magic</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced pattern-weaving with complexity detection and failure handling</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/name-generator"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-full hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              ✨ Forge Names Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              🏛️ Learn About Patterns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
