import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const Footer = () => {
  const [form, setForm] = useState({ firstName:'', lastName:'', phone:'', message:'' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter valid 10-digit number';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Submission failed');
      }

      setSubmitted(true);
      setForm({ firstName:'', lastName:'', phone:'', message:'' });
      setErrors({});
    } catch (err) {
      alert(err.message || 'Failed to submit inquiry. Please check your connection.');
    }
  };

  const inputCls = "w-full px-4 py-3.5 text-luxury-white text-sm font-light focus:outline-none transition-colors duration-300 rounded-sm";
  const inputStyle = { background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(201,168,76,0.2)', };
  const inputFocusStyle = { borderColor: '#c9a84c' };

  return (
    <footer id="contact" className="relative text-luxury-white"
      style={{ background: 'linear-gradient(160deg, #020408 0%, #060d1a 50%, #020408 100%)', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">

        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-14 md:mb-20">

          {/* Form side */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9a84c)' }} />
              <span className="section-label">Get In Touch</span>
            </div>
            <h2 className="font-heading font-bold text-luxury-white mb-3"
              style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}>
              Contact <span className="text-gradient-gold">Us</span>
            </h2>
            <p className="text-luxury-muted font-light mb-8" style={{ fontSize: 'clamp(0.85rem,2vw,1rem)' }}>
              Ready to find your dream home? Our premium consultants are here to help.
            </p>

            {submitted ? (
              <div className="glass-panel p-8 flex flex-col items-center text-center">
                <FaCheckCircle className="text-luxury-gold text-4xl mb-4" />
                <h3 className="font-heading font-bold text-luxury-white text-lg mb-2">Inquiry Received!</h3>
                <p className="text-luxury-muted text-sm">Anil will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-5 section-label underline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mb-8" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="First Name" value={form.firstName}
                      onChange={e => setForm({...form, firstName: e.target.value})}
                      className={inputCls} style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)} />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <input type="text" placeholder="Last Name" value={form.lastName}
                    onChange={e => setForm({...form, lastName: e.target.value})}
                    className={inputCls} style={inputStyle}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.target.style, inputStyle)} />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className={inputCls} style={inputStyle}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.target.style, inputStyle)} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <textarea placeholder="Your Message" rows="3" value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className={`${inputCls} resize-none`} style={inputStyle}
                  onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={e => Object.assign(e.target.style, inputStyle)} />
                <motion.button type="submit"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn-gold w-full py-4 text-xs sm:text-sm">
                  Send Premium Inquiry
                </motion.button>
              </form>
            )}

            <div className="grid grid-cols-3 gap-3">
              {[
                { href: 'https://wa.me/919137399167', Icon: FaWhatsapp, label: 'WhatsApp' },
                { href: 'tel:+919137399167',          Icon: FaPhoneAlt,  label: 'Call Us' },
                { href: 'mailto:info@anilashanrealty.com', Icon: FaEnvelope, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 py-4 rounded-xl transition-all duration-300 group"
                  style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(201,168,76,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.borderColor = '#c9a84c'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,22,40,0.6)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}>
                  <Icon className="text-luxury-gold group-hover:text-luxury-black transition-colors" style={{ fontSize: 'clamp(16px,4vw,22px)' }} />
                  <span className="text-luxury-white group-hover:text-luxury-black transition-colors font-medium" style={{ fontSize: 'clamp(8px,2vw,11px)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            {[
              { emoji: '📞', title: 'Phone & WhatsApp', body: <a href="tel:+919137399167" className="text-luxury-muted hover:text-luxury-gold transition-colors text-sm">+91 91373 99167</a> },
              { emoji: '✉️', title: 'Email', body: <a href="mailto:info@anilashanrealty.com" className="text-luxury-muted hover:text-luxury-gold transition-colors text-sm">info@anilashanrealty.com</a> },
              { emoji: '📍', title: 'Address', body: <p className="text-luxury-muted text-sm leading-relaxed">Matunga Labour Camp 05 Building,<br />Matunga, Mumbai – 400019</p> },
              { emoji: '⏰', title: 'Working Hours', body: <><p className="text-luxury-muted text-sm">Mon – Sat: 9:00 AM – 8:00 PM</p><p className="text-luxury-muted text-xs mt-0.5 opacity-70">Sunday: By Appointment</p></> },
            ].map(({ emoji, title, body }) => (
              <div key={title} className="glass-panel p-4 sm:p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
                  {emoji}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-luxury-white uppercase tracking-widest mb-1" style={{ fontSize: '11px' }}>{title}</h4>
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-5"
          style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold font-heading text-luxury-black text-base"
              style={{ background: 'linear-gradient(135deg, #a07830, #e8c97a)' }}>A</div>
            <div>
              <p className="text-luxury-muted" style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Anil Ashan</p>
              <p className="text-luxury-white font-heading font-bold" style={{ fontSize: '12px' }}>Premium Real Estate</p>
            </div>
          </div>

          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {['Home','About','Properties','Gallery','Testimonials'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-luxury-muted hover:text-luxury-gold transition-colors duration-300"
                  style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-luxury-muted" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              &copy; {new Date().getFullYear()} Anil Ashan Real Estate
            </p>
            <p className="text-luxury-muted" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>
              Developed by <a href="https://socialmedia.nexcorealliance.com/sanskar.html" target="_blank" rel="noopener noreferrer" className="text-luxury-gold hover:underline transition-all font-medium">Sanskar Ashan</a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
