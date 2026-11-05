# Academic Software Engineering Documentation & Compliance Suite
## Project: KISS Vocational Training Management System (NayiDisha VTMS)
**Institution:** Kalinga Institute of Social Sciences (KISS) / KIIT Deemed to be University  
**Course:** Software Engineering / Software Development Lifecycle (SDLC)  
**Standard Compliance:** IEEE Std 830-1998, ISO/IEC/IEEE 29148, ISO 9001, SEI-CMM, Agile Scrum  

---

## 📋 Course Handout Syllabus Mapping

| Module in Course Handout | Covered Topics | Detailed Document Reference |
| :--- | :--- | :--- |
| **Module 2: Requirement and Design Phases** | • Requirements Gathering & Analysis<br>• IEEE Standard SRS Document<br>• Decision Tables & Decision Trees<br>• Good Software Design (Cohesion & Coupling)<br>• Function-Oriented Design (DFD Level 0, 1, 2)<br>• Object-Oriented Design (UML Use Case, Class, Sequence, Activity)<br>• WebApp User Interface Design | [1. Software Requirements Specification (SRS)](./1_SRS_DOCUMENT.md)<br>[2. Software Design Document (SDD)](./2_SOFTWARE_DESIGN_DOCUMENT.md) |
| **Module 3: Software Project Management** | • Project Complexity & Planning<br>• Metrics: LOC & Function Point (FP) Calculation<br>• Estimation: Delphi Technique & COCOMO Models<br>• Staffing Level Estimation (Putnam Model)<br>• Scheduling: WBS, CPM, PERT, Gantt Charts<br>• Organization & Team Structure<br>• Risk Management (RMMM Plan) | [3. Software Project Management Plan (SPMP)](./3_SOFTWARE_PROJECT_MANAGEMENT_PLAN.md) |
| **Module 4: Coding and Testing Strategies** | • Code Review Checklist<br>• Verification & Validation (V&V)<br>• Unit, Integration, System, Acceptance Testing<br>• Black-Box Testing (Equivalence Partitioning, BVA)<br>• White-Box Testing (Cyclomatic Complexity, Basis Path)<br>• Test Drivers & Test Stubs<br>• Automated Executable Test Suite (`npm test`) | [4. Coding and Testing Strategies](./4_CODING_AND_TESTING_STRATEGIES.md)<br>[Test Suite Execution File](../tests/software-engineering.test.mjs) |
| **Module 5: Software Reliability and Maintenance** | • Software Quality Assurance (SQA) Plan<br>• ISO 9000 & SEI-CMM Maturity Models<br>• Software Reliability Metrics (MTBF, MTTF, MTTR)<br>• Maintenance Types (Corrective, Adaptive, Perfective)<br>• Reverse Engineering, Re-engineering, Software Reuse | [5. SQA, Reliability & Maintenance](./5_SQA_RELIABILITY_AND_MAINTENANCE.md) |
| **Emerging Topics** | • Software as a Service (SaaS) Multi-tenancy Architecture<br>• AI-based Software Engineering (AI-assisted grading, intelligent guidance) | [5. SQA, Reliability & Maintenance (Section 6)](./5_SQA_RELIABILITY_AND_MAINTENANCE.md#6-emerging-topics-in-software-engineering) |
| **Comprehensive Architecture & Interview Master Guide** | • Elevator Pitch<br>• Tech Stack Breakdown with Rationale<br>• GPU 60-120 FPS Performance Optimizations<br>• Student-Instructor-Admin Tripartite Workflow<br>• End-to-End Sequence Diagram<br>• Top 10 Technical Interview Q&A | [6. Project Architecture & Interview Master Guide](./6_PROJECT_ARCHITECTURE_AND_INTERVIEW_GUIDE.md) |

---

## 🚀 How to Run the Automated Academic Test Suite

To verify Module 4 (Testing Strategies) live in terminal:
```bash
npm test
```
This executes all 20 automated tests covering Unit Testing, Equivalence Partitioning, Boundary Value Analysis, Basis Path White-Box Testing, Integration Workflows, and Business Requirement BR-10 with 100% pass rate.

