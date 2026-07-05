import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Kevin J. Gómez Guzmán — software engineering student, robotics national champion, AI/ML and full-stack developer.",
};

function DownloadButton({ solid = false }: { solid?: boolean }) {
  return (
    <a
      href="/resume.pdf"
      download="KevinGomez_Resume.pdf"
      className={
        solid
          ? "inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
          : "inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-fg2 transition-colors hover:border-accent hover:text-accent"
      }
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" />
      </svg>
      Download resume
    </a>
  );
}

function FallbackCard() {
  return (
    <div className="grid place-items-center rounded-2xl border border-line bg-surface px-8 py-16 text-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M9 15h6M9 11h2" />
      </svg>
      <p className="mt-5 font-display text-lg font-semibold">
        The inline preview isn&apos;t available here
      </p>
      <p className="mt-2 max-w-xs text-sm text-fg2">
        Grab the PDF directly — same document, same detail.
      </p>
      <div className="mt-6">
        <DownloadButton solid />
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <main id="main" className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:px-10">
      <p className="telemetry text-accent">document.01 — curriculum vitae</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Resume
          </h1>
          <p className="mt-3 max-w-md text-fg2">
            The full record — education, missions, and awards — in one PDF.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <DownloadButton solid />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-line-strong px-6 py-3 text-sm text-fg2 transition-colors hover:border-accent hover:text-accent"
          >
            Open in new tab
          </a>
        </div>
      </div>

      <div className="mt-10 hidden overflow-hidden rounded-2xl border border-line md:block">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="h-[78vh] w-full"
          aria-label="Kevin Gómez resume PDF"
        >
          <FallbackCard />
        </object>
      </div>

      <div className="mt-10 md:hidden">
        <FallbackCard />
      </div>
    </main>
  );
}
