import { about } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 md:py-32" style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)'
    }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #E5E7EB 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionReveal>
          <h2 className="section-title font-sans text-3xl font-semibold text-navy md:text-4xl">
            About Me
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-body">
            {about.bio}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {about.highlights.map((h, i) => (
              <span
                key={i}
                className="tag"
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
