import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { about } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <SectionReveal>
          <div ref={ref} className="grid gap-14 md:grid-cols-2 items-start">
            {/* Left */}
            <div className="space-y-6">
              <div>
                <p className="text-gold-primary text-xs font-semibold uppercase tracking-widest mb-3">
                  Who I Am
                </p>
                <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary">
                  About Me
                </h2>
              </div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-text-secondary leading-relaxed text-base"
              >
                {about.bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card border-l-2 border-l-gold-primary !rounded-l-none"
              >
                <p className="text-xs text-gold-primary font-semibold uppercase tracking-widest mb-2">
                  Career Objective
                </p>
                <p className="text-text-secondary text-sm leading-relaxed italic">
                  "{about.objective}"
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {about.highlights.map((h, i) => (
                  <motion.span
                    key={i}
                    className="tag-primary text-xs"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {h}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {about.stats.map((s, i) => (
                  <motion.div
                    key={i}
                    className="card !p-5 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ y: -4, boxShadow: "0 0 20px rgba(255,215,0,0.25)" }}
                  >
                    <p className="text-gold-primary text-2xl font-bold">{s.value}</p>
                    <p className="text-text-secondary text-xs mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* What I bring */}
              <div className="card space-y-4">
                <h3 className="text-sm font-semibold text-gold-primary uppercase tracking-widest">
                  What I Bring
                </h3>
                {[
                  { icon: "⚡", title: "Fast Learner", desc: "Quickly adapts to new technologies and frameworks." },
                  { icon: "🎯", title: "Problem Solver", desc: "Breaks complex challenges into clean, elegant solutions." },
                  { icon: "🤝", title: "Team Player", desc: "Collaborative mindset with strong communication skills." },
                  { icon: "🔍", title: "Detail Oriented", desc: "Pixel-perfect UI with a focus on performance and accessibility." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-text-primary text-sm font-semibold group-hover:text-gold-primary transition-colors">
                        {item.title}
                      </p>
                      <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
