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
    <section id="projects" className="border-t border-border bg-white py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionReveal>
          <h2 className="font-sans text-3xl font-semibold text-navy md:text-4xl">
            Projects
          </h2>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
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
              <p className="mt-4 text-body">{selected.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border px-2 py-1 text-xs text-muted"
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
                  className="text-sm font-medium text-navy no-underline hover:underline"
                >
                  Live
                </a>
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-navy no-underline hover:underline"
                >
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-sm font-medium text-muted hover:text-ink"
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

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="group relative cursor-pointer overflow-hidden rounded-card border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-card-hover"
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <div className="relative aspect-video overflow-hidden bg-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 100px at ${spotlight.x}% ${spotlight.y}%, rgba(31,42,68,0.06), transparent 65%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-warmGray"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-4xl opacity-40">📁</span>
        </motion.div>
      </div>
      <div className="border-t border-border p-5">
        <h3 className="font-sans text-lg font-semibold text-navy">
          {project.title}
        </h3>
        {(project.duration || project.role) && (
          <p className="mt-0.5 text-xs text-warmGray">
            {[project.duration, project.role].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-2 line-clamp-2 text-sm text-body">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}
