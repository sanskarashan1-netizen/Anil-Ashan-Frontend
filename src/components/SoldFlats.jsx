import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

const SoldFlats = () => {
  return (
    <section className="py-24 bg-luxury-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-6 text-luxury-white"
          >
            Sold — 7 Flats
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto font-light leading-relaxed"
          >
            All seven flats in this building have been sold. Thank you for the interest. If you are looking for other available properties in Matunga or nearby areas, please check our listings.
          </motion.p>
        </div>

        {/* Content Card */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative rounded-xl overflow-hidden shadow-gold-glow border border-luxury-gold/20"
          >
            <img 
              src="/image.png" 
              alt="Matunga East Residential Tower" 
              className="w-full h-full object-cover min-h-[400px]"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-3 py-1 text-xs uppercase tracking-wider rounded-full shadow-lg z-10">
              SOLD
            </div>
            {/* Dark gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-luxury-black to-transparent"></div>
          </motion.div>

          {/* Right: Details Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 bg-[#0D0E12] border border-luxury-gold/30 rounded-xl p-8 flex flex-col justify-center shadow-lg relative overflow-hidden"
          >
            {/* Detail Badges */}
            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center px-4 py-2 border border-luxury-gold/50 rounded-full bg-black/40">
                <FaBuilding className="text-luxury-gold mr-3" />
                <span className="text-gray-300 text-sm tracking-widest uppercase">Matunga East Residential Tower</span>
              </div>
              <br />
              <div className="inline-flex items-center px-4 py-2 border border-luxury-gold/50 rounded-full bg-black/40">
                <FaMapMarkerAlt className="text-luxury-gold mr-3" />
                <span className="text-gray-300 text-sm tracking-widest uppercase">Matunga East, Mumbai</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-luxury-gold/20 bg-black/30 rounded-xl p-6">
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">Flats Available</div>
                <div className="text-3xl font-heading font-bold text-luxury-white">0</div>
              </div>
              
              <div className="border border-luxury-gold/20 bg-black/30 rounded-xl p-6">
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">Price Range</div>
                <div className="text-xl font-heading font-bold text-gradient-gold leading-snug">
                  ₹ 1.1 Cr - ₹ 1.4 Cr
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
};

export default SoldFlats;
