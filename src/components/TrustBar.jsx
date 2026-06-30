import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, ThumbsUp } from 'lucide-react';

const trusts = [
  { icon: ShieldCheck, label: 'RERA Verified' },
  { icon: Award,       label: '10+ Years Experience' },
  { icon: ThumbsUp,    label: 'Trusted Consultant' },
];

const TrustBar = () => (
  <section className="relative z-20 -mt-8 sm:-mt-12 pb-10 sm:pb-14 px-4"
    style={{ background: 'transparent' }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {trusts.map((item, idx) => (
          <motion.div key={idx}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: idx * 0.15, duration: 0.7 }}
            className="glass-panel p-4 sm:p-6 flex flex-col items-center text-center gap-2">
            <item.icon className="text-luxury-gold" style={{ width: 'clamp(18px,4vw,28px)', height: 'clamp(18px,4vw,28px)' }} />
            <span className="font-heading font-semibold text-luxury-white leading-tight"
              style={{ fontSize: 'clamp(9px, 2vw, 14px)' }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
