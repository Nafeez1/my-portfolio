import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

const groups = [
  { key: "programming", label: "Programming", icon: "💻" },
  { key: "frontend", label: "Frontend", icon: "🎨" },
  { key: "technologies", label: "Technologies", icon: "⚙️" },
  { key: "tools", label: "Tools", icon: "🛠️" },
];

function SkillItem({ skill, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <span className="relative inline-block text-text-secondary group-hover:text-gold-primary transition-colors duration-300">
        {skill}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-primary transition-all duration-300 group-hover:w-full" />
      </span>
    </motion.li>
  );
}

function SkillCard({ group }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="card group hover:shadow-glow-md overflow-hidden"
      whileHover={{ y: -4 }}
    >
      {/* Icon */}
      <motion.div
        className="text-4xl mb-4"
        animate={isInView ? { rotate: 360 } : {}}
        transition={{ duration: 0.8 }}
      >
        {group.icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-primary mb-6">
        {group.label}
      </h3>

      {/* Skills List */}
      <ul className="space-y-2.5">
        {(skills[group.key] || []).map((skill, i) => (
          <SkillItem key={i} skill={skill} index={i} />
        ))}
      </ul>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/0 via-gold-primary/5 to-gold-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-gold-primary/5 blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 right-10 h-96 w-96 rounded-full bg-gold-primary/3 blur-3xl"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Skills & Expertise
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Proficient across the full stack with expertise in modern frameworks, design systems, and performance optimization.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {groups.map((g) => (
              <SkillCard key={g.key} group={g} />
            ))}
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
