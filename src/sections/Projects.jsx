import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

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
    <section id="projects" className="relative py-20 md:py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto max-w-5xl px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center text-3xl font-semibold"
          style={{ color: '#111827' }}
        >
          Projects
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="card cursor-pointer"
              onClick={() => setSelected(project)}
            >
              <div 
                className="aspect-video rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
              >
                <span className="text-4xl" style={{ opacity: 0.4 }}>📁</span>
              </div>
              <h3 
                className="mb-1 text-xl font-semibold transition-colors"
                style={{ color: '#111827' }}
                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                onMouseLeave={(e) => e.target.style.color = '#111827'}
              >
                {project.title}
              </h3>
              {(project.duration || project.role) && (
                <p className="mb-2 text-xs font-medium" style={{ color: '#2563eb' }}>
                  {[project.duration, project.role].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="mb-4 line-clamp-2 text-sm" style={{ color: '#6b7280' }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="tag text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-[90vh] w-full max-w-lg overflow-auto card"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-1 text-2xl font-semibold" style={{ color: '#111827' }}>{selected.title}</h3>
              {(selected.duration || selected.role) && (
                <p className="mb-3 text-sm font-medium" style={{ color: '#2563eb' }}>
                  {[selected.duration, selected.role].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="mb-4" style={{ color: '#374151' }}>{selected.description}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span key={t} className="tag-primary text-sm">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  Live
                </a>
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  GitHub
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="btn-secondary text-sm"
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
