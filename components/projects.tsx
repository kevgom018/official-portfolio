import { Section } from "./section";
import { Reveal } from "./reveal";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Section id="projects" index="03" label="what i've built" title="Selected builds">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={Math.min(i * 0.06, 0.25)}
            className={p.featured ? "lg:col-span-2" : ""}
          >
            <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
              <div className="flex items-start justify-between gap-4">
                <p
                  className={`telemetry ${
                    p.status === "champion" ? "text-gold" : "text-fg3"
                  }`}
                >
                  {p.status}
                </p>
                <p className="telemetry text-fg3">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold transition-colors duration-300 group-hover:text-accent md:text-2xl">
                {p.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-fg2">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg2">
                {p.description}
              </p>
              <p className="telemetry mt-5 text-fg3">{p.role}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="telemetry rounded-full border border-line px-3 py-1.5 text-fg3"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
              />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
