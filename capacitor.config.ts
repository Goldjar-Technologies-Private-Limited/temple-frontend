import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.govardhannath.haveli",
  appName: "Shri Govardhannath Haveli",
  webDir: "out",
  server: {
    // url: "https://haveli.goldjar.in",
    // cleartext: false,
    url: "http://192.168.31.250:3000",
    cleartext: true,
  },
};

export default config;
