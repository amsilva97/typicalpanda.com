import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl">
          {/* Hero Section */}
          <h1 className="text-5xl md:text-7xl font-bold panda-text-primary mb-6">
            Welcome to
            <span className="panda-text-gradient-silver">
              {" "}Fantasy Name Generator
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl panda-text-secondary mb-8 leading-relaxed">
            Forge legendary names from ancient linguistic patterns. Our advanced pattern-based 
            algorithms weave authentic fantasy names using historical language structures.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="panda-feature-card">
              <div className="text-3xl mb-4">🏛️</div>
              <h3 className="text-lg font-semibold panda-text-primary mb-2">Linguistic Patterns</h3>
              <p className="panda-text-secondary">Based on authentic historical language structures and phonetic rules</p>
            </div>
            
            <div className="panda-feature-card">
              <div className="text-3xl mb-4">⚔️</div>
              <h3 className="text-lg font-semibold panda-text-primary mb-2">Fantasy Focused</h3>
              <p className="panda-text-secondary">Specialized for characters, places, and titles in fantasy settings</p>
            </div>
            
            <div className="panda-feature-card">
              <div className="text-3xl mb-4">🔮</div>
              <h3 className="text-lg font-semibold panda-text-primary mb-2">Algorithmic Magic</h3>
              <p className="panda-text-secondary">Advanced pattern-weaving with complexity detection and failure handling</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/name-generator"
              className="panda-button-primary inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              ✨ Forge Names Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              href="/about"
              className="panda-button-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full transition-colors duration-200 shadow-lg"
            >
              🏛️ Learn About Patterns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
