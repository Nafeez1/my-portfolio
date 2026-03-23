import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hero } from "../data/portfolio";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 top-0 left-0 w-full h-2/3 opacity-40">
          <GoldSphereScene />
        </div>
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gold-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16 relative z-10">
        <motion.div
          className="order-2 md:order-1 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="tag-primary">
              Frontend Developer and Creative Engineer
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              <span className="gradient-gold block">Mohamed Nafeez S</span>
            </h1>
            <motion.div
              className="h-1 w-20 bg-gradient-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-text-secondary font-light max-w-xl leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6">
            <a href="#projects" className="btn-primary group">
              <span>View My Work</span>
              <span className="group-hover:translate-x-1 transition-transform">
                {" "}
                &rarr;
              </span>
            </a>
            <a
              href="/resume.pdf"
              download="MOHAMED_NAFEEZ_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 pt-8 max-w-md"
          >
            {[
              { label: "Experience", value: "5+ Years" },
              { label: "Projects", value: "20+" },
              { label: "Clients", value: "Global" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="card !p-4 text-center group hover:shadow-glow-md"
                whileHover={{ y: -4 }}
              >
                <p className="text-gold-primary text-lg md:text-xl font-bold group-hover:text-gold-light transition-colors">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-xs mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-4">
            <a
              href="https://github.com/Nafeez1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass text-lg hover:shadow-glow-md transition-all"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/nafeez-s-836636377"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass text-lg hover:shadow-glow-md transition-all"
            >
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          ref={portraitRef}
          className="order-1 md:order-2 flex justify-center md:justify-end perspective"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: reducedMotion
              ? "none"
              : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-full max-w-sm">
            <motion.div
              className="absolute -inset-1 bg-gradient-gold rounded-2xl blur-3xl opacity-20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="card relative !p-0 overflow-hidden min-h-96 flex flex-col justify-between backdrop-blur-xl border-gold-primary/40 shadow-glow-lg">
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />

              <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
                <div className="flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gold-primary shadow-glow-md relative">
                    <img
                      src="/profile.png"
                      alt="Mohamed Nafeez S"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.parentElement.querySelector(".fallback-initials");
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="fallback-initials absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-700 items-center justify-center"
                      style={{ display: "none" }}
                    >
                      <span className="text-4xl font-serif font-bold text-black">MN</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-center">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-text-primary">
                    Mohamed Nafeez S
                  </h3>
                  <p className="text-sm text-gold-primary font-medium">
                    Frontend Developer
                  </p>
                  <p className="text-xs text-text-secondary">
                    Creative Engineering and Premium Web Design
                  </p>
                </div>

                <div className="pt-4 space-y-3 border-t border-gold-primary/20">
                  <a
                    href="#contact"
                    className="btn-primary w-full text-sm text-center block"
                  >
                    Start a Project
                  </a>
                  <a
                    href="#contact"
                    className="block text-center text-text-secondary text-xs hover:text-gold-primary transition-colors"
                  >
                    Get in Touch &rarr;
                  </a>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-text-secondary uppercase tracking-widest">
          Scroll to explore
        </span>
        <motion.div className="w-px h-8 bg-gradient-to-b from-gold-primary to-transparent" />
      </motion.div>
    </section>
  );
}
