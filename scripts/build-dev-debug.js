#!/usr/bin/env node
/**
 * Script for development Android build:
 * 1. Automatically detects LAN IP.
 * 2. Verifies local Next.js dev server is reachable on port 3000.
 * 3. Sets CAPACITOR_ENV=development and CAPACITOR_SERVER_URL=http://<IP>:3000.
 * 4. Runs cap sync android.
 * 5. Builds Android debug APK.
 */
const http = require("http");
const { execSync } = require("child_process");
const { detectLanIp } = require("./get-lan-ip");

async function checkDevServer(port = 3000) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}`, (res) => {
      resolve(true);
    });
    req.on("error", () => {
      resolve(false);
    });
    req.setTimeout(2500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function run() {
  console.log("==> Detecting LAN IP...");
  const lanIp = await detectLanIp();

  if (!lanIp) {
    console.error(
      "\n[Error] Unable to automatically detect a valid local LAN IPv4 address.",
    );
    console.error(
      "Please ensure your machine is connected to a local Wi-Fi or Ethernet network.\n",
    );
    process.exit(1);
  }

  console.log(`==> Detected LAN IPv4 address: ${lanIp}`);

  console.log(
    "==> Verifying local Next.js development server is reachable at port 3000...",
  );
  const isServerRunning = await checkDevServer(3000);

  if (!isServerRunning) {
    console.error(
      "\n[Error] Local Next.js development server is not running on port 3000!",
    );
    console.error(
      "Please start the development server in another terminal first using:",
    );
    console.error("  npm run dev (or npm run dev:staging)\n");
    process.exit(1);
  }

  console.log("==> Local development server is active.");
  console.log(`📌 IMPORTANT FOR PHYSICAL ANDROID DEVICES:`);
  console.log(`   1. Ensure your Android phone is on the SAME Wi-Fi network as this computer.`);
  console.log(`   2. Test in phone browser first: Open http://${lanIp}:3000 on your phone.`);
  console.log(`   3. Keep 'npm run dev' running on your computer while testing.`);

  const serverUrl = `http://${lanIp}:3000`;
  const env = {
    ...process.env,
    CAPACITOR_ENV: "development",
    CAPACITOR_SERVER_URL: serverUrl,
  };

  console.log(
    `==> Configuring Capacitor for development with server URL: ${serverUrl}`,
  );
  console.log("==> Running: npx cap sync android");
  execSync("npx cap sync android", { stdio: "inherit", env });

  console.log("==> Building Android debug APK via Gradle...");
  execSync("cd android && ./gradlew assembleDebug", {
    stdio: "inherit",
    env,
    shell: true,
  });

  console.log("\n✔ Development debug APK built successfully!");
  console.log(`Target Dev URL: ${serverUrl}`);

  execSync("node scripts/print-artifact-path.js apk-debug", {
    stdio: "inherit",
    shell: true,
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
