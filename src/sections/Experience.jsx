import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { experience, certificates, achievements } from "../data/portfolio";
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
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const start = rect.top - winH * 0.5;
      const p = Math.max(0, Math.min(1, -start / total));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative border-t border-gold-primary/20 py-24 md:py-32"
    >
      <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gold-primary/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-8">
            Experience & Education
          </h2>

          <div className="relative mt-12 flex">
            <div className="absolute left-[11px] top-0 h-full w-px bg-gold-primary/20 md:left-1/2 md:-translate-x-px">
              <motion.div
                className="absolute inset-0 w-full bg-gold-primary"
                style={{ originY: 0 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: progress }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <ul className="w-full space-y-10">
              {experience.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="relative z-10 ml-6 w-full max-w-md card md:ml-0">
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                          item.type === "work" 
                            ? "bg-gold-primary/10 text-gold-primary" 
                            : "bg-gold-primary/10 text-gold-primary"
                        }`}
                      >
                        {item.type === "work" ? "💼 Work" : "🎓 Education"}
                      </span>
                      {item.grade && (
                        <span className="rounded-lg bg-gold-primary/20 border border-gold-primary px-3 py-1 text-sm font-semibold text-gold-primary">
                          {item.grade}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-medium text-text-secondary">{item.org}</p>
                    {item.location && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
                        <span>📍</span>
                        {item.location}
                      </p>
                    )}
                    <p className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
                      <span>📅</span>
                      {item.period}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                    
                    {item.subjects && item.subjects.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                          Key Subjects
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {item.subjects.map((subject, idx) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden rounded-lg border border-gold-primary/20 bg-gradient-to-br from-gold-primary/10 to-gold-highlight/5 p-3 transition-all hover:border-gold-primary hover:shadow-glow-gold"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-text-secondary">
                                  {subject.name}
                                </span>
                                <span className="text-xs font-bold text-gold-primary">
                                  {subject.mark}
                                </span>
                              </div>
                              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-dark-card border border-gold-primary/20">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-gold-primary to-gold-highlight transition-all duration-500"
                                  style={{ width: subject.mark }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-0 top-6 h-[14px] w-[14px] shrink-0 rounded-full border-2 border-gold-primary bg-dark-bg shadow-glow-gold md:left-1/2 md:-translate-x-1/2" />
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-primary/10 border border-gold-primary/30">
                  <span className="text-xl">🎓</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-text-primary">
                  Certificates
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-text-secondary">
                {certificates.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-primary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-primary/10 border border-gold-primary/30">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-text-primary">
                  Achievements
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-text-secondary">
                {achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-primary" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
