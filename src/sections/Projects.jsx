import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="projects" className="relative border-t border-gold-primary/20 py-24 md:py-32">
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl" />
      <div className="absolute left-0 bottom-20 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-8">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary">
            Explore my recent work in creative development, accessibility, and premium web design.
          </p>
          <div ref={ref} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isInView={isInView}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        </SectionReveal>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-card border border-gold-primary/20 bg-dark-card p-8 shadow-glow-gold"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-2xl font-bold text-text-primary">
                {selected.title}
              </h3>
              {(selected.duration || selected.role) && (
                <p className="mt-1 text-sm text-text-secondary">
                  {[selected.duration, selected.role].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="mt-4 leading-relaxed text-text-secondary">{selected.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-gold-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex gap-4">
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gold-primary no-underline transition-colors hover:text-gold-highlight"
                >
                  Live Demo →
                </a>
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gold-primary no-underline transition-colors hover:text-gold-highlight"
                >
                  GitHub →
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="ml-auto text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
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
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  // Project icons
  const icons = ['🧬', '📖', '🗺️'];

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative cursor-pointer overflow-hidden card transition-all duration-300 hover:-translate-y-2"
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gold-primary/10 to-gold-highlight/5 rounded-lg mb-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 120px at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.2), transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-6xl opacity-40 transition-opacity group-hover:opacity-60">
            {icons[index % 3]}
          </span>
        </motion.div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-gold-primary/0 transition-all duration-300 group-hover:bg-gold-primary/5">
          <span className="translate-y-4 text-sm font-medium text-gold-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Details →
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-serif text-lg font-semibold text-text-primary transition-colors group-hover:text-gold-primary">
            {project.title}
          </h3>
          {(project.duration || project.role) && (
            <p className="mt-1 text-xs text-text-secondary">
              {[project.duration, project.role].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="tag text-xs"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="tag text-xs">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
