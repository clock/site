import { useStore } from '../../store/useStore'

const projects = [
  {
    title: 'Project Alpha',
    objective: 'Build a scalable web application',
    tech: 'React, TypeScript, Node.js',
    role: 'Full-stack Developer',
    constraints: '2-week deadline, limited budget',
    outcome: 'Launched successfully with 10k+ users',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'Project Beta',
    objective: 'Create a mobile-first e-commerce platform',
    tech: 'Next.js, Tailwind, Stripe',
    role: 'Frontend Lead',
    constraints: 'Mobile-only design, accessibility requirements',
    outcome: '40% increase in mobile conversions',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
]

export default function ProjectDetail() {
  const selectedProject = useStore((state) => state.selectedProject)
  const setCurrentView = useStore((state) => state.setCurrentView)
  const setSelectedProject = useStore((state) => state.setSelectedProject)

  if (selectedProject === null) return null

  const project = projects[selectedProject] || projects[0]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-black/80" onClick={() => setCurrentView('menu')} />
      <div className="relative bg-ps2-gray pixel-border gel-highlight p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setCurrentView('menu')}
          className="absolute top-4 right-4 text-2xl hover:text-ps2-accent transition-colors"
        >
          ×
        </button>
        
        <h2 className="text-3xl pixel-font text-ps2-accent mb-6">{project.title}</h2>
        
        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-400 pixel-font mb-1">OBJECTIVE</div>
            <div className="text-sm">{project.objective}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-400 pixel-font mb-1">TECH</div>
            <div className="text-sm">{project.tech}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-400 pixel-font mb-1">YOUR ROLE</div>
            <div className="text-sm">{project.role}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-400 pixel-font mb-1">CONSTRAINTS</div>
            <div className="text-sm">{project.constraints}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-400 pixel-font mb-1">OUTCOME / METRICS</div>
            <div className="text-sm">{project.outcome}</div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-ps2-blue hover:bg-ps2-accent transition-colors rounded pixel-border"
            >
              GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-ps2-blue hover:bg-ps2-accent transition-colors rounded pixel-border"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

