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
  <section id="about" className="py-14 sm:py-20 md:py-24 relative"
    style={{ background: 'linear-gradient(160deg, #020408 0%, #060d1a 100%)' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="glass-panel p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-14">

        {/* Images grid */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 grid grid-cols-2 gap-3 relative flex-shrink-0">

          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 'clamp(150px,32vw,280px)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <img src="/image.png" alt="Anil Ashan" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 'clamp(130px,28vw,220px)', border: '1px solid rgba(201,168,76,0.18)' }}>
              <img src="/about-img-2.jpeg" alt="Work" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 'clamp(130px,28vw,220px)', border: '1px solid rgba(201,168,76,0.18)' }}>
              <img src="/about-img-1.jpeg" alt="Office" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 'clamp(150px,32vw,280px)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <img src="/about-img-3.jpeg" alt="Property" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Center badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center z-10"
            style={{ width: 'clamp(52px,10vw,88px)', height: 'clamp(52px,10vw,88px)', background: '#020408', border: '2px solid #c9a84c', boxShadow: '0 0 20px rgba(201,168,76,0.3)' }}>
            <span className="text-luxury-gold font-heading font-bold uppercase tracking-widest" style={{ fontSize: 'clamp(7px,1.5vw,11px)' }}>Est.</span>
            <span className="text-luxury-white font-bold" style={{ fontSize: 'clamp(9px,2vw,14px)' }}>2015</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="w-full md:w-1/2">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span className="section-label">Premium Consultant</span>
          </div>

          <h2 className="font-heading font-bold text-luxury-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)' }}>
            Helping Families Find Their{' '}
            <span className="text-gradient-gold">Dream Home Since 2015</span>
          </h2>

          <p className="text-luxury-light font-light leading-relaxed mb-8"
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', opacity: 0.85 }}>
            Anil Ashan is a premier luxury real estate consultant specializing in{' '}
            <span className="font-semibold text-luxury-white">buying, selling, and renting</span> residential & commercial properties across Mumbai's elite neighbourhoods.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map(({ to, suffix, prefix = '', label }) => (
              <div key={label} className="pl-3 sm:pl-4"
                style={{ borderLeft: '2px solid #c9a84c' }}>
                <div className="font-heading font-bold text-luxury-white"
                  style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)' }}>
                  <AnimatedCounter from={0} to={to} duration={2} prefix={prefix} suffix={suffix} />
                </div>
                <div className="text-luxury-muted uppercase tracking-wider mt-0.5"
                  style={{ fontSize: 'clamp(9px, 1.8vw, 12px)' }}>
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

export default Profile;
