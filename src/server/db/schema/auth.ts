import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestampColumn = (name: string) => integer(name, { mode: "timestamp" });

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: text("image"),
  createdAt: timestampColumn("created_at")
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: timestampColumn("updated_at")
    .notNull()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestampColumn("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestampColumn("created_at")
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: timestampColumn("updated_at")
    .notNull()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestampColumn("access_token_expires_at"),
  refreshTokenExpiresAt: timestampColumn("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestampColumn("created_at")
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: timestampColumn("updated_at")
    .notNull()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestampColumn("expires_at").notNull(),
  createdAt: timestampColumn("created_at")
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: timestampColumn("updated_at")
    .default(sql`(unixepoch())`)
    .notNull()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
});
