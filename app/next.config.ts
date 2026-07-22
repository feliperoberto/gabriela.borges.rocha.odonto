import type { NextConfig } from "next";

// GitHub Pages serves static files only (no Node process). The Pages deploy
// workflow (.github/workflows/deploy.yml) sets NEXT_STATIC_EXPORT=true to
// opt into `output: "export"` + unoptimized images. Left unset for local
// dev, the Docker `app` service (runs `next start`), and CI — `next start`
// is incompatible with `output: "export"`, so this must stay conditional.
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
