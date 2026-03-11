# 🧪 QA Automation Portfolio — Playwright + TypeScript

> Production-style test automation framework built with **Playwright**, **TypeScript**, **Faker.js**, and **k6**. Designed to validate real-world E2E flows, API contracts, and backend performance under load.

---

## 🏗️ Architecture

```
📂 qa-automation-portfolio-2026
├── 📁 .github/workflows        # CI/CD pipeline (GitHub Actions)
├── 📁 src/pages                 # Page Object Model (POM)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── 📁 tests
│   ├── 📁 api                   # API contract tests (DummyJSON)
│   │   └── users.spec.ts
│   ├── 📁 e2e                   # UI E2E tests (SauceDemo)
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   ├── 📁 fixtures              # Dependency injection layer
│   │   └── baseTest.ts
│   └── 📁 performance           # Load testing (k6)
│       └── api_load.spec.js
├── playwright.config.ts         # Multi-project config (UI + API)
├── tsconfig.json                # Strict TypeScript configuration
└── package.json
```

---

## 🔑 Key Engineering Decisions

| Decision | Rationale |
|---|---|
| **Page Object Model** | Centralizes UI selectors in reusable classes. If the UI changes, only one file needs updating — not 50 tests. |
| **Custom Fixtures (`baseTest.ts`)** | Extends Playwright's `test.extend()` to inject page objects and pre-authenticated state. Eliminates repetitive `beforeEach()` login logic. |
| **Dynamic Data (Faker.js)** | Replaces static test data with randomized inputs (names, postal codes) to catch edge-case bugs that hardcoded values miss. |
| **Separate Projects (UI vs API)** | `playwright.config.ts` defines isolated projects (`e2e-chromium`, `api-tests`) with distinct `baseURL` and `testDir`, preventing cross-contamination between test types. |
| **Performance SLAs (k6)** | Defines quantitative performance thresholds (p95 < 500ms, error rate < 1%) so that "fast enough" is measurable, not subjective. |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install browser binaries
npx playwright install

# Run all tests (UI + API)
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run performance tests (requires k6 — install from https://k6.io/docs/get-started/installation/)
npm run test:perf

# View HTML report
npm run report
```

---

## ✅ Test Coverage

### UI Tests (SauceDemo) — `e2e-chromium`
| Suite | Tests | Covers |
|---|---|---|
| `login.spec.ts` | 2 | Valid login, invalid credentials error |
| `inventory.spec.ts` | 2 | Product count validation, add-to-cart |
| `cart.spec.ts` | 3 | Empty cart, add multiple items, remove item |
| `checkout.spec.ts` | 2 | Empty form validation, full purchase flow with Faker data |

### API Tests (DummyJSON) — `api-tests`
| Suite | Tests | Covers |
|---|---|---|
| `users.spec.ts` | 2 | List users + schema validation, create user with dynamic payload |

### Performance Tests (k6)
| Script | Scenario |
|---|---|
| `api_load.spec.js` | 20 concurrent VUs → 2min ramp → SLA: p95 < 500ms |

**Total: 11 automated tests across 3 layers (UI, API, Performance)**

---

## ⚙️ CI/CD

Tests run automatically on every `push` and `pull_request` via **GitHub Actions**. The pipeline:

1. Installs dependencies
2. Installs Playwright browsers
3. Runs API tests
4. Runs UI tests
5. Uploads HTML report as a downloadable artifact (retained for 30 days)

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation + API testing |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code with strict mode |
| [Faker.js](https://fakerjs.dev/) | Dynamic test data generation |
| [k6](https://grafana.com/docs/k6/) | Performance and load testing |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

---

## 📄 License

MIT
