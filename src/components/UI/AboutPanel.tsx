import { useStore } from '../../store/useStore'

export default function AboutPanel() {
  const setCurrentView = useStore((state) => state.setCurrentView)

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-auto">
      <div className="bg-ps2-gray/90 backdrop-blur-sm pixel-border gel-highlight p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl pixel-font text-ps2-accent mb-6">LOAD GAME</h2>
        
        <div className="space-y-4 text-sm">
          <p>
            Welcome to my portfolio! I'm a developer passionate about creating unique digital experiences.
          </p>
          <p>
            This portfolio is built with React, TypeScript, Three.js, and Tailwind CSS, styled to evoke
            the nostalgic PlayStation 2 era while maintaining modern web standards.
          </p>
          <p>
            Explore the memory cards to see my projects, skills, and get in touch.
          </p>
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

