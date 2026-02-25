import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hero, resumeUrl } from "../data/portfolio";
import GoldSphereScene from "../components/GoldSphereScene";

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
      className="relative min-h-screen px-6 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
    >
      {/* 3D Background Sphere */}
      <div className="absolute inset-0 top-0 left-0 w-full h-2/3">
        <GoldSphereScene />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16 relative z-10">
        {/* Left Content */}
        <div className="order-2 md:order-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-2"
          >
            <p className="text-gold-primary text-sm font-semibold tracking-widest uppercase">
              Front End Developer
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight">
              <span className="gradient-gold">{hero.name}</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-text-secondary max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {hero.role}
          </motion.p>

          <motion.p
            className="text-base text-text-secondary/80 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {[
              { label: "Experience", value: "5+ Years" },
              { label: "Projects", value: "20+" },
              { label: "Clients", value: "Global" },
            ].map((stat, i) => (
              <div key={i} className="card !p-4">
                <p className="text-gold-primary text-lg font-bold">{stat.value}</p>
                <p className="text-text-secondary text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - 3D Card Profile */}
        <motion.div
          ref={portraitRef}
          className="order-1 md:order-2 flex justify-center md:justify-end perspective"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: reducedMotion ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-sm">
            {/* Glow background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-primary/30 via-gold-highlight/20 to-gold-primary/30 rounded-2xl blur-2xl opacity-60 animate-pulse" />
            
            {/* Card */}
            <div className="card relative !p-0 overflow-hidden min-h-96 flex flex-col justify-between">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
              
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-primary/30 to-gold-highlight/20 border-2 border-gold-primary/50 flex items-center justify-center">
                    <span className="text-4xl font-serif font-bold text-gold-primary">MN</span>
                  </div>
                </div>

                {/* Main content */}
                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-serif font-bold text-text-primary">
                    Mohamed Nafeez S
                  </h3>
                  <p className="text-gold-primary text-sm font-semibold uppercase tracking-widest">
                    Senior Frontend Developer
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Crafting premium digital experiences with modern web technologies and luxury design principles.
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-8 space-y-4 border-t border-gold-primary/20">
                <button className="btn-primary w-full text-sm">
                  Start a Project
                </button>
                <a
                  href="#contact"
                  className="block text-center text-text-secondary text-xs hover:text-gold-primary transition-colors"
                >
                  Get in Touch →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-xs no-underline transition-colors hover:text-gold-primary">
          <span>Explore</span>
          <span className="block h-6 w-4 rounded-full border border-current p-1">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="block h-1.5 w-1 rounded-full bg-current mx-auto"
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
