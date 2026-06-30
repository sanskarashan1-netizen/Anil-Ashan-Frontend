import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home',         to: '/' },
  { name: 'About Us',     to: '/about' },
  { name: 'Properties',   to: '/properties' },
  { name: 'Gallery',      to: '/gallery' },
  { name: 'Amenities',    to: '/amenities' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(2,4,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-heading font-bold text-luxury-white tracking-wide"
            style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>
            ANIL ASHAN
          </span>
          <span className="font-sans font-normal tracking-[0.25em] text-luxury-muted"
            style={{ fontSize: '9px', textTransform: 'uppercase' }}>
            Real Estate
          </span>
        </Link>

        {/* Desktop links — center */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className="font-sans font-medium transition-colors duration-300 hover:text-luxury-gold"
              style={{ fontSize: '13px', letterSpacing: '0.04em', color: '#d4cfc6' }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Contact Us button — right */}
        <div className="hidden md:block">
          <a href="#contact"
            className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold">
            Contact Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(true)} className="md:hidden text-luxury-white text-2xl p-1">
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] flex flex-col justify-center items-center"
            style={{ background: '#020408' }}
          >
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-luxury-gold text-3xl p-1">
              <HiX />
            </button>
            <div className="absolute top-5 left-5">
              <span className="font-heading font-bold text-luxury-white text-xl tracking-wide">ANIL ASHAN</span>
            </div>
            <div className="flex flex-col gap-8 text-center">
              {[...navLinks, { name: 'Contact', to: '#contact' }].map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => setOpen(false)}
                >
                  {link.to.startsWith('#') ? (
                    <a href={link.to}
                      className="text-2xl font-heading font-bold uppercase tracking-widest text-luxury-light hover:text-luxury-gold transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.to}
                      className="text-2xl font-heading font-bold uppercase tracking-widest text-luxury-light hover:text-luxury-gold transition-colors">
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
