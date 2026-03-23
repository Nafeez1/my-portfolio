import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

function SkillCard({ groupKey, group, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="card group overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-xl group-hover:bg-gold-primary/20 transition-colors">
          {group.icon}
        </div>
        <h3 className="text-sm font-semibold text-gold-primary uppercase tracking-widest">
          {group.label}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill, i) => (
          <motion.span
            key={i}
            className="skill-tag text-xs"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.08 + i * 0.04 }}
            whileHover={{ scale: 1.08 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {/* Hover shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/0 via-gold-primary/5 to-gold-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl pointer-events-none"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-gold-primary text-xs font-semibold uppercase tracking-widest mb-3">
              Technical Expertise
            </p>
            <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Skills & Technologies
            </h2>
            <p className="text-text-secondary max-w-2xl">
              A broad skill set spanning frontend development, backend systems, AI/ML, and data analytics — built through real projects and continuous learning.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([key, group], i) => (
              <SkillCard key={key} groupKey={key} group={group} index={i} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
