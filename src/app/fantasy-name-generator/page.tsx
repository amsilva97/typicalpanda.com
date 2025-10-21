import Link from 'next/link';

export default function FantasyNameGeneratorHome() {
  const pages = [
    {
      title: 'Name Generator',
      description: 'Generate fantasy names using linguistic patterns',
      href: '/fantasy-name-generator/name-generator',
      status: 'Live' as const
    },
    {
      title: 'Name Analyzer', 
      description: 'Analyze names and generate variations',
      href: '/name-analyzer',
      status: 'Live' as const
    },
    {
      title: 'About',
      description: 'Learn how the pattern magic works',
      href: '/about', 
      status: 'Live' as const
    }
  ];

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Header Navigation */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/"
              className="panda-link inline-flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold panda-text-primary mb-4">
              <span className="panda-text-gradient-gold">
                Fantasy Name Generator
              </span>
            </h1>
            <p className="text-lg panda-text-secondary max-w-3xl mx-auto">
              Explore the complete suite of name generation and analysis tools powered by 
              advanced linguistic pattern algorithms.
            </p>
          </div>

          {/* Navigation Bar */}
          <nav className="panda-card p-4">
            <div className="flex flex-wrap justify-center gap-4">
              {pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="panda-button-primary px-4 py-2 text-sm hover:scale-105 transition-transform"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {/* Main Content - Feature Overview */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="panda-feature-card group hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {page.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold panda-text-primary mb-3">
                  {page.title}
                </h3>
                
                <p className="panda-text-secondary mb-4">
                  {page.description}
                </p>
                
                <div className="text-sm panda-text-primary font-medium group-hover:panda-accent-gold transition-colors">
                  Open Tool →
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Start Guide */}
          <div className="panda-card p-6">
            <h2 className="text-2xl font-bold panda-text-primary mb-4">
              Quick Start Guide
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <h3 className="font-semibold panda-text-primary mb-2">Generate</h3>
                <p className="text-sm panda-text-secondary">
                  Start with the Name Generator to create authentic fantasy names using linguistic patterns.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                </div>
                <h3 className="font-semibold panda-text-primary mb-2">Analyze</h3>
                <p className="text-sm panda-text-secondary">
                  Use the Name Analyzer to break down names into segments and generate variations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                </div>
                <h3 className="font-semibold panda-text-primary mb-2">Learn</h3>
                <p className="text-sm panda-text-secondary">
                  Check the About page to understand the linguistic algorithms behind the magic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
