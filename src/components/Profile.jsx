import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';

function AnimatedCounter({ from = 0, to, duration = 2, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  useEffect(() => {
    if (!inView) return;
    const c = animate(from, to, {
      duration, ease: 'easeOut',
      onUpdate(v) { if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
    });
    return () => c.stop();
  }, [inView, from, to, duration, prefix, suffix]);
  return <span ref={ref}>{prefix}{from}{suffix}</span>;
}

const stats = [
  { to: 15,  suffix: '+',   label: 'Years Experience' },
  { to: 250, suffix: '+',   label: 'Clients Served' },
  { to: 1,   prefix: '₹',  suffix: 'Cr+', label: 'Value Sold' },
  { to: 50,  suffix: '+',   label: 'Happy Families' },
];

const Profile = () => {
  let rectCache = null;

  const handleMouseEnter = (e) => {
    rectCache = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectCache) return;
    const card = e.currentTarget;
    const x = e.clientX - rectCache.left;
    const y = e.clientY - rectCache.top;
    const xc = rectCache.width / 2;
    const yc = rectCache.height / 2;
    const angleX = (yc - y) / 12; // tilt angle
    const angleY = (x - xc) / 12;

    requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 0.15s ease-out';
    });
  };

  const handleMouseLeave = (e) => {
    rectCache = null;
    const card = e.currentTarget;
    requestAnimationFrame(() => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  };

  return (
    <section 
      id="about" 
      className="py-20 md:py-32 relative select-none"
      style={{ background: '#050505', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Editorial Split Grid — Collage on Left, Copy on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Column 1: Left Image Collage (Lg size: 6/12 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative" style={{ transformStyle: 'preserve-3d' }}>
            
            <div className="space-y-4" style={{ transformStyle: 'preserve-3d' }}>
              {/* Top Left Photo */}
              <motion.div
                initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                style={{ 
                  height: 'clamp(180px, 30vw, 320px)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <img src="/image.png" alt="Anil Ashan Portfolio" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" style={{ transform: 'translateZ(20px)' }} />
              </motion.div>

              {/* Bottom Left Photo */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                style={{ 
                  height: 'clamp(140px, 24vw, 240px)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <img src="/about-img-2.jpeg" alt="Property Consultation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ transform: 'translateZ(20px)' }} />
              </motion.div>
            </div>

            <div className="space-y-4 pt-8" style={{ transformStyle: 'preserve-3d' }}>
              {/* Top Right Photo */}
              <motion.div
                initial={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                style={{ 
                  height: 'clamp(140px, 24vw, 240px)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <img src="/about-img-1.jpeg" alt="Skyscraper Exterior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ transform: 'translateZ(20px)' }} />
              </motion.div>

              {/* Bottom Right Photo */}
              <motion.div
                initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                style={{ 
                  height: 'clamp(180px, 30vw, 320px)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <img src="/about-img-3.jpeg" alt="Luxury Penthouse View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ transform: 'translateZ(20px)' }} />
              </motion.div>
            </div>

          {/* Floating Luxury Est. Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center z-10"
            style={{ 
              width: 'clamp(64px, 12vw, 92px)', 
              height: 'clamp(64px, 12vw, 92px)', 
              background: '#050505', 
              border: '1px solid #FFFFFF', 
              boxShadow: '0 0 32px rgba(255,255,255,0.08)' 
            }}
          >
            <span className="text-[#FFFFFF] font-semibold uppercase tracking-widest text-[8px]">Est.</span>
            <span className="text-[#FFFFFF] font-bold text-xs">2015</span>
          </motion.div>
        </div>

        {/* Column 2: Right Content with Original Text Details (Lg size: 6/12 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#FFFFFF)' }} />
            <span className="text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-semibold">Premium Consultant</span>
          </div>

          <h2 className="text-[#FFFFFF] leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', fontFamily: "'Playfair Display', serif" }}>
            Helping Families Find Their{' '}
            <span className="text-[#FFFFFF]">Dream Home Since 2015</span>
          </h2>

          <p className="text-[#B8B8B8] font-light leading-relaxed text-sm md:text-base">
            Anil Ashan is a premier luxury real estate consultant specializing in{' '}
            <span className="font-semibold text-[#FFFFFF]">buying, selling, and renting</span> residential & commercial properties across Mumbai's elite neighbourhoods.
          </p>

          {/* Luxury stats row */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            {stats.map(({ to, suffix, prefix = '', label }) => (
              <div key={label} className="pl-4" style={{ borderLeft: '2px solid #FFFFFF' }}>
                <div className="text-[#FFFFFF] font-bold"
                  style={{ fontSize: 'clamp(1.4rem, 4vw, 2.1rem)', fontFamily: "'Playfair Display', serif" }}>
                  <AnimatedCounter from={0} to={to} duration={2} prefix={prefix} suffix={suffix} />
                </div>
                <div className="text-[#B8B8B8] uppercase tracking-widest mt-1 text-[9px] font-semibold">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  </section>
  );
};

export default Profile;
