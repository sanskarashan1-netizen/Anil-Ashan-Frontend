import React from 'react';
import { motion } from 'framer-motion';
import { FaSwimmer, FaDumbbell, FaCar, FaCocktail, FaVideo, FaWifi, FaTree, FaHome } from 'react-icons/fa';

const amenities = [
  { name: 'Swimming Pool',  icon: FaSwimmer },
  { name: 'Modern Gym',     icon: FaDumbbell },
  { name: 'Parking',        icon: FaCar },
  { name: 'Club House',     icon: FaCocktail },
  { name: 'CCTV Security',  icon: FaVideo },
  { name: 'Smart Homes',    icon: FaWifi },
  { name: 'Rooftop Lounge', icon: FaHome },
  { name: 'Kids Play Area', icon: FaTree },
];

const Amenities = () => (
  <section className="py-14 sm:py-20 md:py-24 relative"
    style={{ background: 'linear-gradient(180deg, #060d1a 0%, #020408 100%)' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <motion.div className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
          <span className="section-label">World Class</span>
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
        </div>
        <h2 className="font-heading font-bold text-luxury-white"
          style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}>
          Premium <span className="text-gradient-gold">Amenities</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {amenities.map((a, idx) => (
          <motion.div key={idx}
            initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
            whileHover={{ y: -5, boxShadow: '0 0 28px rgba(201,168,76,0.2)' }}
            className="glass-panel flex flex-col items-center text-center gap-2 sm:gap-3 p-4 sm:p-6 md:p-8">
            <div className="rounded-full border flex items-center justify-center"
              style={{ width: 'clamp(38px,8vw,56px)', height: 'clamp(38px,8vw,56px)', background: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.3)' }}>
              <a.icon style={{ color: '#c9a84c', fontSize: 'clamp(14px,3vw,22px)' }} />
            </div>
            <span className="font-medium text-luxury-white leading-tight"
              style={{ fontSize: 'clamp(10px,2vw,14px)' }}>
              {a.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Amenities;
