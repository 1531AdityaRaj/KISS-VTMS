# Software Design Document (SDD)
## Project: KISS Vocational Training Management System (NayiDisha VTMS)
**Standard Reference:** IEEE Std 1016-2009 / Software Design Engineering  
**Version:** 1.0.0  
**Status:** Approved Architectural Baseline  

---

## 1. Overview of the Design Process

Software design transforms user requirements specified in the SRS into an implementable blueprint. The NayiDisha VTMS design follows a hybrid architectural methodology:
1. **High-Level Architectural Design:** Multi-tier decoupled WebApp architecture (Next.js App Router, Server Actions, Prisma ORM).
2. **Function-Oriented Structural Analysis:** Data Flow Diagrams (DFDs) modeling data transformation across functional processes.
3. **Object-Oriented Design (OOD):** UML models capturing encapsulation, class hierarchies, state transitions, and interaction dynamics.
4. **Interface & Interaction Design:** Component hierarchy, responsive viewport adaptation, and atomic design tokens.

---

## 2. Characterization of a Good Software Design

A good software design must exhibit three foundational pillars: **Understandability**, **Modifiability**, and **Efficiency**.

### 2.1 Cohesion Analysis
Cohesion measures the strength of functional relatedness among elements within a module.
- **Functional Cohesion (High - Achieved):** Every module and component performs a single, well-defined operational task:
  - `src/lib/auth/session.ts`: Dedicated solely to HTTP cookie lifecycle and RBAC authorization verification.
  - `src/lib/utils.ts`: Pure functional utilities for formatting (`formatDate`, `formatPercentage`, `cn`).
  - `src/components/certificates/CertificateDocument.tsx`: Isolated presentation component responsible solely for certificate rendering, watermark placement, and print optimization.
- **Avoidance of Low Cohesion:** Coincidental and logical cohesion anti-patterns are strictly eliminated.

### 2.2 Coupling Analysis
Coupling measures the degree of interdependence between software modules.
- **Data Coupling (Lowest / Best - Achieved):** Modules interact exclusively through clean parameter lists and strictly typed TypeScript interfaces (`types/index.ts`).
- **Elimination of Common/Control Coupling:** Global state mutation is eliminated; shared application state is managed through centralized database stores (`db-store.ts`) or SQLite tables.

| Metric | Target | Implemented Status | Architectural Benefit |
| :--- | :---: | :---: | :--- |
| **Cohesion** | High | **Functional Cohesion** | High reusability, isolated debugging, easy maintenance. |
| **Coupling** | Low | **Data Coupling** | Zero ripple effects when modifying individual UI routes. |

---

## 3. Function-Oriented Software Design (DFD Model)

### 3.1 DFD Level 0 (Context Level Diagram)
The Context Diagram establishes the boundary of the VTMS, representing external entities and top-level data inflows/outflows.

```mermaid
flowchart TD
    Student(["Student"])
    Instructor(["Instructor"])
    Admin(["Administrator"])
    Verifier(["Public Verifier"])
    
    VTMS[["0.0<br>KISS Vocational Training Management System<br>(NayiDisha VTMS)"]]
    
    Student -- "Registration Details, Lab Submissions, Quiz Answers" --> VTMS
    VTMS -- "Enrolled Courses, Grades, Digital Certificate" --> Student
    
    Instructor -- "Attendance Marks, Practical Rubrics, Module Schedules" --> VTMS
    VTMS -- "Class Rosters, Student Submissions, Review Queue" --> Instructor
    
    Admin -- "Course Definitions, Batch Allocations, Policy Settings" --> VTMS
    VTMS -- "Institutional Analytics, Audit Logs, Approval Alerts" --> Admin
    
    Verifier -- "Certificate ID / Scanned QR Token" --> VTMS
    VTMS -- "Authentication Verification Badge & Issuer Metadata" --> Verifier
```

---

### 3.2 DFD Level 1 (Functional Decomposition Diagram)
Level 1 decomposes the system into five primary operational processes and four shared datastores.

