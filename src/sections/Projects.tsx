import { motion } from 'framer-motion'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import ProjectMesh from '@/components/3D/ProjectMesh'
import AnimatedBackgroundPattern from '@/components/AnimatedBackgroundPattern'

const projects = [
  {
    title: 'CS Anticheat System',
    description: 'Full-stack anticheat system for CS Supremacy servers with usermode protection',
    tech: ['C++', 'React', 'Node.js', 'SQLite', 'WebSockets'],
    objective: 'Create a scalable anticheat system for old CS:GO servers',
    role: 'Full-stack Developer',
    constraints: 'Usermode only, needs to handle thousands of users, real-time detection',
    outcome: 'Serving 10,000+ users with comprehensive HWID tracking and security',
    github: null,
    demo: null,
  },
  {
    title: 'Software Loader',
    description: 'Full-stack software loader with manual mapping, anti-debugging, and subscription system',
    tech: ['C++', 'Next.js', 'React', 'Tailwind CSS', 'SQLite', 'TLS'],
    objective: 'Create secure loader that prevents piracy and cracking',
    role: 'Full-stack Developer',
    constraints: 'Server-side relocations, anti-debugging, dynamic imports, HWID locking',
    outcome: 'Secure subscription-based software distribution system',
    github: 'https://github.com/clock/exe-loader',
    demo: null,
  },
  {
    title: 'Skinport Market Bot',
    description: 'Chrome extension + C++ client for automated CS skin trading with 700% ROI',
    tech: ['C++', 'JavaScript', 'Chrome Extension API', 'WebSockets'],
    objective: 'Automate profitable skin trading on Skinport marketplace',
    role: 'Full-stack Developer',
    constraints: 'CORS limitations, real-time price analysis, quick purchase decisions',
    outcome: '700% return on investment through automated trading',
    github: null,
    demo: null,
  },
  {
    title: 'Minecraft Internal Client',
    description: 'Internal Minecraft client for Lunar Client 1.8.9 with DLL injection',
    tech: ['C++', 'C', 'MinHook', 'OpenGL', 'ImGui'],
    objective: 'Create internal client for Minecraft Lunar Client',
    role: 'Systems Developer',
    constraints: 'JVM access, custom class loader, trampoline hooking',
    outcome: 'Functional internal client with custom UI and features',
    github: 'https://github.com/clock/minecraft-internal',
    demo: null,
  },
  {
    title: 'CSS Backtrack',
    description: 'Simple backtrack cheat for Counter-Strike Source',
    tech: ['C'],
    objective: 'Create backtrack functionality for CS:S',
    role: 'Developer',
    constraints: 'Game memory manipulation, timing precision',
    outcome: 'Working backtrack cheat implementation',
    github: 'https://github.com/clock/css-backtrack',
    demo: null,
  },
  {
    title: 'Portfolio Website',
    description: 'Portfolio website with writeups and projects built with React and Tailwind',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Markdown'],
    objective: 'Create portfolio site with markdown renderer for writeups',
    role: 'Frontend Developer',
    constraints: 'Markdown rendering, responsive design',
    outcome: 'Functional portfolio with project showcase and blog',
    github: 'https://github.com/clock/site/tree/react-portfolio',
    demo: 'https://clock.github.io/site/',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-card/30 overflow-hidden"
    >
      <AnimatedBackgroundPattern />
      
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{ top: '20%' }}>
        <Canvas camera={{ position: [0, -1, 8], fov: 50 }}>
          <ProjectMesh hoveredCardIndex={hoveredCardIndex} />
        </Canvas>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              Projects
            </h2>
            <div className="h-1 w-32 bg-accent"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <Card
                  className={cn(
                    "bg-card border-border-dark cursor-pointer transition-all h-full",
                    "hover:border-accent"
                  )}
                  onClick={() => setSelectedProject(index)}
                >
                  <CardHeader>
                    <CardTitle className="font-semibold text-accent text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-dark border border-border-dark text-xs text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  {project.github && (
                    <CardFooter>
                      <div className="text-xs text-accent font-medium">
                        Click for details →
                      </div>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border-dark max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-white">
                  {projects[selectedProject].title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-accent transition-colors text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <div className="text-accent font-semibold mb-2">Objective</div>
                  <div className="text-gray-300 pl-4">{projects[selectedProject].objective}</div>
                </div>

                <div>
                  <div className="text-accent font-semibold mb-2">Tech Stack</div>
                  <div className="text-gray-300 pl-4">{projects[selectedProject].tech.join(', ')}</div>
                </div>

                <div>
                  <div className="text-accent font-semibold mb-2">Role</div>
                  <div className="text-gray-300 pl-4">{projects[selectedProject].role}</div>
                </div>

                <div>
                  <div className="text-accent font-semibold mb-2">Constraints</div>
                  <div className="text-gray-300 pl-4">{projects[selectedProject].constraints}</div>
                </div>

                <div>
                  <div className="text-accent font-semibold mb-2">Outcome</div>
                  <div className="text-gray-300 pl-4">{projects[selectedProject].outcome}</div>
                </div>

                  {(projects[selectedProject].github || projects[selectedProject].demo) && (
                    <div className="flex gap-4 pt-4">
                      {projects[selectedProject].github && (
                        <motion.button
                          whileHover={{ opacity: 0.9 }}
                          whileTap={{ opacity: 0.8 }}
                          onClick={() => projects[selectedProject].github && window.open(projects[selectedProject].github, '_blank')}
                          className="px-6 py-3 bg-accent text-white font-medium hover:bg-accent-dark transition-colors border border-accent"
                        >
                          GitHub
                        </motion.button>
                      )}
                      {projects[selectedProject].demo && (
                        <motion.button
                          whileHover={{ opacity: 0.9 }}
                          whileTap={{ opacity: 0.8 }}
                          onClick={() => projects[selectedProject].demo && window.open(projects[selectedProject].demo, '_blank')}
                          className="px-6 py-3 border border-border-dark text-gray-300 hover:border-accent hover:text-white transition-colors font-medium"
                        >
                          Live Demo
                        </motion.button>
                      )}
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
