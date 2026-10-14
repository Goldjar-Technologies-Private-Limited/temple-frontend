import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Environments:
 * - "development": Local dev server via detected LAN IP (cleartext HTTP enabled)
 * - "staging": Independent staging website (HTTPS)
 * - "production": Default live website (HTTPS)
 */
const capEnv = process.env.CAPACITOR_ENV || "production";
const explicitUrl = process.env.CAPACITOR_SERVER_URL;

let serverUrl: string;
let isCleartext = false;

if (capEnv === "development") {
  if (!explicitUrl) {
    throw new Error(
      "[CapacitorConfig] CAPACITOR_ENV is set to 'development' but CAPACITOR_SERVER_URL is missing. " +
        "Use 'npm run build:dev:debug' to automatically detect your LAN IP and configure development builds.",
    );
  }
  serverUrl = explicitUrl;
  isCleartext = true;
} else if (capEnv === "staging") {
  serverUrl = explicitUrl || "https://staging.haveli.goldjar.in";
  isCleartext = false;
} else {
  // Safe default: Production
  serverUrl = "https://haveli.goldjar.in";
  isCleartext = false;
}

console.log("\n============================================================");
console.log("📱 [Govardhannath Frontend] Capacitor Configuration Loaded");
console.log(`   • CAPACITOR_ENV         : ${capEnv}`);
console.log(`   • Target Server URL     : ${serverUrl}`);
console.log(`   • Cleartext (HTTP)      : ${isCleartext}`);
console.log(`   • App ID                : com.govardhannath.haveli`);
console.log(`   • Web Directory         : out`);
console.log("============================================================\n");

const config: CapacitorConfig = {
  appId: "com.govardhannath.haveli",
  appName: "Shri Govardhannath Haveli",
  webDir: "out",
  server: {
    url: serverUrl,
    cleartext: isCleartext,
  },
};

export default config;
