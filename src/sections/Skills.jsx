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
    <section id="skills" className="border-t border-border bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionReveal>
          <h2 className="font-sans text-3xl font-semibold text-navy md:text-4xl">
            Skills
          </h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.key}>
                <h3 className="text-xs font-medium uppercase tracking-wider text-warmGray">
                  {g.label}
                </h3>
                <ul className="mt-4 space-y-3">
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
      <span className="text-body transition-colors group-hover:text-ink">
        {children}
      </span>
      <span
        className="absolute bottom-0 left-0 h-px w-0 bg-navy transition-[width] duration-300 group-hover:w-full"
        aria-hidden
      />
    </span>
  );
}
