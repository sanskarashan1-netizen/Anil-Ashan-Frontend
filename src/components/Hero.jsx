import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaHome } from 'react-icons/fa';

const Hero = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.to(imgRef.current, {
      scale: 1.08, duration: 18,
      ease: 'power1.inOut', repeat: -1, yoyo: true,
    });
  }, []);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden"
      style={{ background: '#020408' }}>

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/ghar.png"
          alt="Luxury Property"
          className="w-full h-full object-cover"
          style={{ transformOrigin: 'center center', opacity: 0.85 }}
        />
        {/* Dark overlay — heavier at top for navbar, lighter in middle */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(2,4,8,0.55) 0%, rgba(2,4,8,0.15) 35%, rgba(2,4,8,0.6) 75%, rgba(2,4,8,0.92) 100%)' }} />
        {/* Left side subtle dark for text readability */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(2,4,8,0.55) 0%, transparent 55%)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 min-h-screen flex flex-col justify-end pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Bottom row: text LEFT + search RIGHT */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-8">

            {/* ── LEFT: Big bold text ── */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 max-w-xl">

              {/* Eyebrow with house icon */}
              <motion.div variants={item} className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: '#c9a84c' }}>
                  <FaHome style={{ color: '#020408', fontSize: 14 }} />
                </div>
                <span className="text-luxury-light font-sans font-light"
                  style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)' }}>
                  Mumbai's Finest Real Estate
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1 variants={item}
                className="font-heading font-bold text-luxury-white leading-[1.05]"
                style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}>
                Luxury Homes.
              </motion.h1>
              <motion.h1 variants={item}
                className="font-heading font-bold leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', color: '#c9a84c' }}>
                Trusted Deals.
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={item}
                className="text-luxury-light font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)', maxWidth: 420, opacity: 0.85 }}>
                Premier consultancy for elite properties across Matunga, King Circle, Dadar, Sion & Wadala.
              </motion.p>
            </motion.div>

            {/* ── RIGHT: empty on desktop, nothing on mobile ── */}
            <div className="hidden lg:block lg:w-64" />

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-7" style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
