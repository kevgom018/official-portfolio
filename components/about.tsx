import { Section } from "./section";
import { Reveal } from "./reveal";
import { about } from "@/lib/data";

export function About() {
  return (
    <Section id="about" index="01" label="who i am" title="Precision is a habit.">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-fg2">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="telemetry mb-4 text-accent">education</p>
            <h3 className="font-display text-xl font-semibold">
              {about.education.degree}
            </h3>
            <p className="mt-1 text-fg2">{about.education.school}</p>
            <dl className="mt-5 space-y-2 border-t border-line pt-5">
              <div className="flex justify-between gap-4">
                <dt className="telemetry text-fg3">period</dt>
                <dd className="telemetry text-right text-fg2 normal-case">
                  {about.education.period}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="telemetry text-fg3">gpa</dt>
                <dd className="telemetry text-right text-gold normal-case">
                  {about.education.gpa}
                </dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-line pt-5">
              <p className="telemetry mb-3 text-fg3">memberships</p>
              <ul className="space-y-2">
                {about.education.memberships.map((m) => (
                  <li key={m} className="flex items-center gap-3 text-sm text-fg2">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
