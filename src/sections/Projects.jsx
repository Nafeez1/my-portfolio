import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

const ALL = "All";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(ALL);

  const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === ALL ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section
      id="projects"
      className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        className="absolute right-0 top-20 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl pointer-events-none"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <SectionReveal>
          <div className="mb-10">
            <p className="text-gold-primary text-xs font-semibold uppercase tracking-widest mb-3">
              What I've Built
            </p>
            <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Real-world projects spanning AI/ML, accessibility, safety tech, and web development — each built to solve a genuine problem.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
                  filter === cat
                    ? "bg-gold-primary text-black border-gold-primary"
                    : "border-gold-primary/30 text-text-secondary hover:border-gold-primary hover:text-gold-primary"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <motion.div
            ref={ref}
            className="grid gap-6 sm:grid-cols-2"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  isInView={isInView}
                  onClick={() => setSelected(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </SectionReveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl max-h-[88vh] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black-card/98 border border-gold-primary/40 shadow-glow-lg overflow-hidden">
                {/* Preview */}
                <div className="aspect-video bg-gradient-to-br from-gold-primary/10 to-gold-primary/5 flex items-center justify-center text-7xl relative">
                  {selected.image}
                  <div className="absolute top-3 right-3">
                    <span className="tag-primary text-xs">{selected.category}</span>
                  </div>
                </div>

                <div className="p-7 space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-text-primary">
                      {selected.title}
                    </h3>
                    <p className="text-xs text-gold-primary mt-1">
                      {[selected.duration, selected.role].filter(Boolean).join(" · ")}
                    </p>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed">
                    {selected.description}
                  </p>

                  {selected.features && (
                    <div>
                      <p className="text-xs font-semibold text-gold-primary uppercase tracking-wider mb-2">
                        Key Features
                      </p>
                      <ul className="space-y-1.5">
                        {selected.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-gold-primary mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold text-gold-primary uppercase tracking-wider mb-2">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map((t) => (
                        <span key={t} className="tag-secondary text-xs">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2 border-t border-gold-primary/20">
                    <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
                      Live Demo →
                    </a>
                    <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">
                      View Code
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="ml-auto text-text-secondary hover:text-text-primary text-sm transition-colors"
                    >
                      Close ✕
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, isInView, onClick }) {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group relative cursor-pointer overflow-hidden card"
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 140px at ${spotlight.x}% ${spotlight.y}%, rgba(255,215,0,0.12), transparent 70%)`,
        }}
      />

      {/* Image area */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gold-primary/10 to-gold-primary/5 rounded-lg mb-5">
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-6xl"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="opacity-60 group-hover:opacity-90 transition-opacity">
            {project.image}
          </span>
        </motion.div>
        <div className="absolute top-3 right-3">
          <span className="tag-primary text-xs">{project.category}</span>
        </div>
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-semibold text-gold-primary">Click to explore →</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-text-primary group-hover:text-gold-primary transition-colors">
            {project.title}
          </h3>
          {project.duration && (
            <p className="text-xs text-text-tertiary mt-0.5">{project.duration} · {project.role}</p>
          )}
        </div>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded border border-gold-primary/25 text-gold-primary bg-gold-primary/5">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded border border-gold-primary/20 text-text-tertiary">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
