import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { hero, resumeUrl } from "../data/portfolio";

const Scene3D = lazy(() =>
  import("../components/Scene3D").catch(() => ({ default: () => null }))
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Hero({ enable3D = true }) {

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-16"
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #dbeafe 50%, #e0f2fe 100%)'
      }}
    >
      {/* 3D background — lazy-loaded and optional */}
      {enable3D && (
        <Suspense fallback={<div className="absolute inset-0 z-0" />}>
          <Scene3D />
        </Suspense>
      )}

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-[1fr,auto] gap-12 md:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl font-bold"
              style={{ color: '#1c1917' }}
            >
              {hero.name}
            </motion.h1>
            
            <motion.p
              variants={item}
              className="text-xl md:text-2xl font-medium"
              style={{ color: '#0891b2' }}
            >
              {hero.role}
            </motion.p>
            
            <motion.p
              variants={item}
              className="text-base md:text-lg max-w-xl leading-relaxed"
              style={{ color: '#44403c' }}
            >
              {hero.tagline}
            </motion.p>
            
            <motion.div
              variants={item}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a href="#projects" className="btn-primary">
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
          </motion.div>
          
          {/* Right: Professional Profile Image */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <img
                src="/profile.jpg"
                alt={hero.name}
                className="w-full h-full object-cover"
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  border: '3px solid #ffffff'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div 
                className="hidden w-full h-full items-center justify-center text-white text-6xl md:text-7xl font-semibold"
                style={{ 
                  display: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  border: '3px solid #ffffff'
                }}
              >
                {hero.name.charAt(0)}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-6"
        >
          <a 
            href="#about" 
            className="text-sm font-medium transition-colors"
            style={{ color: '#78716c' }}
            onMouseEnter={(e) => e.target.style.color = '#0891b2'}
            onMouseLeave={(e) => e.target.style.color = '#78716c'}
          >
            Scroll ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
