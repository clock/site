import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import ProjectMesh from '@/components/3D/ProjectMesh'
import AnimatedBackgroundPattern from '@/components/AnimatedBackgroundPattern'

const BASE = import.meta.env.BASE_URL

interface Project {
  title: string
  description: string
  tech: string[]
  objective: string
  role: string
  constraints: string
  outcome: string
  github?: string | null
  demo?: string | null
  images?: string[]
  video?: string | null
  video2?: string | null
}

const projects: Project[] = [
  {
    title: 'CSGO Anticheat System',
    description: 'Full-stack anticheat system for old CS:GO servers (CS Supremacy) with usermode protection and a React management dashboard',
    tech: ['C++', 'React', 'Node.js', 'SQLite', 'WebSockets'],
    objective: 'Create a scalable anticheat system for old CS:GO servers running on CS Supremacy',
    role: 'Full-stack Developer',
    constraints: 'Usermode only, needs to handle thousands of users, real-time detection',
    outcome: 'Serving 10,000+ users with comprehensive HWID tracking and security',
    github: 'https://github.com/clock/anticheat-frontend-demo',
    demo: 'https://clock.github.io/anticheat-frontend-demo/',
  },
  {
    title: 'Command-strip',
    description: 'Unfinished CS:GO anticheat recode using VAC-style streaming detection modules manually mapped into the game process',
    tech: ['C++', 'WebSockets', 'TLS', 'PE Manipulation', 'Zydis', 'LIEF'],
    objective: 'Redesign the anticheat using VAC-style encrypted streaming logic blobs manually mapped into memory at runtime — never written to disk',
    role: 'Systems Developer',
    constraints: 'Position-independent DLLs, manual PE mapping, encrypted WebSocket delivery, binary mutation via MBA and x64 disassembly to break external cheat signatures',
    outcome: 'Unfinished and never completed — code released as reference. Core architecture designed, individual modules partially implemented.',
    github: 'https://github.com/clock/command-strip',
    demo: null,
    images: [`${BASE}command-strip/image.png`],
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
    video: 'https://www.youtube.com/watch?v=ufV-bvG4dhI',
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
    title: 'DevMatch',
    description: 'Full-stack dating app built as a group final project (INFO-3112 Byteforce) with a distributed microservices backend orchestrated on Kubernetes',
    tech: ['Next.js', 'shadcn/ui', 'TypeScript', 'Microservices', 'Kubernetes', 'Azure', 'Docker'],
    objective: 'Build a scalable dating platform with a distributed backend as a university group final project',
    role: 'Full-stack Developer',
    constraints: 'Separate database per microservice — master, matcher, media, profile, security, statistics, telemetry — each running independently in Kubernetes clusters with Azure monitoring for per-service latency and call metrics',
    outcome: 'Functional dating platform with 7 independently deployable microservices monitored via Azure',
    github: null,
    demo: null,
    video: 'https://youtu.be/IllNNjhxntI?t=692',
  },
  {
    title: 'Valorant Auto Responder',
    description: 'Python XMPP MITM proxy intercepting the Riot Client\'s local server to auto-generate witty chat replies and kill trash talk via OpenAI',
    tech: ['Python', 'XMPP', 'OpenAI API', 'MITM', 'TLS'],
    objective: 'Intercept the Riot Client\'s local XMPP server and inject AI-generated responses into in-game chat for both received messages and kill events',
    role: 'Developer',
    constraints: 'Mimic the Riot Client XMPP handshake, identify in-game player messages vs. system traffic, route responses back through the proxy without detection',
    outcome: 'Working auto-responder that replies to chat messages and generates kill trash talk in real-time',
    github: null,
    demo: null,
    video: 'https://www.youtube.com/watch?v=7yH2F-Bhsgs',
    video2: 'https://www.youtube.com/watch?v=cgfXeMzluk8',
  },
]

interface Website {
  title: string
  description: string
  thumbnail: string | null
  images: string[]
  demo?: string | null
  github?: string | null
  video?: string | null
}

