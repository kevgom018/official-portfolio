"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ParticleField } from "./particle-field";
import { Counter } from "./counter";
import { profile, stats } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const up = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 32 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <div className="bg-blueprint relative overflow-hidden">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M-40 790 C 260 790 330 430 660 440 S 1090 660 1200 430 S 1370 130 1500 150"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeOpacity="0.3"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
        />
        <circle cx="660" cy="440" r="4" fill="var(--accent)" opacity="0.45" />
        <circle cx="1200" cy="430" r="4" fill="var(--accent)" opacity="0.45" />
      </svg>

      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-16 px-6 pb-28 pt-32 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <motion.p {...up(0)} className="telemetry mb-5 text-accent">
            mission.00 — {profile.location}
          </motion.p>
          <motion.h1
            {...up(0.08)}
            className="font-display text-6xl font-bold leading-[0.94] tracking-tight md:text-8xl xl:text-[7rem]"
          >
            Kevin
            <br />
            Gómez
          </motion.h1>
          <motion.p
            {...up(0.18)}
            className="mt-7 font-display text-2xl text-fg md:text-3xl"
          >
            {profile.thesis}
          </motion.p>
          <motion.p {...up(0.26)} className="mt-4 max-w-md leading-relaxed text-fg2">
            {profile.intro}
          </motion.p>
          <motion.div {...up(0.34)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#missions"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              View the missions
            </a>
            <Link
              href="/resume"
              className="rounded-full border border-line-strong px-6 py-3 text-sm text-fg2 transition-colors hover:border-accent hover:text-accent"
            >
              Read the resume
            </Link>
          </motion.div>
        </div>

        <motion.div {...up(0.3)} className="w-full max-w-[420px] justify-self-center pb-6 lg:max-w-none">
          <ParticleField />
        </motion.div>

        <motion.div
          {...up(0.7)}
          aria-hidden="true"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="telemetry text-fg3">scroll</span>
          <motion.span
            className="block h-8 w-px bg-accent/70"
            animate={reduced ? undefined : { opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...up(0.45 + i * 0.07)}
              className="border-b border-line px-6 py-7 odd:border-r md:px-10 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="font-display text-3xl font-semibold md:text-4xl">
                <Counter
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                />
              </p>
              <p className="telemetry mt-2 text-fg3">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
