import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Hero Section */}
          <h1 className="text-5xl md:text-7xl font-bold panda-text-primary mb-4">
            Welcome to
            <span className="panda-text-gradient-silver">
              {" "}Fantasy Name Generator
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl panda-text-secondary mb-6 leading-relaxed">
            Forge legendary names from ancient linguistic patterns. Our advanced pattern-based 
            algorithms weave authentic fantasy names using historical language structures.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="panda-feature-card">
              <div className="text-3xl mb-3">🏛️</div>
              <h3 className="text-lg font-semibold panda-text-primary mb-2">Linguistic Patterns</h3>
              <p className="panda-text-secondary">Based on authentic historical language structures and phonetic rules</p>
            </div>
            
            <div className="panda-feature-card">
              <div className="text-3xl mb-3">⚔️</div>
              <h3 className="text-lg font-semibold panda-text-primary mb-2">Fantasy Focused</h3>
              <p className="panda-text-secondary">Specialized for characters, places, and titles in fantasy settings</p>
            </div>
            
            <div className="panda-feature-card">
              <div className="text-3xl mb-3">🔮</div>
              <h3 className="text-lg font-semibold panda-text-primary mb-2">Algorithmic Magic</h3>
              <p className="panda-text-secondary">Advanced pattern-weaving with complexity detection and failure handling</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/name-generator"
              className="panda-button-primary inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ✨ Forge Names Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              href="/name-analyzer"
              className="panda-button-secondary inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg"
            >
              ✨ Improve Names
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            
            <Link
              href="/about"
              className="panda-button-secondary inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg transition-colors duration-200 shadow-lg"
            >
              🏛️ Learn About Patterns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
