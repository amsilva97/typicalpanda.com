import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
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
            About Name Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn more about our name generation process and how we help you find the perfect name
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                How It Works
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our name generator uses carefully curated lists and intelligent algorithms to create 
                names that are both unique and meaningful. Whether you're starting a business, 
                creating a character, or naming a project, we've got you covered.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Features
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🎯 Category-Specific
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Choose from business, character, project, or pet names, each with specialized styles.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ⚡ Instant Results
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get multiple name suggestions in seconds with our fast generation algorithm.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    📋 Easy Copy
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Click any generated name to instantly copy it to your clipboard.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    🎨 Style Options
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Refine results with style preferences like Tech, Fantasy, Modern, and more.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Use Cases
              </h3>

              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
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
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
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