```mermaid
flowchart LR
    subgraph External Entities
        E1(["Student"])
        E2(["Instructor"])
        E3(["Admin"])
        E4(["Public Verifier"])
    end

    subgraph Processes
        P1["1.0 Authentication & Session Management"]
        P2["2.0 Course & Batch Scheduling"]
        P3["3.0 Attendance & Compliance Tracking"]
        P4["4.0 Practical & Assessment Engine"]
        P5["5.0 Certification & QR Verification"]
    end

    subgraph Data Stores
        D1[("D1: Users & Profiles")]
        D2[("D2: Courses & Batches")]
        D3[("D3: Attendance Records")]
        D4[("D4: Academic Results & Certificates")]
    end

    E1 -- "Credentials" --> P1
    E2 -- "Credentials" --> P1
    E3 -- "Credentials" --> P1
    P1 <--> D1

    E3 -- "Course Specs" --> P2
    P2 <--> D2

    E2 -- "Mark Daily Attendance" --> P3
    P3 --> D3
    D3 --> P5

    E1 -- "Submit Practical / Quiz" --> P4
    E2 -- "Grade Submissions" --> P4
    P4 <--> D4

    D4 --> P5
    P5 -- "Issue Certificate" --> E1
    E4 -- "Verify QR / ID" --> P5
    P5 -- "Verification Result" --> E4
```

---

### 3.3 DFD Level 2 (Certification & Verification Subsystem)

```mermaid
flowchart TD
    StartInput["Student Enrollment Record"] --> P5_1["5.1 Evaluate Certification Eligibility (Rule Engine)"]
    P5_1 -- "Meets 75% Attendance & 60% Marks" --> P5_2["5.2 Route to Instructor Review"]
    P5_2 -- "Faculty Signature Added" --> P5_3["5.3 Route to Administrative Authorization"]
    P5_3 -- "Institutional Seal Authorized" --> P5_4["5.4 Generate Unique ID & Cryptographic QR"]
    P5_4 --> StoreCert[("D4: Issued Certificates")]
    
    QueryVerify["Public Query: Certificate ID"] --> P5_5["5.5 Query & Validate Status"]
    StoreCert --> P5_5
    P5_5 --> RenderProof["5.6 Render Public Authenticity Page"]
```

---

## 4. Object-Oriented Software Design (UML Models)

### 4.1 UML Use Case Diagram

```mermaid
flowchart LR
    Student(["Student"])
    Instructor(["Instructor"])
    Admin(["Administrator"])
    Verifier(["Public Verifier"])

    subgraph "NayiDisha VTMS System Boundary"
        UC1((UC-1: Register / Login))
        UC2((UC-2: Browse Vocational Electives))
        UC3((UC-3: View Daily Timetable))
        UC4((UC-4: Submit Lab Practicals))
        UC5((UC-5: Attempt Online Assessment))
        UC6((UC-6: Download Certificate))
        
        UC7((UC-7: Mark Attendance))
        UC8((UC-8: Create Assignment / Rubric))
        UC9((UC-9: Grade Student Work))
        UC10((UC-10: Sign Off Certificate))
        
        UC11((UC-11: Manage Courses & Batches))
        UC12((UC-12: Institutional Audit & Reports))
        UC13((UC-13: Authorize / Revoke Certificate))
        
        UC14((UC-14: Scan QR Code & Verify))
    end

    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC5
    Student --> UC6

    Instructor --> UC1
    Instructor --> UC7
    Instructor --> UC8
    Instructor --> UC9
    Instructor --> UC10

    Admin --> UC1
    Admin --> UC11
    Admin --> UC12
    Admin --> UC13

    Verifier --> UC14
```

---

