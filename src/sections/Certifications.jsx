import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { certificates, achievements } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certifications"
      className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        className="absolute top-20 right-10 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl pointer-events-none"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10" ref={ref}>
        <SectionReveal>
          <div className="mb-12">
            <p className="text-gold-primary text-xs font-semibold uppercase tracking-widest mb-3">
              Credentials & Recognition
            </p>
            <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary">
              Certifications & Achievements
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Certifications */}
            <div>
              <h3 className="text-sm font-semibold text-gold-primary uppercase tracking-widest mb-5 flex items-center gap-2">
                <span>🎓</span> Certifications
              </h3>
              <div className="space-y-4">
                {certificates.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4, boxShadow: "0 0 20px rgba(255,215,0,0.2)" }}
                    className="card flex items-start gap-4 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} border border-gold-primary/20 flex items-center justify-center text-2xl flex-shrink-0`}>
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-text-primary group-hover:text-gold-primary transition-colors leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5">{cert.issuer} · {cert.year}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-gold-primary/10 text-gold-primary border border-gold-primary/20">
                        {cert.score}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-sm font-semibold text-gold-primary uppercase tracking-widest mb-5 flex items-center gap-2">
                <span>🏆</span> Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: -4, boxShadow: "0 0 20px rgba(255,215,0,0.2)" }}
                    className="card group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{ach.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-text-primary group-hover:text-gold-primary transition-colors">
                            {ach.title}
                          </h4>
                          <span className="text-xs text-text-tertiary">{ach.year}</span>
                        </div>
                        <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
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
