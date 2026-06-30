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
  hidden: { opacity: 0, y: 35 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
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

  let rectCache = null;

  const handleMouseEnter = (e) => {
    rectCache = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectCache) return;
    const card = e.currentTarget;
    const x = e.clientX - rectCache.left;
    const y = e.clientY - rectCache.top;
    const xc = rectCache.width / 2;
    const yc = rectCache.height / 2;
    const angleX = (yc - y) / 16; // Softer 3D tilt angle
    const angleY = (x - xc) / 16;
    
    // Align styling update with screen repaint cycle (zero layout thrashing)
    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.15s ease-out'; // Soft follow lag
    });
  };

  const handleMouseLeave = (e) => {
    rectCache = null;
    const card = e.currentTarget;
    requestAnimationFrame(() => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'; // Velvet smooth reset
    });
  };

  return (
    <section 
      id="properties" 
      className="relative py-20 md:py-32 select-none"
      style={{ background: '#050505', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#FFFFFF)' }} />
            <span className="text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-semibold">Our Portfolio</span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#FFFFFF,transparent)' }} />
          </div>
          <h2 className="text-luxury-white mb-4 tracking-tight" 
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}>
            Featured Properties
          </h2>
          <p className="text-[#B8B8B8] max-w-xl mx-auto text-sm font-light leading-relaxed">
            Curated residences in premium pockets of Mumbai — selected for architectural design and high capital appreciation.
          </p>
        </motion.div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {featuredProperties.map((p, idx) => (
            <motion.div key={p._id || p.id} custom={idx} variants={cardV} initial="hidden" whileInView="visible" viewport={{ once: true }}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group rounded-2xl overflow-hidden flex flex-col pointer-events-auto"
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              }}>
              <div className="relative h-60 sm:h-72 overflow-hidden flex-shrink-0" style={{ transformStyle: 'preserve-3d' }}>
                {(p.imageUrl || p.image) ? (
                  <img src={getImgUrl(p.imageUrl || p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <FaHome style={{ color: '#FFFFFF', fontSize: 44, opacity: 0.25 }} />
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)' }} />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest backdrop-blur-md"
                  style={{ background: 'rgba(16,16,16,0.85)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', transform: 'translateZ(25px)' }}>
                  {p.type}
                </div>
                <div className="absolute bottom-4 left-5 right-5" style={{ transform: 'translateZ(35px)' }}>
                  <h3 className="text-[#FFFFFF] font-bold" 
                    style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', fontFamily: "'Playfair Display', serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-[#B8B8B8] text-xs mt-1 flex items-center gap-1.5 font-light">
                    <FaMapMarkerAlt className="text-[#FFFFFF]" style={{ fontSize: 9 }} />{p.location}
                  </p>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-5 pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span className="text-[#B8B8B8] text-[10px] uppercase tracking-widest font-semibold">Investment Range</span>
                  <span className="font-bold text-[#FFFFFF]" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontFamily: "'Playfair Display', serif" }}>{p.price}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[{Icon:FaBed,label:p.type},{Icon:FaBath,label:`${p.baths || '1-2'} Baths`},{Icon:FaVectorSquare,label:p.area}].map(({Icon,label}) => (
                    <div key={label} className="flex flex-col items-center justify-center gap-1 py-3 rounded-lg"
                      style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <Icon className="text-[#FFFFFF]" style={{ fontSize: 13 }} />
                      <span className="text-[#B8B8B8] text-center tracking-wide mt-1" style={{ fontSize: '9px', textTransform: 'uppercase' }}>{label}</span>
                    </div>
                  ))}
                </div>
                <a href={`https://wa.me/919137399167?text=Hi Anil, I need details on ${p.title} in ${p.location}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center gap-2 py-3.5 border border-[#FFFFFF]/30 hover:border-[#FFFFFF] text-xs uppercase font-bold tracking-widest text-[#FFFFFF] hover:text-[#050505] bg-transparent hover:bg-[#FFFFFF] rounded-lg transition-all duration-300">
                  View Details <FaArrowRight style={{ fontSize: 9 }} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Arrivals Section */}
        {newArrivals.length > 0 && (
          <motion.div className="mb-24"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#FFFFFF)' }} />
                <span className="text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-semibold">Latest Additions</span>
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#FFFFFF,transparent)' }} />
              </div>
              <h2 className="text-[#FFFFFF] mb-4 tracking-tight" 
                style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: "'Playfair Display', serif" }}>
                New Arrivals
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {newArrivals.map((l, idx) => (
                <motion.div key={l._id} custom={idx} variants={cardV} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.2)' }}
                  className="rounded-2xl overflow-hidden flex flex-col transition-all duration-500"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                  }}>
                  <div className="relative flex-shrink-0" style={{ height: 220 }}>
                    {l.imageUrl
                       ? <img src={getImgUrl(l.imageUrl)} alt={l.title} className="w-full h-full object-cover" />
                       : <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                           <FaHome style={{ color: '#FFFFFF', fontSize: 44, opacity: 0.25 }} />
                         </div>
                    }
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)' }} />
                    {l.type && <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest backdrop-blur-md"
                      style={{ background: 'rgba(16,16,16,0.85)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>{l.type}</div>}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-[#FFFFFF] font-bold" 
                        style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', fontFamily: "'Playfair Display', serif" }}>{l.title}</h3>
                      {l.location && <p className="text-[#B8B8B8] text-xs mt-1 flex items-center gap-1.5 font-light">
                        <FaMapMarkerAlt className="text-[#FFFFFF]" style={{ fontSize: 9 }} />{l.location}
                      </p>}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <span className="text-[#B8B8B8] text-[10px] uppercase tracking-widest font-semibold">Value</span>
                      <span className="font-bold text-[#FFFFFF]" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontFamily: "'Playfair Display', serif" }}>{l.price}</span>
                    </div>
                    {l.area && <p className="text-[#B8B8B8] text-xs mb-3 flex items-center gap-2 font-light"><FaVectorSquare className="text-[#FFFFFF]" />Size: {l.area}</p>}
                    {l.description && <p className="text-[#B8B8B8] text-sm font-light mb-5 leading-relaxed">{l.description}</p>}
                    <a href={`https://wa.me/919137399167?text=Hi Anil, I am interested in ${l.title}. Please share details.`}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 py-3.5 bg-[#FFFFFF] hover:bg-[#E5E7EB] text-[#050505] text-xs uppercase font-bold tracking-widest rounded-lg transition-all duration-300">
                      Enquire Now <FaArrowRight style={{ fontSize: 9 }} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-2xl p-8 md:p-16 text-center relative overflow-hidden mb-24"
          style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(8px)',
          }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 75%)' }} />
          <div className="relative z-10">
            <h3 className="text-[#FFFFFF] mb-4 tracking-tight" 
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', fontFamily: "'Playfair Display', serif" }}>
              Looking for a Premium Residence?
            </h3>
            <p className="text-[#B8B8B8] mb-8 max-w-xl mx-auto text-sm font-light leading-relaxed">
              Contact our private desk. We will curate a customized list matching your requirements.
            </p>
            <a href="https://wa.me/919137399167?text=Hi Anil, I am looking for a property."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFFFFF] hover:bg-[#E5E7EB] text-[#050505] text-xs uppercase font-bold tracking-widest rounded-lg transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.1)]">
              <FaWhatsapp style={{ fontSize: 16 }} /> Speak to Consultant
            </a>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div className="mb-24"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#FFFFFF)' }} />
              <span className="text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-semibold">Our Values</span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#FFFFFF,transparent)' }} />
            </div>
            <h2 className="text-[#FFFFFF] mb-4 tracking-tight" 
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: "'Playfair Display', serif" }}>
              Why Partner With Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div key={i} custom={i} variants={cardV} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
                className="p-6 flex flex-col items-center text-center rounded-2xl transition-all duration-300"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(6px)'
                }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <item.icon className="text-[#FFFFFF]" style={{ fontSize: 18 }} />
                </div>
                <h4 className="text-[#FFFFFF] mb-2 font-bold font-sans" style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)' }}>{item.title}</h4>
                <p className="text-[#B8B8B8] font-light leading-relaxed" style={{ fontSize: 'clamp(0.78rem,1.8vw,0.85rem)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Locations Covered */}
        <motion.div className="mb-24"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#FFFFFF)' }} />
              <span className="text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-semibold">Avenues Served</span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#FFFFFF,transparent)' }} />
            </div>
            <h2 className="text-[#FFFFFF] mb-4 tracking-tight" 
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: "'Playfair Display', serif" }}>
              Key Localities
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((loc, i) => (
              <motion.span key={loc}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: '#FFFFFF' }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full font-medium transition-all duration-300 cursor-default"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)', 
                  color: '#B8B8B8', 
                  fontSize: 'clamp(11px,2vw,13px)' 
                }}>
                <FaMapMarkerAlt className="text-[#FFFFFF]" style={{ fontSize: 9 }} />{loc}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Video Walkthrough */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#FFFFFF)' }} />
              <span className="text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-semibold">Tours</span>
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#FFFFFF,transparent)' }} />
            </div>
            <h2 className="text-[#FFFFFF] mb-4 tracking-tight" 
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: "'Playfair Display', serif" }}>
              Video Walkthroughs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videosList.map((vid) => (
              <div key={vid._id || vid.key} className="rounded-2xl overflow-hidden flex flex-col" 
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#101010' }}>
                <video key={vid.url} src={getVideoUrl(vid.url)} controls muted loop autoPlay playsInline className="w-full block flex-grow" style={{ maxHeight: 360, objectFit: 'cover' }} />
                {vid.title && (
                  <div className="p-4 text-center bg-[#101010]" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-[#B8B8B8] text-xs font-semibold uppercase tracking-widest">{vid.title}</p>
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
