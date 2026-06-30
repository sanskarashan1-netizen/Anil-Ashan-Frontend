import React, { useEffect, useRef } from 'react';
import { motion as motionFramer } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef(null);

  // 1. Canvas Antigravity Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle high-DPI screens
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle details
    const particleCount = 120;
    const particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * window.innerWidth;
        this.y = init ? Math.random() * window.innerHeight : window.innerHeight + 10;
        this.size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
        this.speed = Math.random() * 0.6 + 0.2; // 0.2 to 0.8 speed
        this.opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6 opacity
        this.driftAngle = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.02 + 0.005;
        this.driftRange = Math.random() * 0.8 + 0.2;
      }

      update() {
        this.y -= this.speed; // Move upward (floating)
        this.driftAngle += this.driftSpeed;
        this.x += Math.sin(this.driftAngle) * this.driftRange; // Weightless drifting

        // If particle goes off-screen, reset to bottom
        if (this.y < -10 || this.x < -10 || this.x > window.innerWidth + 10) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 232, 240, ${this.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(232, 232, 240, 0.4)';
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw faint background void (#05050A)
      ctx.fillStyle = '#05050A';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Update & Draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Text Animation Stagger helpers
  const line1 = "Luxury Real Estate";
  const line2Accent = "That Defies Gravity";

  const charVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.025, // 200ms initial delay, 25ms stagger
        duration: 0.450, // 450ms transition
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center items-start px-6 md:px-12 lg:px-16"
      style={{ 
        background: '#05050A', 
        fontFamily: "'Space Grotesk', sans-serif",
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      {/* 1. Antigravity particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none" 
      />

      {/* 2. Soft radial vignette overlay (edges only) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(5,5,10,0.8) 100%)'
        }}
      />

      {/* 3. Hero content wrapper */}
      <div className="relative z-20 max-w-4xl w-full flex flex-col gap-6 select-none mt-16">
        
        {/* Continuous Floating Badge */}
        <motionFramer.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, -6, 0] // Oscillation loop ±6px
          }}
          transition={{
            opacity: { delay: 1.4, duration: 0.8 }, // Fade in last at 1400ms
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="self-start px-4 py-1.5 border border-white/10 rounded-full text-[10px] md:text-xs font-medium tracking-[0.2em] text-[#9A9AB0] uppercase"
          style={{
            background: 'rgba(10, 10, 20, 0.5)',
            backdropFilter: 'blur(6px)'
          }}
        >
          ✦ Matunga • Dadar • Sion • Wadala
        </motionFramer.div>

        {/* Headline */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-[-0.03em] text-[#E8E8F0]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {/* Line 1 character mapping */}
          <div className="block mb-2">
            {line1.split("").map((char, index) => (
              <motionFramer.span
                key={index}
                custom={index}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="inline-block whitespace-pre"
              >
                {char}
              </motionFramer.span>
            ))}
          </div>

          {/* Line 2 character mapping (Accent electric violet and text shadow glow) */}
          <div className="block">
            {line2Accent.split("").map((char, index) => (
              <motionFramer.span
                key={index}
                custom={line1.length + index} // continue stagger index
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="inline-block whitespace-pre text-[#8B5CF6]"
                style={{
                  textShadow: '0 0 24px rgba(139,92,246,0.45)'
                }}
              >
                {char}
              </motionFramer.span>
            ))}
          </div>
        </h1>

        {/* Subheading */}
        <motionFramer.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.0 }} // fade in at 800ms over 1000ms
          className="max-w-xl text-sm md:text-base font-light text-[#9A9AB0] leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Elite architectural marvels and premium penthouse suites curated across Mumbai's high-rise skylines.
        </motionFramer.p>

        {/* Action Button Row */}
        <motionFramer.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }} // fade in at 1200ms
          className="flex flex-wrap gap-4 mt-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <a
            href="/properties"
            className="px-8 py-3.5 bg-[#8B5CF6] hover:bg-[#7c4ee4] text-[#05050A] text-xs uppercase font-bold tracking-widest rounded-lg transition-all shadow-[0_0_24px_rgba(139,92,246,0.25)] hover:shadow-[0_0_32px_rgba(139,92,246,0.45)]"
          >
            Explore Listings
          </a>
          <a
            href="#footer"
            className="px-8 py-3.5 bg-transparent border border-[#8B5CF6] hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-[#05050A] text-xs uppercase font-bold tracking-widest rounded-lg transition-all"
          >
            Schedule Briefing
          </a>
        </motionFramer.div>
      </div>

      {/* Downward drift scroll cue */}
      <motionFramer.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span style={{ color: '#9A9AB0', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Scroll</span>
        <motionFramer.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-7" 
          style={{ background: 'linear-gradient(to bottom, #8B5CF6, transparent)' }} 
        />
      </motionFramer.div>
    </section>
  );
};

export default Hero;
