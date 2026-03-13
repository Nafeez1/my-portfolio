import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { about } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-40 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-96 h-96 bg-gold-primary/3 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <SectionReveal>
          <div ref={ref} className="grid gap-12 md:grid-cols-2">
            {/* Left - Content */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div>
                <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6">
                  About Me
                </h2>
              </div>

              <motion.p
                variants={itemVariants}
                className="text-lg leading-relaxed text-text-secondary"
              >
                {about.bio}
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-semibold text-gold-primary">Core Strengths</h3>
                <ul className="space-y-3">
                  {["Creative Problem Solving", "Performance Optimization", "User Experience Design", "Modern Web Technologies"].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-text-secondary group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-gold-primary group-hover:shadow-glow-sm" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right - Glassmorphic Cards */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {about.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="card group overflow-hidden"
                >
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 text-gold-primary font-semibold mb-2">
                      <span className="text-xl">✨</span>
                    </span>
                    <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                      {highlight}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/0 via-gold-primary/5 to-gold-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
