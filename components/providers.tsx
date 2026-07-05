"use client";

import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      {reducedMotion ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
          {children}
        </ReactLenis>
      )}
    </ThemeProvider>
  );
}
