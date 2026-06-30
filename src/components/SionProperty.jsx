import React from 'react';
import { motion } from 'framer-motion';

const SionProperty = () => (
  <section className="py-14 sm:py-20 md:py-24 relative"
    style={{ background: 'linear-gradient(180deg, #060d1a 0%, #020408 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">

        {/* Video */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #c9a84c', boxShadow: '0 0 40px rgba(201,168,76,0.18)', background: '#000', aspectRatio: '16/9' }}>
            <video src="/sion-flat-video.mp4" autoPlay controls muted loop playsInline
              className="w-full h-full object-contain block" />
            <div className="absolute top-3 left-3 text-white font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest animate-pulse"
              style={{ background: '#dc2626' }}>
              For Sale
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-1/2">

          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
            <span className="section-label">Exclusive Listing</span>
          </div>

          <h3 className="font-heading font-bold text-luxury-white mb-4"
            style={{ fontSize: 'clamp(1.5rem,4.5vw,2.8rem)', lineHeight: 1.15 }}>
            Premium Property in{' '}
            <span className="text-gradient-gold">Sion</span>
          </h3>

          <p className="text-luxury-light font-light leading-relaxed mb-6"
            style={{ fontSize: 'clamp(0.85rem,2vw,1rem)', opacity: 0.85 }}>
            Take a virtual tour of this stunning property in Sion — excellent layout, modern aesthetics, and prime location.
          </p>

          <ul className="space-y-2.5 mb-8">
            {[['Location','Prime Area, Sion, Mumbai'],['Status','Available for Immediate Sale'],['Consultant','Anil Ashan']].map(([k,v]) => (
              <li key={k} className="flex items-center gap-3 text-luxury-light" style={{ fontSize: 'clamp(0.8rem,2vw,0.95rem)' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#c9a84c' }} />
                <span className="font-medium text-luxury-white mr-1">{k}:</span>{v}
              </li>
            ))}
          </ul>

          <motion.a
            href="https://wa.me/919137399167?text=Hi Anil, I saw the video of the property in Sion. I want to know its price and more details."
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="btn-gold inline-block w-full sm:w-auto text-center px-8 py-4 text-xs sm:text-sm">
            Get Price & Details
          </motion.a>
        </motion.div>

      </div>
    </div>
  </section>
);

export default SionProperty;
