#!/usr/bin/env node
/**
 * Print the absolute and relative path to the built Android artifact (APK/AAB).
 * Usage: node scripts/print-artifact-path.js <apk-debug|apk-release|aab-release>
 */
const path = require("path");
const fs = require("fs");

const type = process.argv[2] || "apk-debug";

const ARTIFACT_MAP = {
  "apk-debug": {
    name: "Debug APK",
    relPath: "android/app/build/outputs/apk/debug/app-debug.apk",
  },
  "apk-release": {
    name: "Release APK",
    relPath: "android/app/build/outputs/apk/release/app-release-unsigned.apk",
    altRelPath: "android/app/build/outputs/apk/release/app-release.apk",
  },
  "aab-release": {
    name: "Release Android App Bundle (AAB)",
    relPath: "android/app/build/outputs/bundle/release/app-release.aab",
  },
};

const artifactInfo = ARTIFACT_MAP[type] || ARTIFACT_MAP["apk-debug"];
const projectRoot = process.cwd();

let targetPath = path.resolve(projectRoot, artifactInfo.relPath);

// Check if alternative name exists (e.g. app-release.apk vs app-release-unsigned.apk)
if (!fs.existsSync(targetPath) && artifactInfo.altRelPath) {
  const altPath = path.resolve(projectRoot, artifactInfo.altRelPath);
  if (fs.existsSync(altPath)) {
    targetPath = altPath;
  }
}

console.log("\n============================================================");
console.log(`📦 [Artifact Built] ${artifactInfo.name}`);

if (fs.existsSync(targetPath)) {
  const stats = fs.statSync(targetPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  const relativePath = path.relative(projectRoot, targetPath);

  console.log(`   • Absolute Path : ${targetPath}`);
  console.log(`   • Relative Path : ${relativePath}`);
  console.log(
    `   • File Size     : ${sizeMb} MB (${stats.size.toLocaleString()} bytes)`,
  );
  console.log(`   • Last Modified : ${stats.mtime.toLocaleString()}`);
} else {
  // If file not yet present (or custom gradle output directory), search directory
  const baseDir = path.resolve(projectRoot, "android/app/build/outputs");
  console.log(`   • Expected Path : ${targetPath}`);
  if (fs.existsSync(baseDir)) {
    console.log(`   • Search Directory: ${baseDir}`);
  }
}
console.log("============================================================\n");
