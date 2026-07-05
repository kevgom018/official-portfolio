"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { waypoints } from "@/lib/data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10"
      >
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
          aria-label="Kevin Gómez — home"
        >
          KG<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {waypoints.map((w) => (
            <a
              key={w.id}
              href={`/#${w.id}`}
              className="telemetry text-fg3 transition-colors hover:text-fg"
            >
              <span className="text-accent">{w.index}</span> {w.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/resume"
            className="telemetry rounded-full border border-line-strong px-4 py-2 text-fg2 transition-colors hover:border-accent hover:text-accent"
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}
