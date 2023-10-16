import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, unique = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.17 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  if (unique)
    return (
      <motion.div
        ref={elementRef}
        initial={{ opacity: 0.5, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, mass: 0.55, ease: 'easeOut', type: 'spring', stiffness: 100 }}
      >
        {children}
      </motion.div>
    );
  else
    return (
      <motion.div
        ref={elementRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    );
};

export default Reveal;