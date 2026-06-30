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

const Profile = () => (
  <section 
    id="about" 
    className="py-20 md:py-32 relative select-none"
    style={{ background: '#050505', fontFamily: "'Inter', sans-serif" }}
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
      
      {/* Editorial Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Column 1: Left content (Lg size: 6/12 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37)' }} />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">About Our Consultant</span>
          </div>

          <h2 className="text-[#FFFFFF] leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', fontFamily: "'Playfair Display', serif" }}>
            Decade of Excellence in{' '}
            <span className="text-[#D4AF37]">Premium Estates</span>
          </h2>

          <p className="text-[#B8B8B8] font-light leading-relaxed text-sm md:text-base">
            Anil Ashan is a premier luxury real estate consultant specializing in acquiring, selling, and leasing high-end residential & commercial spaces across Mumbai’s most sought-after avenues.
          </p>

          <p className="text-[#B8B8B8] font-light leading-relaxed text-sm">
            Known for unmatched legal vetting, transparent negotiations, and a private client network, we secure transactions that align with both aesthetic requirements and long-term asset growth.
          </p>

          {/* Luxury stats row */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            {stats.map(({ to, suffix, prefix = '', label }) => (
              <div key={label} className="pl-4" style={{ borderLeft: '2px solid #D4AF37' }}>
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

        {/* Column 2: Right Image Collage (Lg size: 6/12 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 grid grid-cols-2 gap-4 relative"
        >
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" 
              style={{ height: 'clamp(180px, 30vw, 320px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <img src="/image.png" alt="Anil Ashan" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" 
              style={{ height: 'clamp(140px, 24vw, 240px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <img src="/about-img-2.jpeg" alt="Consultation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" 
              style={{ height: 'clamp(140px, 24vw, 240px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <img src="/about-img-1.jpeg" alt="Luxury Architecture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" 
              style={{ height: 'clamp(180px, 30vw, 320px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <img src="/about-img-3.jpeg" alt="Modern Penthouse" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Floating Luxury Est. Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center z-10"
            style={{ 
              width: 'clamp(64px, 12vw, 92px)', 
              height: 'clamp(64px, 12vw, 92px)', 
              background: '#050505', 
              border: '1px solid #D4AF37', 
              boxShadow: '0 0 32px rgba(212,175,55,0.2)' 
            }}>
            <span className="text-[#D4AF37] font-semibold uppercase tracking-widest text-[8px]">Est.</span>
            <span className="text-[#FFFFFF] font-bold text-xs">2015</span>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default Profile;
