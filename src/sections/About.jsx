import { about } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  return (
    <section id="about" className="relative border-t border-gold-primary/20 py-24 md:py-32">      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-8">
            About Me
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
            {about.bio}
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            {about.highlights.map((h, i) => (
              <span
                key={i}
                className="tag-primary"
              >
                {h}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
