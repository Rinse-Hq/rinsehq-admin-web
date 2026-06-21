# Demo Test Accounts

> **Last updated:** June 2026 — includes permission-based access control, store-scoped login, and header store switcher.

Use these accounts to test role-based access, store assignments, and permission levels in the RinseHQ admin dashboard. Demo accounts mirror the sub-admins configured under **Settings → Admin management**.

**Login URL:** `/login`

**Shared password (all accounts):** `Demo1234!`

On the login page, click any demo account card to auto-fill credentials. Each card shows a short summary of what that user can access.

---

## Credentials (quick copy)

| Email | Password | Role |
|-------|----------|------|
| `demo@rinsehq.com` | `Demo1234!` | Super / main admin (owner) |
| `chioma@laundrycare.ng` | `Demo1234!` | Manager |
| `emeka@laundrycare.ng` | `Demo1234!` | Staff |
| `fatima@laundrycare.ng` | `Demo1234!` | Viewer |

---

## Accounts overview

| Name | Email | Permission level | Store role | Assigned stores | Login flow |
|------|-------|------------------|------------|-----------------|------------|
| Adeola Johnson | `demo@rinsehq.com` | Full Admin | Owner | `STR-001`, `STR-002`, `STR-003` | Store picker |
| Chioma Okafor | `chioma@laundrycare.ng` | Manager | Manager | `STR-002`, `STR-003` | Store picker |
| Emeka Nwosu | `emeka@laundrycare.ng` | Staff | Sub-admin | `STR-003` | Direct to dashboard |
| Fatima Bello | `fatima@laundrycare.ng` | Viewer | Sub-admin | `STR-001`, `STR-002` | Store picker |

### Per-account access summary

| Account | Sidebar / features |
|---------|-------------------|
| **demo@rinsehq.com** | Dashboard, Orders, Transactions, Services, Account, **Settings** (Stores + Admin management) |
| **chioma@laundrycare.ng** | Dashboard, Orders, Transactions, Services, Account — **no Settings** |
| **emeka@laundrycare.ng** | Dashboard, Orders, Account only — **no Transactions, Services, or Settings** |
| **fatima@laundrycare.ng** | Dashboard, Orders, Transactions, Services, Account — **read-only**, no Settings |

---

## Stores

| Store ID | Name | City | Main store |
|----------|------|------|:----------:|
| `STR-001` | Laundry Care — Main Store | Lekki | Yes |
| `STR-002` | Laundry Care — Lekki Branch | Lekki Phase 1 | No |
| `STR-003` | Laundry Care — Ikeja Branch | Ikeja | No |

### Store assignments (matches Admin management)

| Email | Stores assigned | Permission at store |
|-------|-----------------|---------------------|
| `demo@rinsehq.com` | All stores (owner) | Full Admin |
| `chioma@laundrycare.ng` | Lekki Branch, Ikeja Branch | Manager |
| `emeka@laundrycare.ng` | Ikeja Branch | Staff |
| `fatima@laundrycare.ng` | Main Store, Lekki Branch | Viewer |

---

## Permission levels

Permission presets are defined in `src/presentation/data/account-mock-data.ts` and applied at login based on the **selected store**.

| Permission flag | Full Admin | Manager | Staff | Viewer |
|-----------------|:----------:|:-------:|:-----:|:------:|
| Orders | ✓ | ✓ | ✓ | ✓ |
| Services | ✓ | ✓ | — | ✓ |
| Transactions | ✓ | ✓ | — | ✓ |
| Reports | ✓ | ✓ | — | ✓ |
| Settings | ✓ | — | — | — |
| Admin management | ✓ | — | — | — |

### Feature access matrix (UI)

| Feature / area | Full Admin | Manager | Staff | Viewer |
|----------------|:----------:|:-------:|:-----:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| Orders (view) | Yes | Yes | Yes | Yes |
| Create order | Yes | Yes | Yes | **No** |
| Transactions | Yes | Yes | No | Yes (read-only) |
| Services | Yes | Yes | No | Yes (read-only) |
| Account (profile & business) | Yes | Yes | Yes | Yes |
| Settings → Stores | Yes | No | No | No |
| Settings → Admin management | Yes | No | No | No |
| Notifications / Help / Tickets | Yes | Yes | Yes | Yes |

