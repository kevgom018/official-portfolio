import { Reveal } from "./reveal";

export function Section({
  id,
  index,
  label,
  title,
  children,
  className = "",
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <p className="telemetry mb-3 text-accent">
              wp.{index} — {label}
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {title}
            </h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
