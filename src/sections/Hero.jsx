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

  const nameChars = hero.name.split("");

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-cream px-6 pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <motion.h1
            className="font-name text-4xl font-semibold tracking-name text-navy md:text-5xl lg:text-6xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.025, delayChildren: 0.08 } },
              hidden: {},
            }}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mt-4 font-sans text-lg text-navy md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35 }}
          >
            {hero.role}
          </motion.p>
          <motion.p
            className="mt-3 max-w-md font-sans text-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.35 }}
          >
            {hero.tagline}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.35 }}
          >
            <a
              href="#projects"
              className="inline-block border border-navy bg-navy px-6 py-3 text-sm font-medium text-white no-underline transition-all duration-200 hover:bg-[#182538] hover:shadow-card-hover hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href={resumeUrl}
              download="MOHAMED_NAFEEZ_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-border bg-transparent px-6 py-3 text-sm font-medium text-navy no-underline transition-all duration-200 hover:border-navy hover:-translate-y-0.5"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <div
            className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-card border border-border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            style={{ maxHeight: "400px" }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-warmGray">
              <span className="text-sm">Your photo</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warmGray"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-xs no-underline">
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
