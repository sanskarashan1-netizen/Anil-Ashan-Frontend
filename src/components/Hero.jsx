import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const imgRef = useRef(null);

  // Monitor scroll for realistic cloth reveal slide
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 160; // Extra fast halfway reveal over 160px of scroll
      const current = window.scrollY;
      const progress = Math.min(current / threshold, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-36 pb-12 sm:pb-20"
      style={{
        background: '#050505',
        fontFamily: "'Inter', sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* 1. Base Layer: Premium Architectural Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/ghar.png"
          alt="Luxury Architectural Skyscraper"
          className="w-full h-full object-cover scale-105"
          style={{ opacity: 0.9 }}
        />
        {/* Luxury gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.7) 75%, #050505 100%)',
          }}
        />
      </div>

      {/* 2. Interactive SVG Draped Fabric (Automatic Cinematic Cloth Reveal on Mount) */}
      <motion.div
        initial={{ y: "0%", opacity: 0.85 }}
        animate={{ y: "-135%", opacity: 0 }}
        transition={{ duration: 3.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      >
        {/* Curved vector path simulating organic draping folds of satin/silk fabric */}
        <svg
          className="w-full h-[105vh] drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="fabric-folds" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="12%" stopColor="#f5f5f7" />
              <stop offset="25%" stopColor="#d5d5db" />
              <stop offset="38%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e5e5eb" />
              <stop offset="65%" stopColor="#f0f0f4" />
              <stop offset="78%" stopColor="#c5c5cb" />
              <stop offset="90%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e2e8" />
            </linearGradient>
          </defs>
          {/* Main drape path */}
          <path
            d="M0,0 L1440,0 L1440,880 Q1080,860 720,875 Q360,890 0,850 Z"
            fill="url(#fabric-folds)"
            opacity="0.99"
          />
        </svg>
        {/* Soft fabric shadows */}
        <div 
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)'
          }}
        />
      </motion.div>

      {/* 3. Hero Content (Sticky Text & Spacing) */}
      <div className="sticky top-[180px] z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-6 select-none">
        
        {/* Title & Description Column */}
        <div className="max-w-4xl flex flex-col gap-5">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold leading-[1.05] tracking-tight text-[#FFFFFF] font-heading"
            style={{
              fontSize: 'clamp(54px, 7vw, 110px)',
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 4px 20px rgba(5,5,5,0.85), 0 2px 6px rgba(5,5,5,0.95)',
            }}
          >
            Luxury Homes.<br />
            <span className="text-[#D4AF37]" style={{ textShadow: '0 0 32px rgba(212,175,55,0.3)' }}>
              Trusted Deals.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-md text-sm md:text-base font-semibold text-[#F5F5F5] leading-relaxed"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 2px 10px rgba(5,5,5,0.95), 0 1px 4px rgba(5,5,5,0.95)'
            }}
          >
            Premier property consultancy specializing in elite high-rises and curated luxury penthouses across Mumbai's prestigious avenues.
          </motion.p>
        </div>
      </div>

      {/* 4. Bottom Controls / Stats Section */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-4 mt-8 border-t border-white/10 select-none"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        
        {/* Pill button CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a
            href="/properties"
            className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c19b2e] text-[#050505] text-xs uppercase font-bold tracking-widest rounded-lg transition-all shadow-[0_0_24px_rgba(212,175,55,0.25)]"
          >
            Explore Properties
          </a>
        </motion.div>

        {/* Floating Glass Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          {[
            { num: '9+', label: 'Matunga Projects' },
            { num: '4+', label: 'Dadar Exclusives' },
            { num: '12+', label: 'Sion Residences' },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="px-4 py-2 border rounded-xl flex items-center gap-3 text-xs"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span className="font-bold text-[#D4AF37]">{num}</span>
              <span className="text-[#B8B8B8] font-light">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Downward scroll queue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.0 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span style={{ color: '#B8B8B8', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#D4AF37]"
        >
          <FaChevronDown className="text-xs" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
