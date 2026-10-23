import { describe, expect, it } from "vitest";
import { can, type Actor } from "./index";

const actor = (companies: Actor["companies"], extra: Partial<Actor> = {}): Actor => ({
  id: "u1",
  companies,
  ...extra,
});

describe("can()", () => {
  it("denies anonymous visitors", () => {
    expect(can(null, "pipeline.view", { companyId: "c1" })).toBe(false);
  });

  it("lets recruiters see CVs and notes of their own company only", () => {
    const a = actor({ c1: "recruiter" });
    expect(can(a, "applicant.view_cv", { companyId: "c1" })).toBe(true);
    expect(can(a, "applicant.view_notes", { companyId: "c1" })).toBe(true);
    expect(can(a, "applicant.view_cv", { companyId: "c2" })).toBe(false);
  });

  it("lets viewers see the pipeline but never CVs or notes", () => {
    const a = actor({ c1: "viewer" });
    expect(can(a, "pipeline.view", { companyId: "c1" })).toBe(true);
    expect(can(a, "applicant.view_cv", { companyId: "c1" })).toBe(false);
    expect(can(a, "applicant.view_notes", { companyId: "c1" })).toBe(false);
  });

  it("restricts company management and project management by role", () => {
    expect(can(actor({ c1: "admin" }), "company.manage", { companyId: "c1" })).toBe(true);
    expect(can(actor({ c1: "recruiter" }), "company.manage", { companyId: "c1" })).toBe(false);
    expect(can(actor({ c1: "project_manager" }), "project.manage", { companyId: "c1" })).toBe(true);
    expect(can(actor({ c1: "hiring_manager" }), "project.manage", { companyId: "c1" })).toBe(false);
  });

  it("denies company actions without a resource", () => {
    expect(can(actor({ c1: "owner" }), "company.manage")).toBe(false);
  });

  it("requires 2FA for staff access", () => {
    expect(can(actor({}, { staffRole: "moderator", twoFactor: false }), "admin.access")).toBe(false);
    expect(can(actor({}, { staffRole: "moderator", twoFactor: true }), "admin.access")).toBe(true);
    expect(can(actor({}), "admin.access")).toBe(false);
  });

  it("only super_admin can grant privileged staff roles", () => {
    expect(can(actor({}, { staffRole: "admin", twoFactor: true }), "staff.grant_privileged")).toBe(false);
    expect(can(actor({}, { staffRole: "super_admin", twoFactor: true }), "staff.grant_privileged")).toBe(true);
  });
});
