import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

type Database = DrizzleD1Database<typeof schema>;

let database: Database | undefined;

function createDatabase(): Database {
  if (database) {
    return database;
  }

  const { env } = getCloudflareContext();
  const binding = env.DB;

  if (!binding) {
    throw new Error("Cloudflare D1 binding `DB` is not configured.");
  }

  database = drizzle(binding, { schema });
  return database;
}

// Lazily proxy the actual D1-backed drizzle instance so imports
// can access `db` without worrying about when the binding is ready.
export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    const instance = createDatabase();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
  set(_target, prop, value, receiver) {
    const instance = createDatabase();
    Reflect.set(instance, prop, value, receiver);
    return true;
  },
});
