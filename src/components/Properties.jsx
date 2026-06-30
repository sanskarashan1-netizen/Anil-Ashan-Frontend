import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaVectorSquare, FaArrowRight, FaShieldAlt, FaStar, FaHandshake, FaMapMarkerAlt, FaWhatsapp, FaHome } from 'react-icons/fa';

const fallbackProperties = [
  {
    id: 1, title: 'Shiv Prasad Apartment', location: 'Airoli, Mumbai',
    price: '16.5K/sq.ft', area: '651 - 842 sq ft', image: '/shiv-prasad.jpg', type: '1, 2 BHK', baths: '1-2',
  },
  {
    id: 2, title: 'Lodha Divino', location: 'Matunga East, Mumbai',
    price: '₹ 4.55 Cr', area: '1066 sq ft', image: '/lodha.png', type: '2 BHK', baths: 2,
  },
  {
    id: 3, title: 'Exclusive Penthouse', location: 'Dadar, Mumbai',
    price: '₹ 5.0 Cr', area: '2200 sq ft',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    type: 'Penthouse', baths: 4,
  },
  {
    id: 4, title: 'Modern 1BHK Studio', location: 'Sion, Mumbai',
    price: '₹ 1.2 Cr', area: '550 sq ft',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    type: '1 BHK', baths: 1,
  },
];

const whyUs = [
  { icon: FaShieldAlt, title: 'Verified Properties', desc: 'Every listing is personally verified by Anil for authenticity and legal clarity.' },
  { icon: FaStar,      title: '10+ Years Experience', desc: "Over a decade of expertise in Mumbai's premium real estate market." },
  { icon: FaHandshake, title: 'End-to-End Support', desc: 'From site visit to registration — we handle everything for you.' },
  { icon: FaMapMarkerAlt, title: 'Local Market Expert', desc: 'Deep knowledge of Matunga, Dadar, Sion, King Circle & surrounding areas.' },
];

const locations = ['Matunga East', 'Matunga West', 'King Circle', 'Dadar', 'Sion', 'Wadala', 'Airoli', 'Chembur'];

const cardV = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } }),
};

