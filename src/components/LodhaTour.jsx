import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LodhaTour = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoElRef = useRef(null);

  useEffect(() => {
    // Parallax scroll effect
    gsap.to(videoRef.current, {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });

    // Programmatically ensure video plays and is muted (bypasses browser autoplay restrictions)
    if (videoElRef.current) {
      videoElRef.current.defaultMuted = true;
      videoElRef.current.muted = true;
      videoElRef.current.play().catch(error => {
        console.warn("Video autoplay was prevented by browser:", error);
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: 'clamp(380px, 60vw, 640px)' }}>

      <div ref={videoRef} className="absolute inset-0 z-0 scale-110" style={{ background: '#000000' }}>
        <video 
          ref={videoElRef}
          src="/lodha-video.mp4" 
          autoPlay 
          muted 
          defaultMuted
          loop 
          playsInline
          className="w-full h-full object-cover" 
          style={{ opacity: 0.8, filter: 'brightness(85%) contrast(100%)' }} 
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #020408 0%, rgba(2,4,8,0.4) 50%, rgba(2,4,8,0.15) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
            <span className="section-label">Premium Property Tour</span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
          </div>

          <h2 className="font-heading font-bold text-luxury-white mb-5"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3.8rem)', lineHeight: 1.1 }}>
            Step Inside Your{' '}
            <span className="text-gradient-gold">Dream Home</span>
          </h2>

          <p className="text-luxury-white font-normal leading-relaxed mb-10 mx-auto"
            style={{ fontSize: 'clamp(0.85rem,2vw,1.1rem)', maxWidth: '520px', opacity: 0.95 }}>
            Discover premium residences in Matunga East — magnificent architecture, lush landscapes, and an elevated lifestyle crafted for your family.
          </p>

          <motion.a
            href="https://wa.me/919137399167?text=Hi Anil, I am interested in the premium property. Can you share the brochure and floor plans?"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(201,168,76,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold inline-flex items-center gap-3 px-8 sm:px-10 py-4 text-xs sm:text-sm">
            <FaPlay style={{ fontSize: '10px' }} />
            Request Floor Plans
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default LodhaTour;
