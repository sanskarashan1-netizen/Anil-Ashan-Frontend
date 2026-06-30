import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa';

const reviews = [
  { name: 'Rajesh Sharma',  detail: 'Purchased 3 BHK – Matunga East',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    text: 'Anil has an exceptional understanding of the Matunga market. From the first viewing to the final paperwork, everything was handled with complete professionalism.', rating: 5 },
  { name: 'Priya Mehta',    detail: 'Purchased 2 BHK – King Circle',
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    text: 'We found our dream home in King Circle thanks to Anil. He was transparent at every step and made sure we got the best deal. His dedication is truly unmatched.', rating: 5 },
  { name: 'Vikram Desai',   detail: 'Invested in Premium Flat – Dadar',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    text: 'Investing in a premium property was a big decision. Anil made the entire process smooth and stress-free. His personal attention and market expertise set him apart.', rating: 5 },
  { name: 'Sunita Kapoor',  detail: 'Purchased 4 BHK – Sion West',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    text: 'Working with Anil was a wonderful experience. He listened carefully and delivered beyond our expectations. The level of service is comparable to the finest firms anywhere.', rating: 5 },
];

const stats = [
  { value: 500, suffix: '+', label: 'Families Served' },
  { value: 100, suffix: '+', label: '5-Star Reviews' },
  { value: 10,  suffix: '+', label: 'Years Exp.' },
];

const AnimatedStat = ({ value, suffix, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let c = 0; const step = Math.ceil(value / 60);
    const t = setInterval(() => {
      c += step;
      if (c >= value) { setCount(value); clearInterval(t); } else setCount(c);
    }, 28);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center px-2">
      <div className="font-heading font-bold text-gradient-gold whitespace-nowrap"
        style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', lineHeight: 1.1 }}>
        {count}{suffix}
      </div>
      <div className="text-luxury-muted uppercase tracking-widest mt-1"
        style={{ fontSize: 'clamp(8px, 1.8vw, 11px)' }}>
        {label}
      </div>
    </div>
  );
};

const Card = ({ review }) => (
  <motion.div
    className="relative h-full flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl overflow-hidden"
    style={{ background: 'linear-gradient(145deg, rgba(16,16,16,0.9) 0%, rgba(8,8,8,0.95) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
    whileHover={{ y: -6, boxShadow: '0 0 40px rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.2)' }}
    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
  >
    <div className="absolute top-0 left-0 right-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

    <FaQuoteLeft className="mb-4 flex-shrink-0" style={{ fontSize: 'clamp(1.8rem,5vw,2.5rem)', color: 'rgba(255,255,255,0.08)' }} />

    {/* Avatar */}
    <div className="mb-4 p-0.5 rounded-full flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #FFFFFF, #D1D5DB, #FFFFFF)', width: 68, height: 68 }}>
      <div className="w-full h-full rounded-full overflow-hidden" style={{ border: '2px solid #020408' }}>
        <img src={review.image} alt={review.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
    </div>

    {/* Stars */}
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => <FaStar key={i} className="text-luxury-gold" style={{ fontSize: '12px' }} />)}
    </div>

    <p className="text-luxury-light font-light leading-relaxed flex-grow italic"
      style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', opacity: 0.85 }}>
      "{review.text}"
    </p>

    <div className="w-12 h-px my-4"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

    <h4 className="font-heading font-semibold text-luxury-gold" style={{ fontSize: 'clamp(0.85rem,2vw,1rem)' }}>
      {review.name}
    </h4>
    <p className="text-luxury-muted mt-0.5" style={{ fontSize: '11px' }}>{review.detail}</p>
  </motion.div>
);

const Testimonials = () => (
  <section id="testimonials" className="relative py-16 sm:py-20 md:py-28 overflow-hidden"
    style={{ background: 'linear-gradient(160deg, #020408 0%, #080808 50%, #020408 100%)' }}>

    <div className="absolute pointer-events-none inset-0"
      style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)' }} />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      {/* Header */}
      <motion.div className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #FFFFFF)' }} />
          <span className="section-label">What Our Clients Say</span>
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #FFFFFF, transparent)' }} />
        </div>
        <h2 className="font-heading font-bold text-luxury-white mb-3"
          style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)' }}>
          Trusted by <span className="text-gradient-gold">Mumbai's Finest</span>
        </h2>
        <p className="text-luxury-muted font-light max-w-lg mx-auto" style={{ fontSize: 'clamp(0.85rem,2vw,1.05rem)' }}>
          Real stories from families who found their perfect home with us.
        </p>
      </motion.div>

      {/* Google rating */}
      <motion.div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-14"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <div className="glass-panel flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-full">
          <FaGoogle style={{ color: '#4285F4', fontSize: '14px' }} />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_,i) => <FaStar key={i} style={{ color: '#FFFFFF', fontSize: '11px' }} />)}
          </div>
          <span className="font-heading font-bold text-luxury-white text-sm sm:text-base">4.9
            <span className="text-luxury-muted text-xs font-sans font-normal">/5</span>
          </span>
        </div>
        <span className="text-luxury-muted text-xs sm:text-sm">
          ✦ Trusted by <span className="text-luxury-white font-semibold">500+ Families</span> across Mumbai
        </span>
      </motion.div>

      {/* Carousel */}
      <motion.div className="mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <Swiper modules={[Autoplay, Pagination]} spaceBetween={20}
          slidesPerView={1} autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 24 }, 1024: { slidesPerView: 3, spaceBetween: 28 } }}
          className="pb-12 testimonials-swiper">
          {reviews.map((r, idx) => (
            <SwiperSlide key={idx} className="py-3 px-1">
              <Card review={r} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-3 gap-3 sm:gap-6"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        {stats.map((s, i) => (
          <motion.div key={i} className="glass-panel py-5 sm:py-8 px-2 text-center"
            whileHover={{ y: -5, boxShadow: '0 0 36px rgba(201,168,76,0.22)' }}
            transition={{ type: 'spring', stiffness: 280 }}>
            <AnimatedStat {...s} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default Testimonials;
