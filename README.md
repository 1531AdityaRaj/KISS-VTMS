# NayiDisha — Vocational Training Management System (VTMS)
### In Collaboration with Kalinga Institute of Social Sciences (KISS) & KIIT Deemed to be University

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 3](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-20%20Passed-emerald)](./tests/software-engineering.test.mjs)
[![SDLC Standard](https://img.shields.io/badge/SDLC-IEEE%20830%20%7C%20Agile%20Scrum-green)](./docs/1_SRS_DOCUMENT.md)

---

## 📖 Overview

**NayiDisha VTMS** is a full-featured, institutional web application designed to manage and deliver vocational education across **20 specialized technical trades** at the Kalinga Institute of Social Sciences (KISS). The platform streamlines the entire educational lifecycle:
- **Vocational Course Catalog:** 20 distinct trades ranging from Solar Energy and Industrial CNC to Traditional Tribal Crafts and Mobile Repair.
- **Biometric & Manual Attendance Tracking:** Session-by-session compliance with automatic 75% certification eligibility enforcement.
- **Workshop Practicals & Rubric Scoring:** Digital task submission, tool requisition tracking, and multi-point grading.
- **Online Modular Assessments:** Instant MCQ testing with automated evaluation and GPA calculation.
- **Two-Tier Certificate Authorization:** Course Instructor sign-off followed by Institutional Administrator seal.
- **Cryptographic QR Verification:** Instant public certificate authenticity lookup at `/verify/[certificateId]`.

---

## 🎓 Academic Software Engineering Course Handout Compliance

This project strictly adheres to the official university **Software Engineering (SDLC)** curriculum. Complete, formal documentation is available in the [`docs/`](./docs/README.md) directory:

| Course Handout Module | Key Topics Addressed | Documentation Link |
| :--- | :--- | :--- |
| **Module 2: Requirements & Design** | Requirements Gathering, IEEE 830 SRS, Decision Tables & Trees, Cohesion & Coupling, DFD Level 0/1/2, UML Diagrams (Use Case, Class, Sequence, Activity), UI Design | [1. SRS Document](./docs/1_SRS_DOCUMENT.md)<br>[2. Software Design Document](./docs/2_SOFTWARE_DESIGN_DOCUMENT.md) |
| **Module 3: Project Management** | Agile Scrum, LOC & Function Point (FP: 201.8 FP), Delphi Technique, COCOMO Models (22.7 PM), Putnam Staffing, WBS, CPM / PERT (44-day Critical Path), Gantt Chart, RMMM Risk Plan | [3. Project Management Plan](./docs/3_SOFTWARE_PROJECT_MANAGEMENT_PLAN.md) |
| **Module 4: Coding & Testing** | Code Review Checklist, Verification & Validation (V&V), Equivalence Partitioning, Boundary Value Analysis (BVA), Cyclomatic Complexity ($V(G)=5$), Basis Path Testing, Executable Tests | [4. Coding & Testing Strategies](./docs/4_CODING_AND_TESTING_STRATEGIES.md) |
| **Module 5: Reliability & Maintenance** | SQA Plan, ISO 9001, SEI-CMM (Level 1–5), Reliability Metrics (MTBF: 720.25h, Availability: 99.965%), Maintenance Types, Reverse/Re-engineering, Software Reuse | [5. SQA, Reliability & Maintenance](./docs/5_SQA_RELIABILITY_AND_MAINTENANCE.md) |
| **Emerging Topics** | Software as a Service (SaaS Multi-tenancy, RBAC), AI-based Software Engineering (predictive analytics, intelligent rubrics) | [5. SQA Section 6](./docs/5_SQA_RELIABILITY_AND_MAINTENANCE.md#6-emerging-topics-in-software-engineering) |

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js:** v18+ (tested on Node.js v24)
- **Package Manager:** `npm` (included with Node.js)

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd "KISS VTM"

# Install project dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Run the Automated Academic Test Suite
```bash
npm test
```
Executes all 17 automated tests covering Unit, Black-Box (BVA), White-Box (Basis Path), and Integration workflows.

---

## 🔑 Demo Credentials

Default Password for all demo accounts: `password123` *(or use the one-click demo buttons on the login page)*

| Role | Username / Identifier | Email | Default Dashboard |
| :--- | :--- | :--- | :--- |
| **Student** | `KISS-ST-2026-001` | `aditya.raj@example.com` | `/student` |
| **Instructor** | `rohit.kumar@example.com` | `rohit.kumar@example.com` | `/instructor` |
| **Administrator** | `admin@kiss.ac.in` | `admin@kiss.ac.in` | `/admin` |
| **Public Verifier** | *Any certificate ID* (e.g. `KISS-VT-2026-000421`) | *No login needed* | `/verify` |

---

## 📂 Project Architecture

```
KISS VTM/
├── docs/                               # Formal Software Engineering Documentation
│   ├── README.md                       # Academic Course Handout Compliance Index
│   ├── 1_SRS_DOCUMENT.md               # IEEE 830 Compliant Specification & Decision Tables
│   ├── 2_SOFTWARE_DESIGN_DOCUMENT.md   # DFD (Level 0, 1, 2) & UML (Use Case, Class, Sequence)
│   ├── 3_SOFTWARE_PROJECT_MANAGEMENT_PLAN.md # Agile Sprints, FP Metric, COCOMO, CPM/PERT, Gantt
│   ├── 4_CODING_AND_TESTING_STRATEGIES.md    # V&V Matrix, BVA, Cyclomatic Complexity, Test Cases
│   └── 5_SQA_RELIABILITY_AND_MAINTENANCE.md  # SQA Plan, ISO 9001, CMMI, MTBF, SaaS & AI in SE
├── tests/                              # Automated Test Suite
│   └── software-engineering.test.mjs   # 17 automated unit, black-box, white-box & integration tests
├── prisma/                             # Database Schema & Migrations
│   ├── schema.prisma                   # Prisma relational domain schema
│   └── dev.db                          # SQLite institutional database
├── public/                             # Public static assets & institutional photography
├── src/
│   ├── app/                            # Next.js App Router (Client & Server Components)
│   │   ├── (auth)/                     # Login, Registration, Forgot Password
│   │   ├── admin/                      # Administrator management dashboards (11 views)
│   │   ├── courses/                    # Vocational electives catalog & course detail
│   │   ├── instructor/                 # Faculty class, attendance & grading portal (10 views)
│   │   ├── student/                    # Student learning, assignment & certificate portal (9 views)
│   │   └── verify/                     # Zero-login cryptographic QR certificate verifier
│   ├── components/                     # Reusable React UI components
│   │   ├── certificates/               # Printable A4 official certificate component
│   │   ├── layout/                     # AppShell, responsive sidebar, public navbar
│   │   └── ui/                         # Trade photography thumbnails, institutional logos
│   ├── features/auth/                  # Server Actions for authentication & session mutations
│   ├── lib/                            # Application domain logic
│   │   ├── auth/                       # HTTP cookie session handling & RBAC verification
│   │   ├── db/                         # In-memory & SQLite data store with initial seed
│   │   └── utils.ts                    # Pure functional formatting & Tailwind merging utilities
│   └── types/                          # Centralized TypeScript domain interface definitions
├── package.json                        # Scripts, dependencies, and npm test runner configuration
└── tsconfig.json                       # Strict TypeScript configuration
```

