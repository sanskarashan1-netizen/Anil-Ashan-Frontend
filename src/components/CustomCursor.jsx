import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on devices with a mouse
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const tagName = e.target.tagName.toLowerCase();
      const isClickable = ['a', 'button', 'input', 'textarea', 'select'].includes(tagName) || 
                          e.target.closest('a') || 
                          e.target.closest('button') || 
                          e.target.closest('[role="button"]') || 
                          e.target.classList.contains('cursor-pointer');
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Return nothing on mobile devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-luxury-gold/50 pointer-events-none z-[9999] hidden md:block shadow-gold-glow"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(37, 99, 235, 0.8)' : 'rgba(37, 99, 235, 0.4)'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-luxury-gold pointer-events-none z-[10000] hidden md:block shadow-[0_0_10px_rgba(37,99,235,1)]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
