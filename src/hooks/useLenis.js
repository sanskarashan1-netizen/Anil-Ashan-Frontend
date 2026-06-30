import { useEffect } from 'react';

export const useLenis = () => {
  useEffect(() => {
    let lenis;
    let rafId;

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({ duration: 1.4 });
        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      } catch (e) {
        console.warn('Lenis/GSAP init error:', e);
      }
    };

    init();

    return () => {
      try { lenis?.destroy(); } catch (_) {}
    };
  }, []);
};
