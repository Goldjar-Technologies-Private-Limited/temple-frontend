#!/usr/bin/env node
/**
 * Detect local LAN IPv4 address (excluding docker/loopback).
 */
const os = require("os");
const dgram = require("dgram");

function getLanIpViaInterfaces() {
  const ifaces = os.networkInterfaces();
  const candidates = [];

  for (const name of Object.keys(ifaces)) {
    // Skip virtual/docker interfaces if possible
    if (
      name.startsWith("docker") ||
      name.startsWith("br-") ||
      name.startsWith("veth") ||
      name.startsWith("lo")
    ) {
      continue;
    }

    for (const net of ifaces[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        // Exclude typical docker/bridge subnet (172.17.x, 172.18.x)
        if (
          !net.address.startsWith("172.17.") &&
          !net.address.startsWith("172.18.")
        ) {
          candidates.push(net.address);
        }
      }
    }
  }

  return candidates[0] || null;
}

function detectLanIp() {
  return new Promise((resolve) => {
    // Attempt UDP socket probe to detect active outbound network interface without sending data
    try {
      const socket = dgram.createSocket("udp4");
      socket.connect(80, "8.8.8.8", () => {
        const address = socket.address().address;
        socket.close();
        if (
          address &&
          address !== "127.0.0.1" &&
          !address.startsWith("172.17.")
        ) {
          resolve(address);
          return;
        }
        resolve(getLanIpViaInterfaces());
      });
      socket.on("error", () => {
        try {
          socket.close();
        } catch (_) {}
        resolve(getLanIpViaInterfaces());
      });
    } catch (_) {
      resolve(getLanIpViaInterfaces());
    }
  });
}

if (require.main === module) {
  detectLanIp().then((ip) => {
    if (!ip) {
      console.error("Error: Could not detect a valid LAN IPv4 address.");
      process.exit(1);
    }
    console.log(ip);
  });
}

module.exports = { detectLanIp };
