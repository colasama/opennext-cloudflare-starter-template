#!/usr/bin/env node

/**
 * Generates a cryptographically secure Better Auth secret.
 *
 * Usage:
 *   pnpm better-auth:key
 *   pnpm better-auth:key 48   # optional custom byte length (>= 16)
 */
const crypto = require("node:crypto");

const DEFAULT_BYTE_LENGTH = 32; // 64 hex characters
const MIN_BYTE_LENGTH = 16; // Better Auth requires >= 32 characters

const byteLengthArg = process.argv[2];
const byteLength = byteLengthArg ? Number(byteLengthArg) : DEFAULT_BYTE_LENGTH;

if (!Number.isInteger(byteLength) || byteLength < MIN_BYTE_LENGTH) {
  console.error(
    `❌ Invalid byte length "${byteLengthArg ?? ""}". Please provide an integer >= ${MIN_BYTE_LENGTH}.`,
  );
  process.exit(1);
}

const secret = crypto.randomBytes(byteLength).toString("hex");

console.log("✅ BETTER_AUTH_SECRET");
console.log(secret);
console.log("\nAdd this value to your .env.local file.");
