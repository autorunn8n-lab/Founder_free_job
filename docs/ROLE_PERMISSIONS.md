# Role permissions

Source of truth: `src/server/policies/index.ts`. Every row below is covered by `policies.test.ts` unless marked *planned*.

## Company roles

| Action | Owner | Admin | Hiring Manager | Recruiter | Project Manager | Viewer |
|---|---|---|---|---|---|---|
| Manage company | yes | yes | no | no | no | no |
| Publish jobs | yes | yes | yes | no | no | no |
| View applicant CV | yes | yes | yes | yes | no | no |
| View private hiring notes | yes | yes | yes | yes | no | no |
| View pipeline stages | yes | yes | yes | yes | no | yes |
| Manage projects | yes | yes | no | no | yes | no |

All company checks are scoped to the company in the resource; a role in one company grants nothing in another.

## Staff

| Action | super_admin | admin | other staff |
|---|---|---|---|
| Access admin console | yes (2FA) | yes (2FA) | yes (2FA) |
| Grant admin or finance roles | yes (2FA) | no | no |

## Planned (later phases)
Moderator, support and finance scoping, break-glass reads, refund requester/approver separation, engagement participant access, appeal reviewer must differ from the original moderator.
