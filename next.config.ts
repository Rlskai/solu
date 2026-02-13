import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  allowedDevOrigins: ["localhost", "127.0.0.1", "*.127.0.0.1"],
};

export default nextConfig;