const Properties = () => {
  const [allListings, setAllListings] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/listings?status=Available');
        if (res.ok) {
          const data = await res.json();
          setAllListings(data);
        }
      } catch (err) {
        console.error('Error fetching admin listings:', err);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/videos');
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchListings();
    fetchVideos();
    
    // Auto-refresh properties & videos list every 5 seconds from the database
    const interval = setInterval(() => {
      fetchListings();
      fetchVideos();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getImgUrl = (url) => {
    if (!url) return '';
    return url.startsWith('data:') || url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };

  const getVideoUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('http')) return url;
    if (url === '/showcase-video.mp4' || url === '/walkthrough.mp4') {
      return url;
    }
    return `http://localhost:5000${url}`;
  };

  const featuredProperties = allListings.length > 0 ? allListings.slice(0, 4) : fallbackProperties;
  const newArrivals = allListings.length > 4 ? allListings.slice(4) : [];

  const defaultVideos = [
    { key: 'showcase', title: 'Luxury Tour', url: '/showcase-video.mp4' },
    { key: 'walkthrough', title: 'Interior Tour', url: '/walkthrough.mp4' }
  ];
  const videosList = videos.length > 0 ? videos : defaultVideos;

  return (
    <section id="properties" className="relative py-16 sm:py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg,#020408 0%,#060d1a 60%,#020408 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
            <span className="section-label">Our Listings</span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
          </div>
          <h2 className="font-heading font-bold text-luxury-white mb-3" style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}>
            Find Your <span className="text-gradient-gold">Dream Home</span>
          </h2>
          <p className="text-luxury-muted max-w-2xl mx-auto font-light" style={{ fontSize: 'clamp(0.85rem,2vw,1rem)' }}>
            Premium apartments in <span className="text-luxury-white font-medium">Matunga, Dadar & King Circle</span> — curated for your family.
          </p>
        </motion.div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {featuredProperties.map((p, idx) => (
            <motion.div key={p._id || p.id} custom={idx} variants={cardV} initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 0 48px rgba(201,168,76,0.25)' }}
              className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-500"
              style={{ background: 'linear-gradient(160deg,#0a1628 0%,#060d1a 100%)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
                {(p.imageUrl || p.image) ? (
                  <img src={getImgUrl(p.imageUrl || p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.04)' }}>
                    <FaHome style={{ color: '#c9a84c', fontSize: 44, opacity: 0.25 }} />
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(6,13,26,0.95) 0%,transparent 55%)' }} />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md"
                  style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}>
                  {p.type}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heading font-bold text-luxury-white" style={{ fontSize: 'clamp(1rem,3vw,1.3rem)' }}>{p.title}</h3>
                  <p className="text-luxury-light text-xs mt-0.5 flex items-center gap-1">
                    <FaMapMarkerAlt style={{ color: '#c9a84c', fontSize: 9 }} />{p.location}
                  </p>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                  <span className="text-luxury-muted text-xs uppercase tracking-widest">Starting Price</span>
                  <span className="font-heading font-bold text-gradient-gold" style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)' }}>{p.price}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[{Icon:FaBed,label:p.type},{Icon:FaBath,label:`${p.baths || '1-2'} Bath`},{Icon:FaVectorSquare,label:p.area}].map(({Icon,label}) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl"
                      style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
                      <Icon style={{ color: '#c9a84c', fontSize: 14 }} />
                      <span className="text-luxury-light text-center leading-tight" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                    </div>
                  ))}
                </div>
                <a href={`https://wa.me/919137399167?text=Hi Anil, I need details on ${p.title} in ${p.location}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-auto btn-outline-gold flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold">
                  View Details <FaArrowRight style={{ fontSize: 10 }} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Admin Listings — New Arrivals */}
        {newArrivals.length > 0 && (
          <motion.div className="mb-20"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
                <span className="section-label">Fresh Listings</span>
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
              </div>
              <h2 className="font-heading font-bold text-luxury-white" style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}>
                New <span className="text-gradient-gold">Arrivals</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newArrivals.map((l, idx) => (
                <motion.div key={l._id} custom={idx} variants={cardV} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, boxShadow: '0 0 48px rgba(201,168,76,0.25)' }}
                  className="rounded-2xl overflow-hidden flex flex-col transition-all duration-500"
                  style={{ background: 'linear-gradient(160deg,#0a1628 0%,#060d1a 100%)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div className="relative flex-shrink-0" style={{ height: 200 }}>
                    {l.imageUrl
                      ? <img src={getImgUrl(l.imageUrl)} alt={l.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.04)' }}>
                          <FaHome style={{ color: '#c9a84c', fontSize: 44, opacity: 0.25 }} />
                        </div>
                    }
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(6,13,26,0.9) 0%,transparent 55%)' }} />
                    {l.type && <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md"
                      style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}>{l.type}</div>}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-heading font-bold text-luxury-white" style={{ fontSize: 'clamp(1rem,3vw,1.2rem)' }}>{l.title}</h3>
                      {l.location && <p className="text-luxury-light text-xs mt-0.5 flex items-center gap-1">
                        <FaMapMarkerAlt style={{ color: '#c9a84c', fontSize: 9 }} />{l.location}
                      </p>}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3 pb-3" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                      <span className="text-luxury-muted text-xs uppercase tracking-widest">Price</span>
                      <span className="font-heading font-bold text-gradient-gold" style={{ fontSize: 'clamp(1.2rem,3vw,1.5rem)' }}>{l.price}</span>
                    </div>
                    {l.area && <p className="text-luxury-muted text-xs mb-3 flex items-center gap-2"><FaVectorSquare style={{ color: '#c9a84c' }} />{l.area}</p>}
                    {l.description && <p className="text-luxury-light text-sm font-light mb-4 leading-relaxed" style={{ opacity: 0.8 }}>{l.description}</p>}
                    <a href={`https://wa.me/919137399167?text=Hi Anil, I am interested in ${l.title}. Please share details.`}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-auto btn-gold flex items-center justify-center gap-2 py-3 text-xs rounded-xl">
                      Enquire Now <FaArrowRight style={{ fontSize: 10 }} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-2xl p-8 md:p-14 text-center relative overflow-hidden mb-20"
          style={{ background: 'linear-gradient(135deg,#060d1a 0%,#0a1628 100%)', border: '1px solid rgba(201,168,76,0.18)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h3 className="font-heading font-bold text-luxury-white mb-4" style={{ fontSize: 'clamp(1.4rem,4vw,2.5rem)' }}>
              Looking for a home in <span className="text-gradient-gold">Matunga, Dadar or King Circle?</span>
            </h3>
            <p className="text-luxury-muted mb-7 max-w-xl mx-auto font-light" style={{ fontSize: 'clamp(0.85rem,2vw,1rem)' }}>
              Tell us what you need — we'll curate the perfect selection for your family.
            </p>
            <a href="https://wa.me/919137399167?text=Hi Anil, I am looking for a property."
              target="_blank" rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm">
              <FaWhatsapp style={{ fontSize: 16 }} /> Contact Us Now
            </a>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div className="mb-20"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
              <span className="section-label">Our Edge</span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
            </div>
            <h2 className="font-heading font-bold text-luxury-white" style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}>
              Why <span className="text-gradient-gold">Choose Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, i) => (
              <motion.div key={i} custom={i} variants={cardV} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 0 30px rgba(201,168,76,0.2)' }}
                className="glass-panel p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <item.icon style={{ color: '#c9a84c', fontSize: 18 }} />
                </div>
                <h4 className="font-heading font-bold text-luxury-white mb-2" style={{ fontSize: 'clamp(0.9rem,2vw,1rem)' }}>{item.title}</h4>
                <p className="text-luxury-muted font-light leading-relaxed" style={{ fontSize: 'clamp(0.78rem,1.8vw,0.9rem)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Locations */}
        <motion.div className="mb-20"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
              <span className="section-label">We Serve</span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
            </div>
            <h2 className="font-heading font-bold text-luxury-white" style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}>
              Locations <span className="text-gradient-gold">Covered</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc, i) => (
              <motion.span key={loc}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 hover:border-luxury-gold"
                style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.25)', color: '#d4cfc6', fontSize: 'clamp(11px,2vw,14px)' }}>
                <FaMapMarkerAlt style={{ color: '#c9a84c', fontSize: 9 }} />{loc}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Video Walkthrough */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
              <span className="section-label">Take A Tour</span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9a84c,transparent)' }} />
            </div>
            <h2 className="font-heading font-bold text-luxury-white" style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}>
              Property Video <span className="text-gradient-gold">Walkthrough</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videosList.map((vid) => (
              <div key={vid._id || vid.key} className="rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid rgba(201,168,76,0.25)', background: '#000' }}>
                <video key={vid.url} src={getVideoUrl(vid.url)} controls muted loop autoPlay playsInline className="w-full block flex-grow" style={{ maxHeight: 360, objectFit: 'cover' }} />
                {vid.title && (
                  <div className="p-3.5 text-center bg-[#060d1a]" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                    <p className="text-[#f5f0e8] text-xs font-semibold uppercase tracking-wider">{vid.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Properties;
