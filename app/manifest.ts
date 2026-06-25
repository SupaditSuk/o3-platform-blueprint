import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "O3 ZONE Intelligence",
    short_name: "O3 ZONE",
    description:
      "People Intelligence and HR Transformation for organizations turning people data into business outcomes.",
    start_url: "/th",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#e11d48",
    icons: [
      {
        src: "/images/o3-zone-logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
