import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SkillOrbs from '@/components/3D/SkillOrbs'
import AnimatedBackgroundPattern from '@/components/AnimatedBackgroundPattern'

const skills = [
  { category: 'Systems Programming', items: ['C++', 'C', 'Assembly', 'Windows API', 'PE Format'] },
  { category: 'Web Development', items: ['React', 'Next.js', 'Node.js', 'JavaScript', 'Tailwind CSS'] },
  { category: 'Languages', items: ['Python', 'Java', 'Lua', 'TypeScript', 'HTML/CSS'] },
  { category: 'Tools & Technologies', items: ['Git', 'SQLite', 'WebSockets', 'TLS/SSL', 'MinHook'] },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-card/20"
    >
      <AnimatedBackgroundPattern />
      
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <SkillOrbs />
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
              Skills
            </h2>
            <div className="h-1 w-32 bg-accent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="bg-card border-border-dark hover:border-accent/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="font-semibold text-accent text-lg">
                      {skill.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {skill.items.map((item) => (
                        <motion.span
                          key={item}
                          whileHover={{ y: -2 }}
                          className="px-4 py-2 bg-dark border border-border-dark text-sm text-gray-300 hover:border-accent hover:text-accent transition-all"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="inline-block p-8 bg-card border border-border-dark">
              <p className="text-gray-300 text-lg mb-4">
                Continuously learning and exploring new technologies
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span>Always Building</span>
                <span className="text-accent">•</span>
                <span>Always Learning</span>
                <span className="text-accent">•</span>
                <span>Always Improving</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
