import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  variant?: 'h1' | 'h2' | 'h3'
}

export default function AnimatedText({ text, className = '', delay = 0, variant = 'h1' }: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  }

  const words = text.split(' ')

  const Tag = variant === 'h1' ? 'h1' : variant === 'h2' ? 'h2' : 'h3'

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={container}
      className={className}
      style={{ perspective: '1000px' }}
    >
      <Tag className="inline-block">
        {words.map((word, index) => (
          <span key={index} className="inline-block">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={item}
                className="inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            {index < words.length - 1 && (
              <motion.span
                variants={item}
                className="inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {'\u00A0'}
              </motion.span>
            )}
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}

