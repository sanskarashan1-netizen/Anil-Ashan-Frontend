import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const sellOffer = {
  title: '2 Flats Remaining',
  location: 'Matunga East, Mumbai',
  building: 'Matunga East Residential Tower',
  priceRange: '₹ 1.1 Cr - ₹ 1.4 Cr',
  areaRange: '850 - 1,100 sq ft',
  flatsAvailable: 2,
  description:
    'Seven flats have already been sold in this building. Only two premium flats remain available in Matunga East. Contact us now to reserve one of the last units.',
  features: [
    '2 flats remaining',
    'Prime Matunga East location',
    'High-demand building',
    'Contact us to reserve your flat',
  ],
  image: '/images/matunga-building.jpg',
};

const Sell = () => {
  return (
    <section id="sell" className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            {sellOffer.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {sellOffer.description}
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 sm:p-10"
          >
            <div className="flex flex-wrap gap-4 mb-8 text-sm uppercase tracking-widest text-gray-400">
              <span className="inline-flex items-center gap-2 bg-luxury-black/70 px-4 py-2 rounded-full border border-luxury-gold/30">
                <FaBuilding className="text-luxury-gold" /> {sellOffer.building}
              </span>
              <span className="inline-flex items-center gap-2 bg-luxury-black/70 px-4 py-2 rounded-full border border-luxury-gold/30">
                <FaMapMarkerAlt className="text-luxury-gold" /> {sellOffer.location}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="rounded-3xl bg-luxury-black/80 border border-luxury-gold/20 p-6">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Flats Available</p>
                <p className="text-4xl font-heading font-bold text-luxury-white">{sellOffer.flatsAvailable}</p>
              </div>
              <div className="rounded-3xl bg-luxury-black/80 border border-luxury-gold/20 p-6">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Price Range</p>
                <p className="text-2xl font-heading font-bold text-luxury-gold">{sellOffer.priceRange}</p>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              {sellOffer.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-gray-300">
                  <FaCheckCircle className="text-luxury-gold mt-1" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <button className="w-full py-3 bg-gray-700 text-gray-300 rounded-md uppercase tracking-widest font-medium" disabled>
                All Units Sold
              </button>
              <a href="#properties" className="block text-center w-full py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 uppercase text-xs tracking-widest font-medium">
                See Other Listings
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sell;
