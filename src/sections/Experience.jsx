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
      className="border-t border-border bg-cream py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionReveal>
          <h2 className="font-sans text-3xl font-semibold text-navy md:text-4xl">
            Experience & Education
          </h2>

          <div className="relative mt-12 flex">
            <div className="absolute left-[11px] top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px">
              <motion.div
                className="absolute inset-0 w-full bg-navy"
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
                  <div className="relative z-10 ml-6 w-full max-w-md rounded-card border border-border bg-white p-6 shadow-card md:ml-0">
                    <span
                      className={`inline-block text-xs font-medium uppercase tracking-wider ${
                        item.type === "work" ? "text-navy" : "text-warmGray"
                      }`}
                    >
                      {item.type === "work" ? "Work" : "Education"}
                    </span>
                    <h3 className="mt-2 font-sans text-lg font-semibold text-navy">
                      {item.title}
                    </h3>
                    <p className="text-body">{item.org}</p>
                    {item.location && (
                      <p className="text-xs text-muted">{item.location}</p>
                    )}
                    <p className="mt-1 text-sm text-muted">{item.period}</p>
                    <p className="mt-2 text-sm text-body">{item.description}</p>
                  </div>
                  <div className="absolute left-0 top-6 h-[14px] w-[14px] shrink-0 rounded-full border-2 border-navy bg-white md:left-1/2 md:-translate-x-1/2" />
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <div className="rounded-card border border-border bg-white p-6 shadow-card">
              <h3 className="font-sans text-lg font-semibold text-navy">
                Certificates
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {certificates.map((c, i) => (
                  <li key={i}>· {c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border bg-white p-6 shadow-card">
              <h3 className="font-sans text-lg font-semibold text-navy">
                Achievements
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {achievements.map((a, i) => (
                  <li key={i}>· {a}</li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
