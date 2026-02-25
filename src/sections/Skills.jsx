import { skills } from "../data/portfolio";
import SectionReveal from "../components/SectionReveal";

const groups = [
  { key: "programming", label: "Programming" },
  { key: "technologies", label: "Technologies & Tools" },
  { key: "frontend", label: "Web & Front End" },
  { key: "tools", label: "Tools" },
];

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-gold-primary/20 py-24 md:py-32">
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-gold-primary/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionReveal>
          <h2 className="section-title font-serif text-4xl md:text-5xl font-bold text-text-primary mb-8">
            Skills & Expertise
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.key} className="card">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-primary mb-6">
                  {g.label}
                </h3>
                <ul className="space-y-3">
                  {(skills[g.key] || []).map((skill, i) => (
                    <li key={i}>
                      <SkillLink>{skill}</SkillLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function SkillLink({ children }) {
  return (
    <span className="group relative inline-block">
      <span className="text-text-secondary transition-colors group-hover:text-gold-primary">
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-primary transition-all duration-300 group-hover:w-full" />
    </span>
  );
}
      <span
        className="absolute bottom-0 left-0 h-px w-0 bg-navy transition-[width] duration-300 group-hover:w-full"
        aria-hidden
      />
    </span>
  );
}