const websites: Website[] = [
  {
    title: 'tracker.gd',
    description: 'Geometry Dash stat tracking site with player comparisons and customizable graphs',
    thumbnail: `${BASE}tracker-gd/main.png`,
    images: [`${BASE}tracker-gd/main.png`, `${BASE}tracker-gd/home.png`],
    demo: 'https://tracker.gd',
    video: 'https://www.youtube.com/watch?v=s9K-xlFnCj4',
  },
  {
    title: 'CS Anticheat',
    description: 'Management dashboard for CS Supremacy — real-time user monitoring, HWID tracking, and ban management',
    thumbnail: `${BASE}anticheat/main.png`,
    images: [`${BASE}anticheat/main.png`, `${BASE}anticheat/2.png`, `${BASE}anticheat/3.png`, `${BASE}anticheat/4.png`],
    demo: 'https://clock.github.io/anticheat-frontend-demo/',
    github: 'https://github.com/clock/anticheat-frontend-demo',
  },
  {
    title: 'Periphdle',
    description: 'Wordle-inspired game where you guess the gaming mouse',
    thumbnail: `${BASE}perifdle/1.png`,
    images: [`${BASE}perifdle/1.png`, `${BASE}perifdle/2.png`],
  },
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%' }),
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [lightbox, setLightbox] = useState<{ site: Website; imgIdx: number } | null>(null)

  const navigate = (dir: number) => {
    setDirection(dir)
    setActiveIndex(i => ((i + dir) % websites.length + websites.length) % websites.length)
  }

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1)
    setActiveIndex(i)
  }

  const site = websites[activeIndex]

  return (
    <section
      id="projects"
      className="relative flex items-center justify-center px-4 py-20 bg-card/30 overflow-hidden"
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
          {/* Projects grid */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">Projects</h2>
            <div className="h-1 w-32 bg-accent"></div>
          </div>

          <div className="flex flex-col md:block">
          <div className="order-2 md:order-none grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.2, delay: 0 } }}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <Card
                  className={cn(
                    'bg-card border-border-dark cursor-pointer transition-all h-full flex flex-col group',
                    'hover:border-accent'
                  )}
                  onClick={() => setSelectedProject(index)}
                >
                  <CardHeader className="p-3 md:p-6">
                    <CardTitle className="font-semibold text-accent text-sm md:text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-xs md:text-sm line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 md:px-3 md:py-1 bg-dark border border-border-dark text-xs text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto p-3 md:p-6">
                    <div className="text-xs text-accent/60 font-medium flex items-center gap-1 group-hover:text-accent group-hover:gap-2 transition-all duration-200">
                      Click for details →
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Frontend carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-none mt-0 mb-12 md:mt-20 md:mb-0"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-border-dark" />
              <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">frontend</span>
              <div className="h-px flex-1 bg-border-dark" />
            </div>

            {/* Thumbnail */}
            <div
              className={cn(
                'relative aspect-video bg-card border border-border-dark overflow-hidden mb-6',
                'hover:border-accent/50 transition-colors duration-300',
                site.images.length > 0 ? 'cursor-pointer' : 'cursor-default'
              )}
              onClick={() => site.images.length > 0 && setLightbox({ site, imgIdx: 0 })}
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  {site.thumbnail ? (
                    <img src={site.thumbnail} alt={site.title} className="w-full h-full object-cover object-top" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
                      <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                          backgroundImage:
                            'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
                          backgroundSize: '32px 32px',
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl font-bold text-accent/20 select-none font-mono">
                          {site.title.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {site.images.length > 0 && (
                <div className="absolute bottom-3 right-3 z-10 bg-accent text-dark text-xs font-semibold px-3 py-1 font-mono">
                  {site.images.length} screenshot{site.images.length > 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Site info - fixed height so controls never shift */}
            <div className="relative h-[176px] md:h-[96px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-0 top-0 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-white font-semibold text-2xl mb-2">{site.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-xl line-clamp-2">{site.description}</p>
                </div>
                <div className="flex flex-wrap gap-3 flex-shrink-0 md:items-start">
                  {site.demo && (
                    <a
                      href={site.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-accent text-dark text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Live Demo →
                    </a>
                  )}
                  {site.video && (
                    <a
                      href={site.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-border-dark text-xs text-gray-300 hover:border-accent hover:text-white transition-all"
                    >
                      Watch Video →
                    </a>
                  )}
                  {site.github && (
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-border-dark text-xs text-gray-300 hover:border-accent hover:text-white transition-all"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 border border-border-dark flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all font-mono text-lg"
              >
                ←
              </button>
              <div className="flex gap-2 items-center">
                {websites.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={cn(
                      'h-0.5 transition-all duration-300',
                      activeIndex === i ? 'w-8 bg-accent' : 'w-2 bg-border-dark hover:bg-gray-600'
                    )}
                  />
                ))}
              </div>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 border border-border-dark flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all font-mono text-lg"
              >
                →
              </button>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Project detail modal */}
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
                {(projects[selectedProject].images?.length ?? 0) > 0 && (
                  <div>
                    <div className="text-accent font-semibold mb-2">Screenshots</div>
                    <img
                      src={projects[selectedProject].images![0]}
                      alt="screenshot"
                      className="w-full border border-border-dark object-contain"
                    />
                  </div>
                )}
                {(projects[selectedProject].github || projects[selectedProject].demo || projects[selectedProject].video) && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {projects[selectedProject].github && (
                      <motion.button
                        whileHover={{ opacity: 0.9 }}
                        whileTap={{ opacity: 0.8 }}
                        onClick={() => projects[selectedProject].github && window.open(projects[selectedProject].github!, '_blank')}
                        className="px-6 py-3 bg-accent text-white font-medium hover:bg-accent-dark transition-colors border border-accent"
                      >
                        GitHub
                      </motion.button>
                    )}
                    {projects[selectedProject].demo && (
                      <motion.button
                        whileHover={{ opacity: 0.9 }}
                        whileTap={{ opacity: 0.8 }}
                        onClick={() => projects[selectedProject].demo && window.open(projects[selectedProject].demo!, '_blank')}
                        className="px-6 py-3 border border-border-dark text-gray-300 hover:border-accent hover:text-white transition-colors font-medium"
                      >
                        Live Demo
                      </motion.button>
                    )}
                    {projects[selectedProject].video && (
                      <motion.button
                        whileHover={{ opacity: 0.9 }}
                        whileTap={{ opacity: 0.8 }}
                        onClick={() => projects[selectedProject].video && window.open(projects[selectedProject].video!, '_blank')}
                        className="px-6 py-3 border border-border-dark text-gray-300 hover:border-accent hover:text-white transition-colors font-medium"
                      >
                        Watch Demo →
                      </motion.button>
                    )}
                    {projects[selectedProject].video2 && (
                      <motion.button
                        whileHover={{ opacity: 0.9 }}
                        whileTap={{ opacity: 0.8 }}
                        onClick={() => projects[selectedProject].video2 && window.open(projects[selectedProject].video2!, '_blank')}
                        className="px-6 py-3 border border-border-dark text-gray-300 hover:border-accent hover:text-white transition-colors font-medium"
                      >
                        Watch Demo 2 →
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-white font-semibold text-xl">{lightbox.site.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {lightbox.imgIdx + 1} / {lightbox.site.images.length}
                  </p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-gray-400 hover:text-accent transition-colors text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="relative aspect-video bg-card border border-border-dark overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightbox.imgIdx}
                    src={lightbox.site.images[lightbox.imgIdx]}
                    alt={`${lightbox.site.title} screenshot ${lightbox.imgIdx + 1}`}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                </AnimatePresence>
                {lightbox.imgIdx > 0 && (
                  <button
                    onClick={() => setLightbox({ ...lightbox, imgIdx: lightbox.imgIdx - 1 })}
                    className="absolute left-0 inset-y-0 w-16 flex items-center justify-center text-3xl text-white/40 hover:text-white hover:bg-black/20 transition-all"
                  >
                    ‹
                  </button>
                )}
                {lightbox.imgIdx < lightbox.site.images.length - 1 && (
                  <button
                    onClick={() => setLightbox({ ...lightbox, imgIdx: lightbox.imgIdx + 1 })}
                    className="absolute right-0 inset-y-0 w-16 flex items-center justify-center text-3xl text-white/40 hover:text-white hover:bg-black/20 transition-all"
                  >
                    ›
                  </button>
                )}
              </div>

              {lightbox.site.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {lightbox.site.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox({ ...lightbox, imgIdx: i })}
                      className={cn(
                        'flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all',
                        lightbox.imgIdx === i ? 'border-accent' : 'border-border-dark hover:border-gray-600'
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
