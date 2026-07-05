import { Section } from "./section";
import { Reveal } from "./reveal";
import { systems } from "@/lib/data";

export function Skills() {
  return (
    <Section id="systems" index="04" label="capabilities" title="Systems online">
      <Reveal>
        <p className="-mt-8 mb-12 max-w-xl text-fg2">
          No skill bars — percentages on knowledge are made up. These are the
          systems I operate, grouped the way I actually use them.
        </p>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {systems.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i * 0.07, 0.28)} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="telemetry text-accent">{s.id}</p>
                <p className="telemetry flex items-center gap-2 text-fg3">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  online
                </p>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="telemetry rounded-full border border-line px-3 py-1.5 text-fg2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
