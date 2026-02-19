import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, certificates, achievements } from "../data/portfolio";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative py-20 md:py-24" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container mx-auto max-w-5xl px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center text-3xl font-semibold"
          style={{ color: '#111827' }}
        >
          Experience & Education
        </motion.h2>

        <div className="relative">
          <div 
            className="absolute left-4 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-px" 
            style={{ backgroundColor: '#e5e7eb' }}
          />
          <ul className="space-y-8">
            {experience.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex md:flex-row md:items-center md:gap-8"
              >
                <div
                  className={`flex flex-1 md:justify-end ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <div
                    className={`card max-w-md ${
                      i % 2 === 1 ? "md:text-left" : "md:text-right md:ml-auto"
                    }`}
                  >
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        item.type === "work"
                          ? "tag-primary"
                          : "border"
                      }`}
                      style={item.type !== "work" ? { 
                        backgroundColor: '#f0fdf4', 
                        color: '#15803d',
                        borderColor: '#bbf7d0'
                      } : {}}
                    >
                      {item.type === "work" ? "Work" : "Education"}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold" style={{ color: '#111827' }}>{item.title}</h3>
                    <p className="font-medium" style={{ color: '#2563eb' }}>{item.org}</p>
                    {item.location && (
                      <p className="text-xs" style={{ color: '#6b7280' }}>{item.location}</p>
                    )}
                    <p className="mt-1 text-sm" style={{ color: '#6b7280' }}>{item.period}</p>
                    <p className="mt-2 text-sm" style={{ color: '#374151' }}>{item.description}</p>
                  </div>
                </div>
                <div 
                  className="absolute left-4 h-3 w-3 rounded-full border-2 md:left-1/2 md:-translate-x-1/2" 
                  style={{ 
                    borderColor: '#2563eb',
                    backgroundColor: '#f9fafb'
                  }}
                />
                <div className="flex-1 md:order-1" />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Certificates & Achievements */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="card"
          >
            <h3 className="mb-4 text-lg font-semibold" style={{ color: '#111827' }}>
              Certificates
            </h3>
            <ul className="space-y-2">
              {certificates.map((c, i) => (
                <li key={i} className="text-sm" style={{ color: '#374151' }}>
                  <span style={{ color: '#2563eb' }}>•</span> {c}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="card"
          >
            <h3 className="mb-4 text-lg font-semibold" style={{ color: '#111827' }}>
              Achievements
            </h3>
            <ul className="space-y-2">
              {achievements.map((a, i) => (
                <li key={i} className="text-sm" style={{ color: '#374151' }}>
                  <span style={{ color: '#2563eb' }}>•</span> {a}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
