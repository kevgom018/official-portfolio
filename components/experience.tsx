import { Section } from "./section";
import { Reveal } from "./reveal";
import { missions } from "@/lib/data";

export function Experience() {
  return (
    <Section id="missions" index="02" label="experience" title="Mission log">
      <ol className="relative space-y-16 border-l border-line pl-8 md:pl-12">
        {missions.map((m, i) => (
          <li key={m.org} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent md:-left-[53px] ${
                m.status === "active" ? "bg-accent" : "bg-bg"
              }`}
            />
            <Reveal delay={Math.min(i * 0.06, 0.2)}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-display text-2xl font-semibold md:text-3xl">
                  {m.org}
                </h3>
                <span
                  className={`telemetry inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
                    m.status === "active"
                      ? "border-accent/40 text-accent"
                      : "border-line text-fg3"
                  }`}
                >
                  {m.status === "active" && (
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                  )}
                  {m.status}
                </span>
              </div>
              <p className="mt-2 text-fg2">{m.role}</p>
              <p className="telemetry mt-1.5 text-fg3">
                {m.period} · {m.location}
              </p>
              <ul className="mt-5 max-w-3xl space-y-2.5">
                {m.bullets.map((b) => (
                  <li key={b} className="flex gap-4 leading-relaxed text-fg2">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-4 shrink-0 bg-accent/60"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <li
                    key={t}
                    className="telemetry rounded-full border border-line px-3 py-1.5 text-fg3"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
