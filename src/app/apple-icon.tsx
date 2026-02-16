import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)",
          borderRadius: "36px",
        }}
      >
        <span
          style={{
            fontSize: "100px",
            fontWeight: 700,
            color: "#e6b422",
            fontFamily: "monospace",
          }}
        >
          &lt;/&gt;
        </span>
      </div>
    ),
    { ...size },
  );
}
