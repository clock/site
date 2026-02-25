import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedBackground from '@/components/AnimatedBackground'
import AnimatedText from '@/components/AnimatedText'
import Terminal from '@/components/Terminal'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const buttons = (className: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className={className}
    >
      <motion.button
        whileHover={{ opacity: 0.9 }}
        whileTap={{ opacity: 0.8 }}
        onClick={() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="px-6 py-3 md:px-8 md:py-4 bg-accent text-white font-medium hover:bg-accent-dark transition-colors border border-accent"
      >
        View Projects
      </motion.button>
      <motion.button
        whileHover={{ opacity: 0.9 }}
        whileTap={{ opacity: 0.8 }}
        onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="px-6 py-3 md:px-8 md:py-4 border border-border-dark text-gray-300 hover:border-accent hover:text-white transition-colors font-medium"
      >
        Get In Touch
      </motion.button>
    </motion.div>
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />

      <motion.div style={{ y, opacity }} className="relative z-10 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center pt-24 pb-12 md:min-h-screen md:py-20">

          {/* Text block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="order-1 space-y-4 md:space-y-8"
          >
            {/* Heading — tight on mobile */}
            <div>
              <div className="overflow-hidden">
                <AnimatedText
                  text="Hello,"
                  variant="h1"
                  className="text-4xl md:text-8xl lg:text-9xl font-bold text-white leading-tight"
                  delay={0.2}
                />
              </div>
              <div className="overflow-hidden">
                <AnimatedText
                  text="I'm Aiden"
                  variant="h1"
                  className="text-4xl md:text-8xl lg:text-9xl font-bold text-white leading-tight"
                  delay={0.4}
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg md:text-2xl text-gray-400 max-w-lg"
            >
              Full-stack developer building anticheats and exploring low-level systems through game security development
            </motion.p>

            {/* Buttons — desktop only here */}
            {buttons('hidden md:flex flex-wrap gap-4 pt-8')}
          </motion.div>

          {/* Terminal — fixed height on mobile so it doesn't push everything off screen */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 mt-6 md:mt-0"
          >
            <Terminal />
          </motion.div>

          {/* Buttons — mobile only, below the terminal */}
          {buttons('order-3 md:hidden flex flex-wrap gap-4 mt-10')}
        </div>
      </motion.div>
    </section>
  )
}
