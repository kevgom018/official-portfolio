import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6">
      <div className="text-center">
        <p className="telemetry text-accent">error.404 — off course</p>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Waypoint not found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-fg2">
          This coordinate isn&apos;t on the mission path. Recalculating won&apos;t
          help — head back to base.
        </p>
        <Link
          href="/"
          className="mt-9 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
        >
          Return to the path
        </Link>
      </div>
    </main>
  );
}
