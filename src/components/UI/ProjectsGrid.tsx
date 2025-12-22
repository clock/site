import { useStore } from '../../store/useStore'

const projects = [
  {
    title: 'Project Alpha',
    description: 'A scalable web application',
    icon: '💾',
  },
  {
    title: 'Project Beta',
    description: 'Mobile-first e-commerce platform',
    icon: '📱',
  },
  {
    title: 'Project Gamma',
    description: 'Real-time collaboration tool',
    icon: '⚡',
  },
]

export default function ProjectsGrid() {
  const setSelectedProject = useStore((state) => state.setSelectedProject)
  const setCurrentView = useStore((state) => state.setCurrentView)

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-auto">
      <div className="bg-ps2-gray/90 backdrop-blur-sm pixel-border gel-highlight p-8 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl pixel-font text-ps2-accent mb-6">SAVE FILES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedProject(index)
                setCurrentView('project-detail')
              }}
              className="bg-ps2-dark pixel-border gel-highlight p-6 rounded-lg cursor-pointer hover:bg-ps2-light transition-all hover:scale-105"
            >
              <div className="text-4xl mb-3">{project.icon}</div>
              <div className="text-lg pixel-font mb-2">{project.title}</div>
              <div className="text-sm text-gray-400">{project.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

