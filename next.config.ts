import type { NextConfig } from "next";
import os from "os";

const appEnv = process.env.NEXT_PUBLIC_ENV || "production";
const nodeEnv = process.env.NODE_ENV || "development";

// Dynamically gather local IPv4 addresses so HMR WebSocket connections work from any phone on Wi-Fi
function getAllLocalIps(): string[] {
  const ips = ["localhost", "127.0.0.1", "0.0.0.0"];
  try {
    const ifaces = os.networkInterfaces();
    for (const name of Object.keys(ifaces)) {
      for (const net of ifaces[name] || []) {
        if (net.family === "IPv4" && !net.internal) {
          ips.push(net.address);
        }
      }
    }
  } catch (_) {}
  return ips;
}

const localIps = getAllLocalIps();
const allowedDevOrigins = [...localIps, ...localIps.map((ip) => `${ip}:3000`)];

console.log("\n============================================================");
console.log("🚀 [Govardhannath Frontend] Next.js Configuration Loaded");
console.log(`   • NEXT_PUBLIC_ENV   : ${appEnv}`);
console.log(`   • NODE_ENV          : ${nodeEnv}`);
console.log(`   • Output Mode       : standalone`);
console.log(`   • Image Opt         : unoptimized (true)`);
console.log(`   • AllowedDevOrigins : ${localIps.join(", ")}`);
console.log("============================================================\n");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Next.js 15+ & 16+ Turbopack security blocks WebSocket /_next/hmr from cross-origin LAN devices
  // unless the origin is declared in allowedDevOrigins.
  allowedDevOrigins,
};

export default nextConfig;
