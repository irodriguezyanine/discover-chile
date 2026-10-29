import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#081410",
          color: "#fffaf2",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#8ec9d6" }}>
          #DISCOVERCHILE
        </div>
        <div style={{ fontSize: 72, marginTop: 16, lineHeight: 1.05 }}>
          Chile is not one trip.
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#e7dcc8" }}>
          Honest routes. Live prices. Your currency.
        </div>
      </div>
    ),
    size,
  );
}
