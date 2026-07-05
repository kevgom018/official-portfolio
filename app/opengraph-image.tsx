import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kevin Gómez — I build things that drive themselves";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0c10",
          color: "#e9eef4",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#22d3ee", letterSpacing: 6 }}>
            MISSION.00 — MAYAGÜEZ, PR
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#5c6779" }}>KG.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700 }}>
            Kevin Gómez
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#98a2b3", marginTop: 10 }}>
            I build things that drive themselves.
          </div>
        </div>
        <svg width="1056" height="90" viewBox="0 0 1056 90" fill="none">
          <path
            d="M0 78 C 210 78 270 14 440 16 S 770 72 890 34 S 1015 8 1056 12"
            stroke="#22d3ee"
            strokeWidth="2.5"
          />
          <circle cx="440" cy="16" r="7" fill="#22d3ee" />
          <circle cx="890" cy="34" r="5" fill="#0a0c10" stroke="#22d3ee" strokeWidth="2.5" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
