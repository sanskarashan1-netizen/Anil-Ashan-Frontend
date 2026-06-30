import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ src, h = '220px' }) => (
  <div className="g-card" style={{
    position: 'relative', overflow: 'hidden', borderRadius: 14,
    border: '1px solid rgba(201,168,76,0.15)', opacity: 0,
    height: h, background: '#060d1a',
  }}>
    <img src={src} alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    />
    <div style={{
      position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.4s',
      background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
      borderRadius: 14,
    }}
      onMouseEnter={e => e.currentTarget.style.opacity = 1}
      onMouseLeave={e => e.currentTarget.style.opacity = 0}
    />
  </div>
);

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
    // Heading
    if (headRef.current?.children) {
      gsap.fromTo(headRef.current.children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 88%', once: true } }
      );
    }
    // Cards
    const cards = sectionRef.current?.querySelectorAll('.g-card');
    if (cards?.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );
    }
    // Showcase parallax
    const bgImg = showcaseRef.current?.querySelector('img');
    if (bgImg) {
      gsap.to(bgImg, { yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: showcaseRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  }, []);

  return (
    <section id="gallery" ref={sectionRef}
      style={{ background: 'linear-gradient(180deg,#060d1a 0%,#020408 55%,#060d1a 100%)', padding: 'clamp(3rem,6vw,5.5rem) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem,3vw,2rem)' }}>

        {/* ── Header ── */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ height: 1, width: 36, background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase', fontWeight: 500, fontFamily: 'Inter,sans-serif' }}>Property Visits</span>
            <div style={{ height: 1, width: 36, background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, color: '#f5f0e8', fontSize: 'clamp(1.8rem,5.5vw,3.5rem)', lineHeight: 1.1, marginBottom: 12 }}>
            Recent{' '}
            <span style={{ background: 'linear-gradient(135deg,#a07830,#e8c97a,#c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Property Visits
            </span>
          </h2>
          <p style={{ color: '#8a8070', fontWeight: 300, fontSize: 'clamp(0.85rem,1.8vw,1rem)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7, fontFamily: 'Inter,sans-serif' }}>
            A glimpse into the extraordinary lifestyle awaiting you in our prime properties.
          </p>
        </div>

        {/* ── Full-width cinematic banner ── */}
        <div ref={showcaseRef} className="g-card"
          style={{ position: 'relative', height: 'clamp(180px,28vw,400px)', borderRadius: 18, overflow: 'hidden', marginBottom: 12, border: '1px solid rgba(201,168,76,0.18)', opacity: 0 }}>
          <img src={resolveUrl(galleryData.showcaseImg || '/8.png')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,4,8,0.82) 0%,rgba(2,4,8,0.2) 55%,transparent 100%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1rem,3vw,2rem)', textAlign: 'center' }}>
            <p style={{ color: '#c9a84c', fontSize: 9, letterSpacing: '0.42em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Inter,sans-serif', fontWeight: 500 }}>
              Experience Premium Living
            </p>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontWeight: 700, color: '#f5f0e8', fontSize: 'clamp(1.1rem,3.5vw,2.4rem)', lineHeight: 1.2, margin: 0 }}>
              Matunga Luxury Residences
            </h3>
          </motion.div>
        </div>

        {/* ── Row 1: 2 equal large ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <Card src={getImg(0, '/1.png')} h="clamp(180px,32vw,420px)" />
          <Card src={getImg(1, '/111.png')} h="clamp(180px,32vw,420px)" />
        </div>

        {/* ── Row 2: 3 equal medium ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 12 }}>
          <Card src={getImg(2, '/13.png')} h="clamp(120px,20vw,240px)" />
          <Card src={getImg(3, '/15.png')} h="clamp(120px,20vw,240px)" />
          <Card src={getImg(4, '/17.png')} h="clamp(120px,20vw,240px)" />
        </div>

        {/* ── Row 3: 3 equal small ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          <Card src={getImg(5, '/10.png')} h="clamp(100px,16vw,200px)" />
          <Card src={getImg(6, '/11.png')} h="clamp(100px,16vw,200px)" />
          <Card src={getImg(7, '/12.png')} h="clamp(100px,16vw,200px)" />
        </div>

      </div>
    </section>
  );
};

export default Gallery;
