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
    <section id="projects" className="relative border-t border-gold-primary/20 py-24 md:py-32 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute right-0 top-20 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-0 bottom-20 h-80 w-80 rounded-full bg-gold-primary/5 blur-3xl"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Featured Projects
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-text-secondary">
              Curated selection of projects showcasing expertise in creative development, 3D experiences, and premium UI/UX design.
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isInView={isInView}
                onClick={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </SectionReveal>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black-dark/70 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black-card/95 border border-gold-primary/40 shadow-glow-lg overflow-hidden">
                {/* Header Glow */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold-primary/20 to-transparent blur-2xl pointer-events-none" />

                <div className="relative p-8 space-y-6">
                  {/* Project Icon/Preview */}
                  <div className="aspect-video bg-gradient-to-br from-gold-primary/10 to-gold-primary/5 rounded-xl flex items-center justify-center text-6xl overflow-hidden relative">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selected.image}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <h3 className="font-serif text-3xl font-bold text-text-primary">
                      {selected.title}
                    </h3>
                    {(selected.duration || selected.role) && (
                      <p className="text-sm text-gold-primary font-medium">
                        {[selected.duration, selected.role].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="leading-relaxed text-text-secondary text-base"
                  >
                    {selected.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <h4 className="text-sm font-medium text-gold-primary uppercase tracking-wider">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map((t) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="tag-secondary"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-wrap gap-3 pt-4 border-t border-gold-primary/20"
                  >
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      Live Demo →
                    </a>
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm"
                    >
                      View Code
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="ml-auto px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary transition-colors font-medium"
                    >
                      Close
                    </button>
                  </motion.div>
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
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative cursor-pointer overflow-hidden card transition-all duration-300"
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      {/* Preview Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gold-primary/10 to-gold-highlight/5 rounded-lg mb-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 120px at ${spotlight.x}% ${spotlight.y}%, rgba(255, 215, 0, 0.3), transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity">
            {project.image}
          </span>
        </motion.div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 tag-secondary text-xs">
          {project.category}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-300 flex items-end p-4">
          <span className="text-xs font-semibold text-gold-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Click to explore →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 relative z-10">
        <div>
          <h3 className="font-serif text-xl font-semibold text-text-primary group-hover:text-gold-primary transition-colors">
            {project.title}
          </h3>
          {project.duration && (
            <p className="text-xs text-text-secondary mt-1">{project.duration}</p>
          )}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary group-hover:text-text-secondary transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.slice(0, 3).map((t) => (
            <motion.span
              key={t}
              className="text-xs px-2 py-1 rounded border border-gold-primary/30 text-gold-primary bg-gold-primary/5 group-hover:bg-gold-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {t}
            </motion.span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-1 rounded border border-gold-primary/30 text-gold-primary/70">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/0 via-gold-primary/5 to-gold-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.article>
  );
}
