import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="telemetry text-fg3">
          © {new Date().getFullYear()} {profile.shortName} — {profile.location}
        </p>
        <p className="telemetry text-fg3">{profile.coordinates}</p>
        <p className="telemetry text-fg3">designed &amp; built from scratch</p>
      </div>
    </footer>
  );
}
