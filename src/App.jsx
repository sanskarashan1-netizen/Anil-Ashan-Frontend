import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import SionProperty from './components/SionProperty';
import Profile from './components/Profile';
import Properties from './components/Properties';
import LodhaTour from './components/LodhaTour';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminPanel from './components/AdminPanel';

function App() {
  const { scrollYProgress } = useScroll();
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin');

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="relative" style={{ background: '#020408', color: '#f5f0e8' }}>
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <Navbar />
      <Hero />
      <TrustBar />
      <SionProperty />
      <Profile />
      <Properties />
      <LodhaTour />
      <Amenities />
      <Gallery />
      <Testimonials />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
