import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").primaryKey().defaultRandom();
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

export const users = pgTable("users", {
  id: id(),
  email: text("email").notNull().unique(),
  name: text("name"),
  status: text("status").notNull().default("pending_verification"),
  staffRole: text("staff_role"),
  adultConfirmedAt: timestamp("adult_confirmed_at", { withTimezone: true }),
  createdAt: createdAt(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const roleAssignments = pgTable(
  "role_assignments",
  {
    id: id(),
    userId: uuid("user_id").notNull().references(() => users.id),
    role: text("role").notNull(), // founder | freelancer | job_seeker
    status: text("status").notNull().default("active"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("role_user_role_uq").on(t.userId, t.role)],
);

export const userConsents = pgTable("user_consents", {
  id: id(),
  userId: uuid("user_id").notNull().references(() => users.id),
  document: text("document").notNull(),
  version: text("version").notNull(),
  acceptedAt: createdAt(),
});

export const profiles = pgTable("profiles", {
  id: id(),
  userId: uuid("user_id").notNull().unique().references(() => users.id),
  handle: text("handle").notNull().unique(),
  headline: text("headline"),
  bio: text("bio"),
  searchable: boolean("searchable").notNull().default(false),
  createdAt: createdAt(),
});

export const companies = pgTable("companies", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: createdAt(),
});

export const companyMemberships = pgTable(
  "company_memberships",
  {
    id: id(),
    companyId: uuid("company_id").notNull().references(() => companies.id),
    userId: uuid("user_id").notNull().references(() => users.id),
    role: text("role").notNull(), // owner|admin|hiring_manager|recruiter|project_manager|viewer
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("company_member_uq").on(t.companyId, t.userId)],
);

export const posts = pgTable(
  "posts",
  {
    id: id(),
    authorId: uuid("author_id").notNull().references(() => users.id),
    kind: text("kind").notNull().default("text"),
    audience: text("audience").notNull().default("members"),
    body: text("body").notNull(),
    createdAt: createdAt(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [index("posts_author_created_idx").on(t.authorId, t.createdAt)],
);

export const jobs = pgTable(
  "jobs",
  {
    id: id(),
    companyId: uuid("company_id").notNull().references(() => companies.id),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: text("status").notNull().default("draft"),
    closesAt: timestamp("closes_at", { withTimezone: true }),
    createdAt: createdAt(),
  },
  (t) => [index("jobs_company_status_idx").on(t.companyId, t.status, t.createdAt)],
);

export const applications = pgTable(
  "applications",
  {
    id: id(),
    jobId: uuid("job_id").notNull().references(() => jobs.id),
    applicantId: uuid("applicant_id").notNull().references(() => users.id),
    stage: text("stage").notNull().default("new"),
    coverNote: text("cover_note"),
    profileSnapshot: jsonb("profile_snapshot").notNull(),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("application_job_applicant_uq").on(t.jobId, t.applicantId)],
);

export const applicationStageHistory = pgTable("application_stage_history", {
  id: id(),
  applicationId: uuid("application_id").notNull().references(() => applications.id),
  actorId: uuid("actor_id").references(() => users.id),
  fromStage: text("from_stage"),
  toStage: text("to_stage").notNull(),
  createdAt: createdAt(),
});

export const projects = pgTable("projects", {
  id: id(),
  companyId: uuid("company_id").references(() => companies.id),
  ownerId: uuid("owner_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  scope: text("scope").notNull(),
  budgetModel: text("budget_model").notNull().default("fixed"),
  status: text("status").notNull().default("draft"),
  createdAt: createdAt(),
});

export const proposals = pgTable(
  "proposals",
  {
    id: id(),
    projectId: uuid("project_id").notNull().references(() => projects.id),
    freelancerId: uuid("freelancer_id").notNull().references(() => users.id),
    status: text("status").notNull().default("submitted"),
    version: integer("version").notNull().default(1),
    approach: text("approach").notNull(),
    price: integer("price").notNull(),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("proposal_project_freelancer_uq").on(t.projectId, t.freelancerId)],
);

/** Append-only: the app role must have UPDATE/DELETE revoked (see docs). */
export const auditLogs = pgTable("audit_logs", {
  id: id(),
  actorId: uuid("actor_id"),
  action: text("action").notNull(),
  targetType: text("target_type"),
  targetId: text("target_id"),
  reason: text("reason"),
  meta: jsonb("meta"),
  createdAt: createdAt(),
});
