import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../data/portfolio";

const categories = [
  { key: "programming", label: "Programming Languages" },
  { key: "technologies", label: "Technologies & Tools" },
  { key: "frontend", label: "Web & Front End" },
  { key: "tools", label: "Tools" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-20 md:py-24" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container mx-auto max-w-5xl px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center text-3xl font-semibold"
          style={{ color: '#111827' }}
        >
          Skills & Expertise
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.key}
              custom={catIndex}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="card"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>
                  {cat.label}
                </h3>
              </div>
              <ul className="space-y-2">
                {skills[cat.key].map((skill, i) => (
                  <li
                    key={i}
                    className="text-sm flex items-center gap-2"
                    style={{ color: '#374151' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#2563eb' }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
