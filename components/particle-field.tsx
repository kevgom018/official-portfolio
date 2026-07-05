"use client";

import { useEffect, useRef, useState } from "react";

// The machine's perception of Kevin: a LiDAR-style point cloud. Points jitter
// like raw sensor noise and "resolve" — lock to position, brighten toward the
// accent — near the focus. Idle, the focus scans autonomously on a Lissajous
// path; a pointer takes over on contact. Samples public/portrait.png when
// present, otherwise the KG monogram.
const SOURCE = 300;

type Particle = { tx: number; ty: number; phase: number; freq: number };

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let raf = 0;
    let running = true;
    let disposed = false;
    let particles: Particle[] = [];
    let W = 0;
    let H = 0;
    const MARGIN = 0.06;

    let levels: string[] = [];
    const buildColors = () => {
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim()
        .replace("#", "");
      const ar = parseInt(accent.slice(0, 2), 16) || 34;
      const ag = parseInt(accent.slice(2, 4), 16) || 211;
      const ab = parseInt(accent.slice(4, 6), 16) || 238;
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const [dr, dg, db] = light ? [96, 106, 120] : [118, 128, 146];
      levels = Array.from({ length: 9 }, (_, i) => {
        const t = i / 8;
        const r = Math.round(dr + (ar - dr) * t);
        const g = Math.round(dg + (ag - dg) * t);
        const b = Math.round(db + (ab - db) * t);
        return `rgba(${r},${g},${b},${(0.35 + 0.65 * t).toFixed(3)})`;
      });
    };
    buildColors();
    const themeObserver = new MutationObserver(buildColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const sample = (draw: (c: CanvasRenderingContext2D) => void) => {
      const off = document.createElement("canvas");
      off.width = SOURCE;
      off.height = SOURCE;
      const octx = off.getContext("2d");
      if (!octx) return;
      draw(octx);
      const data = octx.getImageData(0, 0, SOURCE, SOURCE).data;
      const pts: Particle[] = [];
      const step = coarse ? 4 : 3;
      for (let y = 0; y < SOURCE; y += step) {
        for (let x = 0; x < SOURCE; x += step) {
          if (data[(y * SOURCE + x) * 4 + 3] > 120) {
            pts.push({
              tx: x / SOURCE,
              ty: y / SOURCE,
              phase: Math.random() * Math.PI * 2,
              freq: 0.6 + Math.random() * 0.9,
            });
          }
        }
      }
      if (pts.length > 3600) {
        for (let i = pts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pts[i], pts[j]] = [pts[j], pts[i]];
        }
        pts.length = 3600;
      }
      particles = pts;
    };

    const sampleMonogram = async () => {
      await document.fonts.ready;
      if (disposed) return;
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--font-space-grotesk") ||
        "sans-serif";
      sample((c) => {
        c.fillStyle = "#fff";
        c.font = `700 150px ${family}`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText("KG", SOURCE / 2, SOURCE / 2);
      });
    };

    const img = new Image();
    img.src = "/portrait.png";
    img.onload = () =>
      sample((c) => {
        const s = Math.min(img.width, img.height);
        c.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, SOURCE, SOURCE);
      });
    img.onerror = () => void sampleMonogram();

    let px = -1e4;
    let py = -1e4;
    let lastPointer = -1e4;
    let fx = 0;
    let fy = 0;
    let currentlyLocked = false;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      lastPointer = performance.now();
    };
    const host = canvas.parentElement;
    host?.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    io.observe(canvas);

    const t0 = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!running || particles.length === 0 || W === 0) return;
      const t = (now - t0) / 1000;
      const pointerActive = now - lastPointer < 2600;
      const sx = pointerActive ? px : W * (0.5 + 0.36 * Math.sin(t * 0.37));
      const sy = pointerActive ? py : H * (0.5 + 0.32 * Math.sin(t * 0.53 + 1.3));
      fx += (sx - fx) * 0.06;
      fy += (sy - fy) * 0.06;
      if (pointerActive !== currentlyLocked) {
        currentlyLocked = pointerActive;
        setLocked(pointerActive);
      }

      ctx.clearRect(0, 0, W, H);
      const usable = 1 - MARGIN * 2;
      const R = Math.max(W, H) * 0.3;
      const buckets: number[][] = levels.map(() => []);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const bx = (MARGIN + p.tx * usable) * W;
        const by = (MARGIN + p.ty * usable) * H;
        let k = 1 - Math.hypot(bx - fx, by - fy) / R;
        if (k < 0) k = 0;
        k = k * k * (3 - 2 * k);
        const amp = 5 * (1 - k);
        buckets[Math.round(k * 8)].push(
          bx + Math.sin(t * p.freq * 2 + p.phase) * amp,
          by + Math.cos(t * p.freq * 1.7 + p.phase * 1.3) * amp,
        );
      }
      for (let l = 0; l < buckets.length; l++) {
        const b = buckets[l];
        if (b.length === 0) continue;
        ctx.fillStyle = levels[l];
        const size = 1.4 + (l / 8) * 1.2;
        for (let i = 0; i < b.length; i += 2) ctx.fillRect(b[i], b[i + 1], size, size);
      }
    };

    const drawStatic = () => {
      if (disposed) return;
      if (particles.length === 0) {
        setTimeout(drawStatic, 150);
        return;
      }
      resize();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = levels[5];
      const usable = 1 - MARGIN * 2;
      for (const p of particles) {
        ctx.fillRect((MARGIN + p.tx * usable) * W, (MARGIN + p.ty * usable) * H, 1.8, 1.8);
      }
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) drawStatic();
    });
    ro.observe(canvas);

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      host?.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      <span aria-hidden="true" className="absolute -left-2 -top-2 h-5 w-5 border-l border-t border-accent/60" />
      <span aria-hidden="true" className="absolute -right-2 -top-2 h-5 w-5 border-r border-t border-accent/60" />
      <span aria-hidden="true" className="absolute -bottom-2 -left-2 h-5 w-5 border-b border-l border-accent/60" />
      <span aria-hidden="true" className="absolute -bottom-2 -right-2 h-5 w-5 border-b border-r border-accent/60" />
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label="Point-cloud rendering, the way a robot's LiDAR would see it"
      />
      <p className="telemetry absolute -bottom-8 left-0 text-fg3" aria-hidden="true">
        perception.self — {locked ? "target locked" : "autonomous scan"}
      </p>
    </div>
  );
}
