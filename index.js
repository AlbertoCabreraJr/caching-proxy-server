#!/usr/bin/env node

const { Command } = require("commander");
const cache = require("./cache");
const startProxy = require("./proxy-server");

const program = new Command();

program
  .option("--port <number>", "Port to run the proxy server")
  .option("--origin <url>", "Origin server to proxy requests to")
  .option("--clear-cache", "Clear the cache")

program.parse(process.argv);

const options = program.opts();

if (options.clearCache) {
  cache.clear();
  console.log("Cache cleared");
  process.exit(0);
}

if (!options.port || !options.origin) {
  console.error("❌ Please provide both --port and --origin")
  process.exit(1);
}

startProxy(options.port, options.origin);