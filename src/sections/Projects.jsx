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
    <section id="projects" className="relative border-t border-border py-24 md:py-32" style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)'
    }}>
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-navy/5 blur-3xl" />
      <div className="absolute left-0 bottom-20 h-80 w-80 rounded-full bg-warmGray/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionReveal>
          <h2 className="section-title font-sans text-3xl font-semibold text-navy md:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-body">
            Explore my recent work in deep learning, accessibility, and web development.
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-card border border-border bg-white p-8 shadow-card-hover"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-sans text-2xl font-semibold text-navy">
                {selected.title}
              </h3>
              {(selected.duration || selected.role) && (
                <p className="mt-1 text-sm text-warmGray">
                  {[selected.duration, selected.role].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="mt-4 leading-relaxed text-body">{selected.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border bg-cream px-3 py-1 text-xs text-muted"
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
                  className="text-sm font-medium text-navy no-underline transition-colors hover:text-navy/70"
                >
                  Live Demo →
                </a>
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-navy no-underline transition-colors hover:text-navy/70"
                >
                  GitHub →
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="ml-auto text-sm font-medium text-muted transition-colors hover:text-ink"
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

  // Project-specific gradient colors
  const gradients = [
    'from-blue-50 to-indigo-50',
    'from-green-50 to-emerald-50',
    'from-purple-50 to-pink-50',
  ];

  // Project icons
  const icons = ['🧬', '📖', '🗺️'];

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative cursor-pointer overflow-hidden rounded-card border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-navy/20 hover:shadow-card-hover"
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${gradients[index % 3]}`}>
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 120px at ${spotlight.x}% ${spotlight.y}%, rgba(31,42,68,0.08), transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-6xl opacity-60 transition-opacity group-hover:opacity-80">
            {icons[index % 3]}
          </span>
        </motion.div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-all duration-300 group-hover:bg-navy/5">
          <span className="translate-y-4 text-sm font-medium text-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Details →
          </span>
        </div>
      </div>
      <div className="border-t border-border p-6">
        <h3 className="font-sans text-lg font-semibold text-navy transition-colors group-hover:text-navy/80">
          {project.title}
        </h3>
        {(project.duration || project.role) && (
          <p className="mt-1 text-xs text-warmGray">
            {[project.duration, project.role].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-body">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-cream px-2 py-1 text-xs text-muted"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="rounded border border-border bg-cream px-2 py-1 text-xs text-muted">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
