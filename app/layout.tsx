import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Cursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { profile } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${profile.shortName} — robotics, AI & full-stack engineer`,
    template: `%s · ${profile.shortName}`,
  },
  description:
    "Software engineering student at UPR Mayagüez building autonomous robots, AI systems, and full-stack products. National robotics champion, ICPC Caribbean regional winner.",
  openGraph: {
    title: `${profile.shortName} — I build things that drive themselves`,
    description:
      "Autonomous robotics, agentic AI, and full-stack development. Portfolio of Kevin J. Gómez Guzmán.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} font-sans bg-bg text-fg antialiased`}
      >
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Nav />
          {children}
          <Footer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
