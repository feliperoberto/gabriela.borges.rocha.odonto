#!/usr/bin/env node
const fs = require("fs");

if (!fs.existsSync("/.dockerenv")) {
  console.error("\n✖ This command must be run inside Docker, not on the host.\n");
  console.error("  Use one of:");
  console.error("    docker compose --profile dev run --rm --service-ports app-dev npm run dev");
  console.error("    docker compose run --rm -w /home/app app npm run validate");
  console.error("    docker compose --profile testing run --rm playwright\n");
  process.exit(1);
}
