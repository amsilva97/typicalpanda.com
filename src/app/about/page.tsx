import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="panda-link inline-flex items-center text-sm mb-3"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold panda-text-primary mb-3">
            <span className="panda-text-gradient-silver">
              About Fantasy Name Generator
            </span>
          </h1>
          <p className="text-lg panda-text-secondary max-w-3xl mx-auto">
            Discover the linguistic algorithms behind our pattern-based fantasy name generation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="panda-card p-6 mb-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold panda-text-primary mb-4">
                How Pattern Magic Works
              </h2>
              
              <p className="panda-text-secondary mb-4">
                Our fantasy name generator uses sophisticated pattern-based algorithms derived from 
                historical linguistic structures. Each language pattern is a network of phonetic 
                possibilities that creates authentic-sounding names through recursive generation.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold panda-text-primary mb-2">
                  Pattern Structure
                </h4>
                <ul className="text-sm panda-text-secondary space-y-1">
                  <li><code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">^</code> - Marks generation start points</li>
                  <li><code className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">$</code> - Marks valid termination points</li>
                  <li><code className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">~</code> - Indicates 20-loop complexity limit reached</li>
                  <li>Each pattern node contains weighted phonetic continuations</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold panda-text-primary mb-3">
                Features
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="panda-card p-4">
                  <h4 className="font-semibold panda-text-primary mb-2">
                    Category-Specific
                  </h4>
                  <p className="panda-text-secondary text-sm">
                    Choose from business, character, project, or pet names, each with specialized styles.
                  </p>
                </div>

                <div className="panda-card p-4">
                  <h4 className="font-semibold panda-text-primary mb-2">
                    ⚡ Instant Results
                  </h4>
                  <p className="panda-text-secondary text-sm">
                    Get multiple name suggestions in seconds with our fast generation algorithm.
                  </p>
                </div>

                <div className="panda-card p-4">
                  <h4 className="font-semibold panda-text-primary mb-2">
                    Easy Copy
                  </h4>
                  <p className="panda-text-secondary text-sm">
                    Click any generated name to instantly copy it to your clipboard.
                  </p>
                </div>

                <div className="panda-card p-4">
                  <h4 className="font-semibold panda-text-primary mb-2">
                    Style Options
                  </h4>
                  <p className="panda-text-secondary text-sm">
                    Refine results with style preferences like Tech, Fantasy, Modern, and more.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold panda-text-primary mb-3">
                Use Cases
              </h3>

              <ul className="space-y-2 panda-text-secondary mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Business Names:</strong> Create professional, memorable names for startups, companies, or products
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <strong>Character Names:</strong> Perfect for writers, game developers, or role-playing enthusiasts
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <strong>Project Names:</strong> Name your apps, websites, games, or creative projects
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <strong>Pet Names:</strong> Find the perfect name for your furry, feathered, or scaled friends
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/name-generator"
              className="panda-button-primary text-lg px-6 py-3"
            >
              Try the Generator
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}