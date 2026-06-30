import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919137399167"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300 animate-[pulse_2s_ease-in-out_infinite] group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20 group-hover:opacity-40 transition-opacity"></div>
      <FaWhatsapp className="text-3xl relative z-10" />
    </a>
  );
};

export default FloatingWhatsApp;