**Viewer** = read-only on Orders, Transactions, and Services (no **Create Order** button).

---

## Login behavior

### Single store — Emeka (`emeka@laundrycare.ng`)
1. Enter email and password (or click the demo card).
2. Sign-in completes automatically — no store picker.
3. Redirected to `/dashboard` for **Ikeja Branch** (`STR-003`).

### Multiple stores — Adeola, Chioma, Fatima
1. Enter email and password (or click the demo card).
2. **Select a store** screen appears — only **assigned** stores are listed.
3. Pick a store and click **Continue**.
4. Redirected to `/dashboard` for that store.

Users **cannot** sign in to stores they are not assigned to.

---

## After login

### Store switcher (header)
- Shown when the user has **more than one** assigned store.
- Dropdown lists all accessible stores with city and role.
- Switching stores updates the session **without signing out**.
- Try with: `demo@rinsehq.com`, `chioma@laundrycare.ng`, or `fatima@laundrycare.ng`.

### Permission badge (header)
- Displays the user’s permission level for the **active store**: Full Admin, Manager, Staff, or Viewer.

### Access enforcement
- **Sidebar** — only shows nav items the user is allowed to access (`src/presentation/lib/access-control.ts`).
- **Route guard** — visiting a blocked URL (e.g. `/dashboard/settings` as Staff) redirects to the first allowed page (usually `/dashboard/orders`).
- **Settings** — only users with the `settings` permission see the sidebar link; **Admin management** tab requires `adminManagement` (Full Admin only).

### Sidebar visibility by role

| Sidebar item | Full Admin | Manager | Staff | Viewer |
|--------------|:----------:|:-------:|:-----:|:------:|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| Order | ✓ | ✓ | ✓ | ✓ |
| Transaction | ✓ | ✓ | — | ✓ |
| Service | ✓ | ✓ | — | ✓ |
| Account | ✓ | ✓ | ✓ | ✓ |
| Settings | ✓ | — | — | — |

---

## Quick test scenarios

| Goal | Account to use |
|------|----------------|
| Full access + Settings + all stores | `demo@rinsehq.com` |
| Manager without Settings | `chioma@laundrycare.ng` |
| Minimal access (orders only) | `emeka@laundrycare.ng` |
| Read-only viewer | `fatima@laundrycare.ng` |
| Login store picker | `demo@rinsehq.com`, `chioma@laundrycare.ng`, `fatima@laundrycare.ng` |
| Direct login (no picker) | `emeka@laundrycare.ng` |
| Header store switcher | `demo@rinsehq.com`, `chioma@laundrycare.ng`, `fatima@laundrycare.ng` |
| Blocked route redirect | Log in as `emeka@laundrycare.ng`, open `/dashboard/settings` manually |

---

## Source files

| Purpose | File |
|---------|------|
| Demo account list & summaries | `src/presentation/data/demo-accounts.ts` |
| Permission presets & sub-admin mock data | `src/presentation/data/account-mock-data.ts` |
| Store definitions & assignments | `src/presentation/data/stores-data.ts` |
| User seeding (in-memory) | `src/infrastructure/auth/in-memory-user-store.ts` |
| Store access resolution | `src/infrastructure/stores/in-memory-store-repository.ts` |
| Sidebar & route access rules | `src/presentation/lib/access-control.ts` |
| Login UI with demo cards | `src/presentation/components/auth/sign-in-form.tsx` |

---

## Notes

- Demo data is **in-memory** and resets when the dev server restarts.
- Sub-admin accounts do not own stores; they access locations via assignments on the main business (owner) account.
- Permission level is stored in the session per **selected store** — switching stores may change the effective role if assignments differ (demo assignments use the same level across stores per user).
- Production will replace in-memory stores with a real API; the permission model stays aligned with **Settings → Admin management**.
