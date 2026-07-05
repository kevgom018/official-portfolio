"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { waypoints } from "@/lib/data";

export function Spine() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const markerTop = useTransform(progress, (v) => `${v * 100}%`);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          } else {
            setActive((prev) => (prev === entry.target.id ? "" : prev));
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const w of waypoints) {
      const el = document.getElementById(w.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Waypoints"
      className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative h-[44vh]">
        <div className="absolute inset-y-0 left-1 w-px bg-line" />
        <motion.div
          className="absolute left-1 top-0 w-px origin-top bg-accent"
          style={{ height: "100%", scaleY: progress }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-1 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent"
          style={{ top: markerTop }}
        />
        <div className="relative flex h-full flex-col justify-between">
          {waypoints.map((w) => (
            <a
              key={w.id}
              href={`/#${w.id}`}
              className="group relative flex items-center gap-3 py-1"
            >
              <span
                className={`h-2 w-2 rounded-full border transition-colors duration-300 ${
                  active === w.id
                    ? "border-accent bg-accent"
                    : "border-line-strong bg-bg group-hover:border-accent"
                }`}
              />
              <span
                className={`telemetry transition-colors duration-300 ${
                  active === w.id ? "text-accent" : "text-fg3"
                }`}
              >
                {w.index}
              </span>
              <span className="telemetry pointer-events-none absolute left-12 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-fg2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {w.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
