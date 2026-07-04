import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "True Virtues Jiu Jitsu — Brazilian Jiu Jitsu in Wimbledon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a09",
          color: "#fafaf9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#e63a1f", letterSpacing: 6, textTransform: "uppercase" }}>
          Wimbledon · SW19
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 16, textTransform: "uppercase" }}>
          True Virtues Jiu Jitsu
        </div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#d6d3d1" }}>
          Brazilian Jiu Jitsu for complete beginners
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            fontWeight: 700,
            background: "#e63a1f",
            color: "#ffffff",
            padding: "16px 40px",
            borderRadius: 12,
          }}
        >
          Book Your Free Trial Class
        </div>
      </div>
    ),
    { ...size }
  );
}
