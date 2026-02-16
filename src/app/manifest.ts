import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "James Neely — AI Solutions Architect & Full Stack Engineer",
    short_name: "James Neely",
    description:
      "Personal resume site for James Neely — an AI solutions architect and full stack engineer.",
    start_url: "/",
    display: "standalone",
    theme_color: "#b8860b",
    background_color: "#faf9f6",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
