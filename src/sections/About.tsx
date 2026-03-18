import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import InteractiveAboutMesh from '@/components/3D/InteractiveAboutMesh'
import AnimatedBackgroundPattern from '@/components/AnimatedBackgroundPattern'
import StatsCounter from '@/components/StatsCounter'

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
    >
      <AnimatedBackgroundPattern />
      
      {/* Three.js Interactive Background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0" style={{ top: '20%' }}>
        <Canvas camera={{ position: [0, -1.5, 8], fov: 50 }}>
          <InteractiveAboutMesh />
        </Canvas>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              About Me
            </h2>
            <div className="h-1 w-32 bg-accent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -2 }}
            >
              <Card className="bg-card border-border-dark hover:border-accent/50 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="font-semibold text-accent text-xl">
                    Who I Am
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">
                    I'm a Computer Science student who grew up making cheats for video games,
                    which sparked my passion for low-level programming and system security.
                  </p>
                  <p className="leading-relaxed">
                    Beyond game security, I build full-stack applications, experiment with AI tooling,
                    and explore computer vision — always drawn to problems that sit close to the metal.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -2 }}
            >
              <Card className="bg-card border-border-dark hover:border-accent/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-semibold text-accent text-xl">
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-3 text-gray-300">
                    {[
                      { name: 'Game Security', desc: 'Building anticheats and security systems' },
                      { name: 'Low-Level Programming', desc: 'C/C++ and system internals' },
                      { name: 'Reverse Engineering', desc: 'Analyzing software internals' },
                      { name: 'AI & Machine Learning', desc: 'CUDA inference, computer vision, LLM tooling' },
                      { name: 'Full Stack Applications', desc: 'Building end-to-end solutions' },
                    ].map((interest) => (
                      <motion.div
                        key={interest.name}
                        className="flex flex-col gap-2 p-3 bg-dark border border-border-dark hover:border-accent transition-all cursor-pointer group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent group-hover:scale-150 transition-transform"></div>
                          <span className="group-hover:text-accent transition-colors">{interest.name}</span>
                        </div>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          whileHover={{ height: 'auto', opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-gray-400 pl-5">{interest.desc}</p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Projects', value: 12, suffix: '+' },
              { label: 'Languages', value: 8, suffix: '+' },
              { label: 'Users Served', value: 10, suffix: 'K+' },
              { label: 'Years Coding', value: 5, suffix: '+' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                whileHover={{ opacity: 0.9 }}
                className="text-center p-6 bg-card border border-border-dark"
              >
                <div className="text-3xl font-bold text-accent mb-2">
                  <StatsCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