### 4.2 UML Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String email
        +String username
        +UserRole role
        +String avatarUrl
        +DateTime createdAt
        +login()
        +logout()
    }

    class StudentProfile {
        +String studentId
        +String fullName
        +String emergencyContact
        +viewAttendance()
        +submitAssignment()
        +downloadCertificate()
    }

    class InstructorProfile {
        +String instructorId
        +String designation
        +String department
        +markAttendance()
        +gradePractical()
        +signCertificate()
    }

    class Course {
        +String id
        +String title
        +String code
        +String duration
        +SkillLevel skillLevel
        +String practicalFocus
        +Boolean hasCertificate
        +getModules()
    }

    class Batch {
        +String id
        +String name
        +String code
        +Date startDate
        +Date endDate
        +Int maxStudents
        +getEnrolledStudents()
    }

    class AttendanceRecord {
        +String id
        +Date date
        +Int sessionNumber
        +AttendanceStatus status
        +String remarks
    }

    class Certificate {
        +String id
        +String certificateId
        +String studentName
        +String courseName
        +CertificateStatus status
        +String qrCodeUrl
        +String verificationUrl
        +verifyAuthenticity()
        +printDocument()
    }

    User <|-- StudentProfile : extends
    User <|-- InstructorProfile : extends
    Course "1" *-- "many" Batch : offers
    Batch "1" *-- "many" AttendanceRecord : logs
    StudentProfile "1" -- "many" AttendanceRecord : attends
    StudentProfile "1" -- "0..*" Certificate : earns
    Course "1" -- "0..*" Certificate : validates
```

---

### 4.3 UML Sequence Diagram: Certificate Issuance and Public Verification

```mermaid
sequenceDiagram
    actor Student
    actor Instructor
    actor Admin
    participant System as VTMS Engine
    actor Verifier

    Student->>System: Completes Modules, Practicals & Final Assessment
    System->>System: Evaluates Eligibility (Attendance >= 75%, Marks >= 60%)
    Note over System: Auto-flagged as ELIGIBLE
    
    System->>Instructor: Push Notification: Review Candidate
    Instructor->>System: Review Rubrics & Approve Sign-off
    
    System->>Admin: Push Notification: Final Institutional Authorization
    Admin->>System: Approve & Authorize Seal
    
    System->>System: Generate Cryptographic QR & Unique Certificate ID
    System->>Student: Deliver Digital Certificate on Dashboard
    
    Verifier->>System: Scan QR / Request /verify/KISS-VT-2026-000421
    System->>Verifier: Return 200 OK + Verified Institutional Credentials
```

---

### 4.4 UML Activity Diagram: Student Course Lifecycle

```mermaid
stateDiagram-v2
    [*] --> AccountRegistration
    AccountRegistration --> SelectVocationalElective
    SelectVocationalElective --> BatchEnrolled
    
    state InTraining {
        [*] --> AttendSessions
        AttendSessions --> CheckAttendanceThreshold
        CheckAttendanceThreshold --> CompleteWorkshopPracticals : Attendance >= 75%
        CheckAttendanceThreshold --> ShortageOfAttendance : Attendance < 75%
        ShortageOfAttendance --> RemedialSessions
        RemedialSessions --> AttendSessions
        CompleteWorkshopPracticals --> AttemptFinalAssessment
    }

    BatchEnrolled --> InTraining
    AttemptFinalAssessment --> GradeComputation
    
    state CertificationProcess {
        GradeComputation --> ReviewByInstructor : Composite >= 60%
        GradeComputation --> RetakeAssessment : Composite < 60%
        RetakeAssessment --> AttemptFinalAssessment
        ReviewByInstructor --> InstitutionalAdminApproval
        InstitutionalAdminApproval --> DigitalCertificateIssued
    }
    
    DigitalCertificateIssued --> [*]
```

---

## 5. User Interface (UI) WebApp Design

- **Grid Architecture:** 12-column responsive layout built on Tailwind CSS utility framework.
- **Institutional Palette:**
  - Primary Institutional Green: `#0b4f34`
  - Accent Gold: `#c89d3c`
  - Slate Background: `#f8fafc`
  - Emerald Status Indicators: `#10b981`
- **Responsive Breakpoints:** Fully tested at Mobile (375px), Tablet (768px), and Desktop (1280px+).
- **Print Styles:** Embedded print stylesheets (`@media print`) rendering A4-proportional official certificates with zero browser clutter.

