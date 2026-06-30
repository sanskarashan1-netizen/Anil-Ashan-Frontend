import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ src, h = '220px', direction = 'left', delay = 0 }) => {
  const slideX = direction === 'left' ? -80 : 80;
  return (
    <motion.div
      initial={{ opacity: 0, x: slideX, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        height: h,
        background: '#101010',
      }}
    >
      <img src={src} alt="Architecture Visit"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.4s ease',
        background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 60%)',
        borderRadius: 16,
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0}
      />
    </motion.div>
  );
};

const Gallery = () => {
  const sectionRef = useRef(null);
  const headRef   = useRef(null);
  const showcaseRef = useRef(null);

  const [galleryData, setGalleryData] = useState({
    images: [
      '/1.png',
      '/111.png',
      '/13.png',
      '/15.png',
      '/17.png',
      '/10.png',
      '/11.png',
      '/12.png'
    ],
    showcaseImg: '/8.png'
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/gallery');
        if (res.ok) {
          const data = await res.json();
          setGalleryData(data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      }
    };
    fetchGallery();
    const interval = setInterval(fetchGallery, 5000);
    return () => clearInterval(interval);
  }, []);

  const resolveUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('http')) return url;
    const defaultAssets = ['/1.png', '/111.png', '/13.png', '/15.png', '/17.png', '/10.png', '/11.png', '/12.png', '/8.png'];
    if (defaultAssets.includes(url)) {
      return url;
    }
    return `http://localhost:5000${url}`;
  };

  const getImg = (index, fallback) => {
    return resolveUrl(galleryData.images?.[index] || fallback);
  };

  useEffect(() => {
    // Heading GSAP animation
    if (headRef.current?.children) {
      gsap.fromTo(headRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 88%', once: true } }
      );
    }
    // Showcase parallax
    const bgImg = showcaseRef.current?.querySelector('img');
    if (bgImg) {
      gsap.to(bgImg, { yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: showcaseRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  }, []);

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 md:py-32 select-none"
      style={{ background: '#050505', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div ref={headRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37)' }} />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">Cinematic Showcase</span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#D4AF37,transparent)' }} />
          </div>
          <h2 className="text-[#FFFFFF] mb-4 tracking-tight" 
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: "'Playfair Display', serif" }}>
            Recent Property Visits
          </h2>
          <p className="text-[#B8B8B8] max-w-xl mx-auto text-sm font-light leading-relaxed">
            A visual documentation of the premium craftsmanship and architectural landmarks in our exclusive portfolio.
          </p>
        </div>

        {/* Showcase Banner */}
        <motion.div
          ref={showcaseRef}
          initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl mb-6 shadow-2xl border"
          style={{ 
            height: 'clamp(220px, 30vw, 420px)', 
            borderColor: 'rgba(255,255,255,0.08)',
            background: '#101010'
          }}
        >
          <img src={resolveUrl(galleryData.showcaseImg || '/8.png')} alt="Luxury Villa Visited" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.3) 60%, transparent 100%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 inset-x-0 p-6 sm:p-10 text-center">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">
              Experience Premium Living
            </p>
            <h3 className="text-[#FFFFFF] tracking-tight text-xl sm:text-2xl md:text-3xl font-bold" 
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Matunga Luxury Residences
            </h3>
          </motion.div>
        </motion.div>

        {/* Row 1: 2 Columns (Staggered 1-by-1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card src={getImg(0, '/1.png')} h="clamp(200px, 32vw, 420px)" direction="left" delay={0.1} />
          <Card src={getImg(1, '/111.png')} h="clamp(200px, 32vw, 420px)" direction="right" delay={0.3} />
        </div>

        {/* Row 2: 3 Columns (Staggered 1-by-1) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Card src={getImg(2, '/13.png')} h="clamp(160px, 20vw, 240px)" direction="left" delay={0.1} />
          <Card src={getImg(3, '/15.png')} h="clamp(160px, 20vw, 240px)" direction="right" delay={0.3} />
          <Card src={getImg(4, '/17.png')} h="clamp(160px, 20vw, 240px)" direction="left" delay={0.5} />
        </div>

        {/* Row 3: 3 Columns (Staggered 1-by-1) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card src={getImg(5, '/10.png')} h="clamp(120px, 16vw, 200px)" direction="right" delay={0.1} />
          <Card src={getImg(6, '/11.png')} h="clamp(120px, 16vw, 200px)" direction="left" delay={0.3} />
          <Card src={getImg(7, '/12.png')} h="clamp(120px, 16vw, 200px)" direction="right" delay={0.5} />
        </div>

      </div>
    </section>
  );
};

export default Gallery;
