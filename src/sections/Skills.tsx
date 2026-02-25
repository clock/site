import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import AnimatedBackgroundPattern from '@/components/AnimatedBackgroundPattern'

interface Website {
  title: string
  description: string
  thumbnail: string | null
  images: string[]
  demo?: string | null
  github?: string | null
}

const BASE = import.meta.env.BASE_URL

const websites: Website[] = [
  {
    title: 'CS Supremacy',
    description: 'Anticheat management dashboard with real-time user monitoring and HWID tracking',
    thumbnail: `${BASE}anticheat/main.png`,
    images: [`${BASE}anticheat/main.png`, `${BASE}anticheat/2.png`, `${BASE}anticheat/3.png`, `${BASE}anticheat/4.png`],
    demo: 'https://clock.github.io/anticheat-frontend-demo/',
    github: 'https://github.com/clock/anticheat-frontend-demo',
  },
  {
    title: 'GD Tracker',
    description: 'Geometry Dash level and stats tracking site',
    thumbnail: `${BASE}tracker-gd/home.png`,
    images: [`${BASE}tracker-gd/home.png`, `${BASE}tracker-gd/main.png`],
  },
  {
    title: 'Periphdle',
    description: 'Wordle-inspired game where you guess the gaming mouse',
    thumbnail: `${BASE}perifdle/1.png`,
    images: [`${BASE}perifdle/1.png`, `${BASE}perifdle/2.png`],
  },
  {
    title: 'Software Loader',
    description: 'Subscription portal with HWID locking, license management, and user authentication',
    thumbnail: null,
    images: [`${BASE}exe-loader/main.png`],
    github: 'https://github.com/clock/exe-loader',
  },
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%' }),
}

export default function Skills() {
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
      id="skills"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-card/20"
    >
      <AnimatedBackgroundPattern />

      <div className="relative z-20 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">Frontend</h2>
            <div className="h-1 w-32 bg-accent" />
          </div>

          {/* Thumbnail - slides between sites */}
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

          {/* Info - fades on site change */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              <div>
                <h3 className="text-white font-semibold text-2xl mb-2">{site.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-xl">{site.description}</p>
              </div>
              <div className="flex gap-3 flex-shrink-0 md:items-start">
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

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8">
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
