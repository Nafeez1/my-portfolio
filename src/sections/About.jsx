import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { about } from "../data/portfolio";
import AnimatedList from "../components/AnimatedList";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [40, -40]);

  return (
    <section id="about" className="relative py-20 md:py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="container relative mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          style={{ y }}
          className="card"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-6 text-3xl font-semibold"
            style={{ color: '#111827' }}
          >
            About Me
          </motion.h2>

          <div className="grid gap-8 lg:grid-cols-[1fr,minmax(280px,400px)] lg:items-start">
            <div className="min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-8 leading-relaxed"
                style={{ color: '#374151' }}
              >
                {about.bio}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                {about.highlights.map((h, i) => (
                  <span key={i} className="tag-primary">
                    {h}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="scroll-list-wrapper w-full max-w-[500px] lg:max-w-none shrink-0"
            >
              <p className="mb-3 text-sm font-medium" style={{ color: '#6b7280' }}>
                Focus areas
              </p>
              <AnimatedList
                items={about.listItems}
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={true}
                className="w-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
