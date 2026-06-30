import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home',         to: '/' },
  { name: 'About Us',     to: '/about' },
  { name: 'Properties',   to: '/properties' },
  { name: 'Amenities',    to: '/amenities' },
  { name: 'Gallery',      to: '/gallery' },
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
    <header className="fixed w-full z-50 px-6 md:px-12 lg:px-16 pt-6 select-none pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-7xl mx-auto rounded-xl border border-white/10 px-6 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10, 10, 20, 0.75)' : 'rgba(10, 10, 20, 0.45)',
          backdropFilter: 'blur(10px)',
          boxShadow: scrolled ? '0 8px 32px 0 rgba(0, 0, 0, 0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-[#E8E8F0] hover:text-[#8B5CF6] transition-colors duration-300">
          <span className="text-xl md:text-2xl font-semibold tracking-tight font-heading">
            ANIL ASHAN
          </span>
        </Link>

        {/* Desktop links — center */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className="font-sans text-sm font-medium transition-colors duration-300 text-[#9A9AB0] hover:text-[#8B5CF6]"
              style={{ letterSpacing: '0.04em' }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Contact Us button — right */}
        <div className="hidden md:block">
          <a href="#footer"
            className="px-5 py-2.5 border border-[#8B5CF6]/40 hover:border-[#8B5CF6] bg-transparent hover:bg-[#8B5CF6] text-[#E8E8F0] hover:text-[#05050A] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300">
            Contact Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(true)} className="md:hidden text-[#E8E8F0] hover:text-[#8B5CF6] text-2xl p-1 transition-colors">
          <HiMenuAlt3 />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] flex flex-col justify-center items-center pointer-events-auto"
            style={{ 
              background: 'rgba(5, 5, 10, 0.95)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-[#8B5CF6] text-3xl p-1 hover:scale-110 transition-transform">
              <HiX />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {[...navLinks, { name: 'Contact', to: '#footer' }].map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {link.to.startsWith('#') ? (
                    <a href={link.to}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-bold uppercase tracking-widest text-[#E8E8F0] hover:text-[#8B5CF6] transition-colors duration-300"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.to}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-bold uppercase tracking-widest text-[#E8E8F0] hover:text-[#8B5CF6] transition-colors duration-300"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
