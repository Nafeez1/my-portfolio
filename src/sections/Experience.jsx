import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function Experience() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height - winH;
      if (total <= 0) { setProgress(1); return; }
      const p = Math.max(0, Math.min(1, -(rect.top - winH * 0.5) / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionReveal>
          <div className="mb-12">
            <p className="text-gold-primary text-xs font-semibold uppercase tracking-widest mb-3">
              My Journey
            </p>
            <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary">
              Education
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative" ref={ref}>
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-gold-primary/15 md:left-1/2 md:-translate-x-px">
              <motion.div
                className="absolute inset-0 w-full bg-gradient-to-b from-gold-primary to-gold-primary/30"
                style={{ originY: 0 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: progress }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <ul className="w-full space-y-10 pl-12 md:pl-0">
              {experience.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex items-start gap-8 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className={`w-full max-w-lg card md:ml-0 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    {/* Badge row */}
                    <div className={`flex items-center gap-2 mb-3 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-primary/10 text-gold-primary border border-gold-primary/20">
                        🎓 Education
                      </span>
                      {item.grade && (
                        <span className="px-3 py-1 rounded-lg bg-gold-primary/15 border border-gold-primary/30 text-xs font-bold text-gold-primary">
                          {item.grade}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-text-primary leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-text-secondary mt-1">{item.org}</p>

                    <div className={`flex flex-wrap gap-3 mt-2 text-xs text-text-tertiary ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                      {item.location && <span>📍 {item.location}</span>}
                      <span>📅 {item.period}</span>
                    </div>

                    <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>

                    {/* Subject bars (HSC) */}
                    {item.subjects && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-semibold text-gold-primary uppercase tracking-wider">
                          Subject Scores
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {item.subjects.map((sub, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-text-secondary">{sub.name}</span>
                                <span className="text-gold-primary font-semibold">{sub.mark}</span>
                              </div>
                              <div className="h-1.5 w-full bg-black-surface rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-gold-primary to-gold-highlight rounded-full"
                                  initial={{ width: 0 }}
                                  animate={isInView ? { width: sub.mark } : {}}
                                  transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-5 h-4 w-4 rounded-full border-2 border-gold-primary bg-black-dark shadow-glow-sm md:left-1/2 md:-translate-x-1/2" />
                </motion.li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
