import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hero, resumeUrl } from "../data/portfolio";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Hero() {
  const portraitRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  const handleMouseMove = (e) => {
    if (reducedMotion || !portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 4, y: -x * 4 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 pt-28 pb-20 md:pt-36 md:pb-28"
      style={{
        background: 'linear-gradient(135deg, #FAFAF7 0%, #F5F3EF 50%, #FAFAF7 100%)'
      }}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <motion.h1
            className="font-serif text-4xl font-semibold tracking-name text-navy md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {hero.name}
          </motion.h1>
          <motion.p
            className="mt-4 font-sans text-lg text-navy md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
          >
            {hero.role}
          </motion.p>
          <motion.p
            className="mt-3 max-w-md font-sans text-body leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35 }}
          >
            {hero.tagline}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35 }}
          >
            <a
              href="#projects"
              className="btn-primary"
            >
              View Projects
            </a>
            <a
              href={resumeUrl}
              download="MOHAMED_NAFEEZ_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          ref={portraitRef}
          className="order-1 md:order-2 flex justify-center md:justify-end"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: reducedMotion ? "none" : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-card border-2 border-navy/20 bg-gradient-to-br from-navy/5 to-warmGray/5 shadow-card transition-all duration-300 hover:border-navy/40 hover:shadow-card-hover hover:-translate-y-1"
            style={{ maxHeight: "400px" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-navy to-[#2D3E5F] text-6xl text-white shadow-lg">
                <span className="font-serif">MN</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-navy">Mohamed Nafeez S</h3>
              <p className="mt-2 text-sm text-warmGray">Front End Developer</p>
              <div className="mt-4 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-navy animate-pulse" />
                <div className="h-2 w-2 rounded-full bg-navy animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="h-2 w-2 rounded-full bg-navy animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <p className="mt-4 text-xs text-muted italic">
                "Building accessible web experiences"
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warmGray"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-xs no-underline transition-colors hover:text-navy">
          <span>Scroll</span>
          <span className="block h-6 w-4 rounded-full border-2 border-current p-1">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="block h-1.5 w-1.5 rounded-full bg-current"
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
