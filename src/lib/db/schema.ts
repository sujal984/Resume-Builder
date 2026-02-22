import { pgTable, text, timestamp, uuid, jsonb, pgEnum, integer, primaryKey } from "drizzle-orm/pg-core";

// Enums
export const userPlanEnum = pgEnum("user_plan", ["free", "pro"]);
export const visibilityEnum = pgEnum("resume_visibility", ["private", "public", "unlisted"]);

// Users Table
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    avatarUrl: text("avatar_url"),
    image: text("image"),
    emailVerified: timestamp("email_verified"),
    password: text("password"), // Nullable for OAuth users
    plan: userPlanEnum("plan").default("free"),
    createdAt: timestamp("created_at").defaultNow(),
});

// NextAuth required: Accounts Table (OAuth provider links)
export const accounts = pgTable(
    "accounts",
    {
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("provider_account_id").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        primaryKey({ columns: [account.provider, account.providerAccountId] }),
    ]
);

// NextAuth required: Sessions Table
export const sessions = pgTable("sessions", {
    sessionToken: text("session_token").primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires").notNull(),
});

// NextAuth required: Verification Tokens Table
export const verificationTokens = pgTable(
    "verification_tokens",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires").notNull(),
    },
    (vt) => [
        primaryKey({ columns: [vt.identifier, vt.token] }),
    ]
);

// Resumes Table
export const resumes = pgTable("resumes", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    title: text("title").notNull(),
    slug: text("slug").unique().notNull(), // for public sharing url
    data: jsonb("data").default({}).notNull(), // Stores block data
    templateId: text("template_id").default("professional"),
    themeConfig: jsonb("theme_config").default({}),
    visibility: visibilityEnum("visibility").default("private"),
    updatedAt: timestamp("updated_at").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
});

// Resume Versions / Snapshots (Optional for Phase 2, including for structure)
export const resumeVersions = pgTable("resume_versions", {
    id: uuid("id").defaultRandom().primaryKey(),
    resumeId: uuid("resume_id").references(() => resumes.id).notNull(),
    data: jsonb("data").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

// Shared Links (for tracking views)
export const sharedLinks = pgTable("shared_links", {
    id: uuid("id").defaultRandom().primaryKey(),
    resumeId: uuid("resume_id").references(() => resumes.id).notNull(),
    token: text("token").unique().notNull(),
    views: integer("views").default(0),
    expiresAt: timestamp("expires_at"),
});
