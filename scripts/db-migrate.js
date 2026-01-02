const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

/**
 * Simple JSONC parser (removes comments and parses)
 */
function parseJsonc(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  // Remove single-line comments // and multi-line comments /* */
  const cleanJson = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
  return JSON.parse(cleanJson);
}

function runMigration() {
  const configPath = path.join(process.cwd(), "wrangler.jsonc");

  if (!fs.existsSync(configPath)) {
    console.error("❌ wrangler.jsonc file not found");
    process.exit(1);
  }

  try {
    const config = parseJsonc(configPath);
    const d1 = config.d1_databases?.[0];

    if (!d1 || !d1.database_name) {
      console.error("❌ No D1 database configuration found in wrangler.jsonc");
      process.exit(1);
    }

    // Get database name (or use d1.binding as needed)
    const dbIdentifier = d1.database_name;
    const isRemote = process.argv.includes("--remote");
    const command = `wrangler d1 migrations apply ${dbIdentifier} ${isRemote ? "--remote" : "--local"}`;

    console.log(`🚀 Executing migration: ${command}`);

    // Execute command and maintain output color and interactivity
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Error executing migration script:", error.message);
    process.exit(1);
  }
}

runMigration();
