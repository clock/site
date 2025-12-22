import { useStore } from '../../store/useStore'

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
  { category: '3D Graphics', items: ['Three.js', 'React Three Fiber', 'Blender'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vite'] },
]

export default function SkillsPanel() {
  const setCurrentView = useStore((state) => state.setCurrentView)

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-auto">
      <div className="bg-ps2-gray/90 backdrop-blur-sm pixel-border gel-highlight p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl pixel-font text-ps2-accent mb-6">OPTIONS</h2>
        
        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.category}>
              <div className="text-xs text-gray-400 pixel-font mb-2">{skill.category}</div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-ps2-dark pixel-border rounded text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setCurrentView('menu')}
          className="mt-6 px-4 py-2 bg-ps2-blue hover:bg-ps2-accent transition-colors rounded pixel-border pixel-font"
        >
          BACK
        </button>
      </div>
    </div>
  )
}

