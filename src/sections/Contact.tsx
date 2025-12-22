import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Card, CardContent } from '@/components/ui/card'
import AnimatedBackgroundPattern from '@/components/AnimatedBackgroundPattern'
import ContactVisualization from '@/components/3D/ContactVisualization'

export default function Contact() {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/clock', icon: '→' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aiden-vanderwyst/', icon: '→' },
    { name: 'Website', url: 'https://clock.github.io/site/', icon: '→' },
  ]

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
    >
      <AnimatedBackgroundPattern />
      
      {/* Three.js Interactive Visualization */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ContactVisualization />
        </Canvas>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              Get In Touch
            </h2>
            <div className="h-1 w-32 bg-accent mx-auto"></div>
            <p className="mt-8 text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's build something awesome together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-card border-border-dark hover:border-accent/50 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-accent mb-6">Connect</h3>
                  <div className="space-y-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        whileHover={{ x: 5, opacity: 0.8 }}
                        className="flex items-center justify-between p-4 bg-dark border border-border-dark hover:border-accent transition-all group"
                      >
                        <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                          {link.name}
                        </span>
                        <span className="text-accent text-xl group-hover:translate-x-1 transition-transform">
                          {link.icon}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Email & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-6"
            >
              <Card className="bg-card border-border-dark hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-accent mb-4">Email</h3>
                  <a
                    href="mailto:aidenvanderwyst@gmail.com"
                    className="text-gray-300 hover:text-accent transition-colors text-lg font-medium block mb-6"
                  >
                    aidenvanderwyst@gmail.com
                  </a>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Feel free to reach out for collaboration or inquiries.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    I typically respond within 24 hours. For urgent matters, feel free to reach out via social media.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border-dark hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-accent mb-4">Let's Work Together</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Whether it's a full project or just a conversation, I'd love to hear from you.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
