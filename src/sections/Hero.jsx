import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hero, about } from "../data/portfolio";
import GoldSphereScene from "../components/GoldSphereScene";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ROLES = [
  "Front End Developer",
  "React Specialist",
  "UI/UX Enthusiast",
  "AI/ML Builder",
];

export default function Hero() {
  const portraitRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e) => {
    if (reducedMotion || !portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 6, y: -x * 6 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <GoldSphereScene />
        </div>
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold-primary/8 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gold-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl w-full items-center gap-12 md:grid-cols-2 md:gap-16 relative z-10">
        {/* ── Left: Text Content ── */}
        <motion.div
          className="order-2 md:order-1 space-y-7"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="tag-primary text-xs tracking-widest uppercase">
              Available for Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item} className="space-y-3">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.05]">
              <span className="gradient-gold block">{hero.name}</span>
            </h1>
            <motion.div
              className="h-[3px] w-16 bg-gradient-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Animated Role */}
          <motion.div variants={item} className="h-8 overflow-hidden">
            <motion.p
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-2xl text-gold-primary font-medium"
            >
              {ROLES[roleIndex]}
            </motion.p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-text-secondary leading-relaxed max-w-lg"
          >
            {hero.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <a href="#projects" className="btn-primary group">
              <span>View Projects</span>
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
            <a
              href={hero.resumeUrl}
              download="Mohamed_Nafeez_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download Resume
            </a>
            <a href="#contact" className="btn-glass">
              Contact Me
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-3 gap-3 pt-4 max-w-sm">
            {about.stats.map((s, i) => (
              <motion.div
                key={i}
                className="card !p-4 text-center"
                whileHover={{ y: -4, boxShadow: "0 0 20px rgba(255,215,0,0.3)" }}
              >
                <p className="text-gold-primary text-xl font-bold">{s.value}</p>
                <p className="text-text-secondary text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Profile Card ── */}
        <motion.div
          ref={portraitRef}
          className="order-1 md:order-2 flex justify-center md:justify-end"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: reducedMotion
              ? "none"
              : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <div className="relative w-full max-w-[320px]">
            {/* Glow halo */}
            <motion.div
              className="absolute -inset-2 bg-gradient-gold rounded-2xl blur-2xl opacity-15"
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="card relative !p-0 overflow-hidden border-gold-primary/30 shadow-glow-lg">
              {/* Top bar */}
              <motion.div
                className="h-1 w-full bg-gradient-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, transformOrigin: "left" }}
              />

              <div className="p-8 space-y-5">
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gold-primary shadow-glow-md">
                    {!imgError ? (
                      <img
                        src="/profile.png"
                        alt="Mohamed Nafeez S"
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-gold-dark flex items-center justify-center">
                        <span className="text-4xl font-serif font-bold text-black">MN</span>
                      </div>
                    )}
                    {/* Rotating ring */}
                    <motion.div
                      className="absolute -inset-1 rounded-full border border-dashed border-gold-primary/40"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-serif font-bold text-text-primary">
                    Mohamed Nafeez S
                  </h3>
                  <p className="text-sm text-gold-primary font-medium">Front End Developer</p>
                  <p className="text-xs text-text-secondary">
                    B.Tech CSE · Puducherry, India
                  </p>
                </div>

                {/* Quick links */}
                <div className="flex gap-3 justify-center pt-2">
                  <a
                    href="https://github.com/Nafeez1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass text-xs px-3 py-1.5"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/nafeez-s-836636377"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass text-xs px-3 py-1.5"
                  >
                    LinkedIn
                  </a>
                </div>

                {/* CTA */}
                <a href="#contact" className="btn-primary w-full text-sm text-center block">
                  Start a Project
                </a>
              </div>

              {/* Bottom shimmer */}
              <motion.div
                className="h-px w-full bg-gradient-to-r from-transparent via-gold-primary to-transparent"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 no-underline"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to About"
      >
        <span className="text-xs text-text-tertiary uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold-primary to-transparent" />
      </motion.a>
    </section>
  );
}
