import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

// Scroll recovery helper to reset window scroll position on page routing
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Layout wrapper for user-facing pages
const UserLayout = ({ children }) => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="relative" style={{ background: '#020408', color: '#f5f0e8' }}>
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <UserLayout>
      <Routes>
        {/* 1. Main Home Landing View */}
        <Route path="/" element={
          <>
            <Hero />
            <TrustBar />
            <SionProperty />
            <LodhaTour />
            <Testimonials />
          </>
        } />
        
        {/* 2. Listing search portal */}
        <Route path="/properties" element={<Properties />} />
        
        {/* 3. Media Portfolio Gallery */}
        <Route path="/gallery" element={<Gallery />} />
        
        {/* 4. Consultant Profile & Background details */}
        <Route path="/about" element={<Profile />} />
        
        {/* 5. Amenities & Facilities map details */}
        <Route path="/amenities" element={<Amenities />} />
      </Routes>
    </UserLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
