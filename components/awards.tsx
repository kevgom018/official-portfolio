import { Reveal } from "./reveal";
import { awards } from "@/lib/data";

export function Awards() {
  return (
    <section aria-label="Awards" className="border-y border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="telemetry pt-10 text-gold">mission outcomes — podium finishes</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-10 pb-10 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a, i) => (
            <Reveal key={`${a.title}-${a.date}`} delay={i * 0.08} className="py-6">
              <p className="font-display text-4xl font-bold text-gold">
                {a.place}
                <span className="ml-2 font-sans text-sm font-normal text-fg3">
                  {a.field}
                </span>
              </p>
              <p className="mt-3 text-sm leading-snug text-fg2">{a.title}</p>
              <p className="telemetry mt-2 text-fg3">
                {a.date} · {a.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
