import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  status: 'Live' | 'Coming Soon' | 'In Development';
  features: string[];
}

export default function Home() {
  const projects: Project[] = [
    {
      id: 'name-generator',
      title: 'Fantasy Name Generator',
      description: 'Create authentic fantasy names using advanced linguistic patterns and historical language structures.',
      icon: '',
      href: '/name-generator',
      status: 'Live',
      features: ['Pattern-based Generation', 'Multiple Languages', 'Name Analysis', 'Meaning Generation']
    },
    {
      id: 'future-projects',
      title: 'More Projects Coming Soon',
      description: 'Stay tuned for more exciting tools and applications designed to enhance your creative workflow.',
      icon: '',
      href: '#',
      status: 'Coming Soon',
      features: ['Creative Tools', 'Innovative Designs', 'User-Centric', 'Cutting-Edge Technology']
    }
  ];

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold panda-text-primary mb-6">
            <span className="panda-text-gradient-silver">
              TypicalPanda
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl panda-text-secondary max-w-3xl mx-auto leading-relaxed">
            A collection of creative tools and innovative projects. Explore my growing portfolio 
            of applications designed to enhance your creative workflow.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold panda-text-primary text-center mb-12">
            <span className="panda-text-gradient-gold">My Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`panda-feature-card group relative overflow-hidden ${
                  project.status === 'Live' 
                    ? 'hover:scale-[1.02] transition-transform cursor-pointer' 
                    : 'opacity-75'
                }`}
              >
                {project.status === 'Live' ? (
                  <Link href={project.href} className="block">
                    <ProjectCard project={project} />
                  </Link>
                ) : (
                  <ProjectCard project={project} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="panda-text-secondary">
            More projects coming soon. Follow my journey as we build amazing tools.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{project.icon}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'Live' 
            ? 'bg-green-600 text-white' 
            : project.status === 'Coming Soon'
            ? 'bg-yellow-600 text-black'
            : 'bg-blue-600 text-white'
        }`}>
          {project.status}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold panda-text-primary mb-3">
        {project.title}
      </h3>
      
      <p className="panda-text-secondary mb-4 leading-relaxed">
        {project.description}
      </p>
      
      <div className="space-y-2">
        <h4 className="font-semibold panda-text-primary text-sm">Features:</h4>
        <div className="grid grid-cols-2 gap-2">
          {project.features.map((feature, index) => (
            <div key={index} className="flex items-center text-xs panda-text-secondary">
              <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
              {feature}
            </div>
          ))}
        </div>
      </div>
      
      {project.status === 'Live' && (
        <div className="mt-4 text-sm panda-text-primary font-medium group-hover:panda-accent-gold transition-colors">
          Launch Project →
        </div>
      )}
    </div>
  );
}
