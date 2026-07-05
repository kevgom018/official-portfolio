"use client";

import { useEffect, useRef } from "react";

// The follower ring runs an underdamped spring (ζ = 0.75, ω = 18 rad/s) —
// the slight overshoot on fast moves is a deliberate nod to PID tuning.
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;
    let vx = 0;
    let vy = 0;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;
    let last = performance.now();

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      const el = e.target as Element | null;
      targetScale = el?.closest?.("a, button, input, textarea, [data-cursor]")
        ? 1.8
        : 1;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const zeta = 0.75;
    const omega = 18;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      vx += (omega * omega * (tx - x) - 2 * zeta * omega * vx) * dt;
      vy += (omega * omega * (ty - y) - 2 * zeta * omega * vy) * dt;
      x += vx * dt;
      y += vy * dt;
      scale += (targetScale - scale) * Math.min(1, dt * 12);
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-accent/40 opacity-0"
      />
    </div>
  );
}
