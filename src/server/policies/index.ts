export type CompanyRole =
  | "owner"
  | "admin"
  | "hiring_manager"
  | "recruiter"
  | "project_manager"
  | "viewer";

export type StaffRole =
  | "super_admin"
  | "admin"
  | "moderator"
  | "support"
  | "finance"
  | "analyst";

export interface Actor {
  id: string;
  staffRole?: StaffRole | null;
  twoFactor?: boolean;
  /** companyId -> role, loaded server-side from company_memberships */
  companies: Record<string, CompanyRole>;
}

export type Action =
  | "company.manage"
  | "job.publish"
  | "applicant.view_cv"
  | "applicant.view_notes"
  | "pipeline.view"
  | "project.manage"
  | "admin.access"
  | "staff.grant_privileged";

export interface Resource {
  companyId?: string;
}

const HIRING: CompanyRole[] = ["owner", "admin", "hiring_manager", "recruiter"];

const COMPANY_RULES: Partial<Record<Action, CompanyRole[]>> = {
  "company.manage": ["owner", "admin"],
  "job.publish": ["owner", "admin", "hiring_manager"],
  "applicant.view_cv": HIRING,
  "applicant.view_notes": HIRING,
  "pipeline.view": [...HIRING, "viewer"],
  "project.manage": ["owner", "admin", "project_manager"],
};

/** Single source of authorization. UI hiding is cosmetic only. */
export function can(actor: Actor | null, action: Action, resource: Resource = {}): boolean {
  if (!actor) return false;

  if (action === "admin.access") return Boolean(actor.staffRole) && actor.twoFactor === true;
  if (action === "staff.grant_privileged") return actor.staffRole === "super_admin" && actor.twoFactor === true;

  const allowed = COMPANY_RULES[action];
  if (!allowed || !resource.companyId) return false;
  const role = actor.companies[resource.companyId];
  return role !== undefined && allowed.includes(role);
}
