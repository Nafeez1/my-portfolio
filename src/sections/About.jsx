import { about } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

export default function About() {
  return (
    <section id="about" className="border-t border-border bg-white py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionReveal>
          <h2 className="font-sans text-3xl font-semibold text-navy md:text-4xl">
            About
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
            {about.bio}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {about.highlights.map((h, i) => (
              <span
                key={i}
                className="rounded-card border border-border bg-white px-4 py-2 text-sm font-medium text-body shadow-card"
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
