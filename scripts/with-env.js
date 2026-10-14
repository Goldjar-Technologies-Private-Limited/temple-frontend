#!/usr/bin/env node
/**
 * Run a command with variables loaded from a specific .env file.
 * Usage: node scripts/with-env.js <env_name> <command...>
 * Example: node scripts/with-env.js staging next build
 */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    "Usage: node scripts/with-env.js <development|staging|production> <command...>",
  );
  process.exit(1);
}

const envTarget = args[0];
const cmd = args[1];
const cmdArgs = args.slice(2);
const loadedVars = {};

const envFile = path.resolve(process.cwd(), `.env.${envTarget}`);
if (fs.existsSync(envFile)) {
  const content = fs.readFileSync(envFile, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (process.env[key] === undefined) {
        process.env[key] = val;
        loadedVars[key] = val;
      }
    }
  }
}

// Ensure NEXT_PUBLIC_ENV matches the target if not already set
if (!process.env.NEXT_PUBLIC_ENV) {
  process.env.NEXT_PUBLIC_ENV = envTarget;
  loadedVars["NEXT_PUBLIC_ENV"] = envTarget;
}

const fullCommand = [cmd, ...cmdArgs].join(" ");

console.log("\n============================================================");
console.log(`🔧 [with-env] Target Environment : ${envTarget.toUpperCase()}`);
console.log(
  `   • Env file path        : ${fs.existsSync(envFile) ? envFile : "(none, default used)"}`,
);
console.log(`   • Effective NEXT_PUBLIC_ENV: ${process.env.NEXT_PUBLIC_ENV}`);
console.log(`   • Executing command    : ${fullCommand}`);
console.log("============================================================\n");

const child = spawn(fullCommand, {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code || 0);
  }
});
