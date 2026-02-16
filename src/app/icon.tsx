import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
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
