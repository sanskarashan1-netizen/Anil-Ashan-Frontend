import React from 'react';
import { motion } from 'framer-motion';

const ShowcaseVideo = () => {
  return (
    <section className="py-24 bg-luxury-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border-2 border-luxury-gold/30 shadow-gold-glow bg-luxury-darkBlue aspect-video group"
        >
          <video 
            src="/showcase-video.mp4" 
            controls 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          ></video>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseVideo;
