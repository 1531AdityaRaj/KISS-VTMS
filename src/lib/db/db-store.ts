import {
  User,
  StudentProfile,
  InstructorProfile,
  AdminProfile,
  CourseCategory,
  Course,
  Module,
  Batch,
  Enrollment,
  AttendanceRecord,
  TimetableEntry,
  Assignment,
  AssignmentSubmission,
  Practical,
  PracticalSubmission,
  Assessment,
  AssessmentAttempt,
  Result,
  Certificate,
  CertificateEligibility,
  Announcement,
  Notification,
  AuditLog,
  SystemSetting,
  UserRole,
  CertificateStatus,
} from "@/types";
import {
  initialCategories,
  initialUsers,
  initialStudents,
  initialInstructors,
  initialAdmins,
  initialCourses,
  initialModules,
  initialBatches,
  initialEnrollments,
  initialAttendanceRecords,
  initialTimetable,
  initialAssignments,
  initialAssignmentSubmissions,
  initialPracticals,
  initialPracticalSubmissions,
  initialAssessments,
  initialAssessmentAttempts,
  initialResults,
  initialCertificates,
  initialAnnouncements,
  initialNotifications,
  initialAuditLogs,
  initialSystemSettings,
} from "./mock-data";

// Global in-memory singleton store with persistence across server actions and dev hot-reloads
interface GlobalStore {
  categories: CourseCategory[];
  users: User[];
  students: StudentProfile[];
  instructors: InstructorProfile[];
  admins: AdminProfile[];
  courses: Course[];
  modules: Module[];
  batches: Batch[];
  enrollments: Enrollment[];
  attendanceRecords: AttendanceRecord[];
  timetable: TimetableEntry[];
  assignments: Assignment[];
  assignmentSubmissions: AssignmentSubmission[];
  practicals: Practical[];
  practicalSubmissions: PracticalSubmission[];
  assessments: Assessment[];
  assessmentAttempts: AssessmentAttempt[];
  results: Result[];
  certificates: Certificate[];
  announcements: Announcement[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  systemSettings: SystemSetting[];
}

declare global {
  // eslint-disable-next-line no-var
  var __VTMS_STORE__: GlobalStore | undefined;
}

function getStore(): GlobalStore {
  if (!global.__VTMS_STORE__) {
    global.__VTMS_STORE__ = {
      categories: [...initialCategories],
      users: [...initialUsers],
      students: [...initialStudents],
      instructors: [...initialInstructors],
      admins: [...initialAdmins],
      courses: [...initialCourses],
      modules: [...initialModules],
      batches: [...initialBatches],
      enrollments: [...initialEnrollments],
      attendanceRecords: [...initialAttendanceRecords],
      timetable: [...initialTimetable],
      assignments: [...initialAssignments],
      assignmentSubmissions: [...initialAssignmentSubmissions],
      practicals: [...initialPracticals],
      practicalSubmissions: [...initialPracticalSubmissions],
      assessments: [...initialAssessments],
      assessmentAttempts: [...initialAssessmentAttempts],
      results: [...initialResults],
      certificates: [...initialCertificates],
      announcements: [...initialAnnouncements],
      notifications: [...initialNotifications],
      auditLogs: [...initialAuditLogs],
      systemSettings: [...initialSystemSettings],
    };
  }
  return global.__VTMS_STORE__;
}

export const db = {
  // USERS & AUTH
  users: {
    getAll: () => getStore().users,
    getById: (id: string) => getStore().users.find((u) => u.id === id),
    getByEmail: (email: string) =>
      getStore().users.find((u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === email.toLowerCase()),
    create: (data: Omit<User, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      getStore().users.push(newUser);
      return newUser;
    },
  },

  // STUDENTS
  students: {
    getAll: () => getStore().students,
    getById: (id: string) => getStore().students.find((s) => s.id === id),
    getByUserId: (userId: string) => getStore().students.find((s) => s.userId === userId),
    getByStudentId: (studentId: string) => getStore().students.find((s) => s.studentId === studentId),
    create: (data: Omit<StudentProfile, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newStudent: StudentProfile = {
        id: `st-${Date.now()}`,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      getStore().students.push(newStudent);
      return newStudent;
    },
    update: (id: string, data: Partial<StudentProfile>) => {
      const store = getStore();
      const index = store.students.findIndex((s) => s.id === id);
      if (index === -1) return null;
      store.students[index] = {
        ...store.students[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return store.students[index];
    },
    delete: (id: string) => {
      const store = getStore();
      const index = store.students.findIndex((s) => s.id === id);
      if (index !== -1) {
        store.students.splice(index, 1);
        return true;
      }
      return false;
    },
  },

  // INSTRUCTORS
  instructors: {
    getAll: () => getStore().instructors,
    getById: (id: string) => getStore().instructors.find((i) => i.id === id),
    getByUserId: (userId: string) => getStore().instructors.find((i) => i.userId === userId),
    create: (data: Omit<InstructorProfile, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newInstructor: InstructorProfile = {
        id: `ins-${Date.now()}`,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      getStore().instructors.push(newInstructor);
      return newInstructor;
    },
    update: (id: string, data: Partial<InstructorProfile>) => {
      const store = getStore();
      const index = store.instructors.findIndex((i) => i.id === id);
      if (index === -1) return null;
      store.instructors[index] = {
        ...store.instructors[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return store.instructors[index];
    },
  },

  // ADMINS
  admins: {
    getAll: () => getStore().admins,
    getById: (id: string) => getStore().admins.find((a) => a.id === id),
  },

  // COURSES
  courses: {
    getAll: () => getStore().courses,
    getById: (id: string) => getStore().courses.find((c) => c.id === id),
    getByCode: (code: string) => getStore().courses.find((c) => c.code === code),
    getByCategory: (categorySlug: string) => {
      const store = getStore();
      if (!categorySlug || categorySlug === "all") return store.courses;
      const cat = store.categories.find((c) => c.slug === categorySlug);
      if (!cat) return [];
      return store.courses.filter((c) => c.categoryId === cat.id);
    },
    create: (data: Omit<Course, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      getStore().courses.push(newCourse);
      return newCourse;
    },
    update: (id: string, data: Partial<Course>) => {
      const store = getStore();
      const index = store.courses.findIndex((c) => c.id === id);
      if (index === -1) return null;
      store.courses[index] = {
        ...store.courses[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return store.courses[index];
    },
    delete: (id: string) => {
      const store = getStore();
      const index = store.courses.findIndex((c) => c.id === id);
      if (index !== -1) {
        store.courses.splice(index, 1);
        return true;
      }
      return false;
    },
  },

  // CATEGORIES
  categories: {
    getAll: () => getStore().categories,
  },

  // MODULES
  modules: {
    getAll: () => getStore().modules,
    getByCourseId: (courseId: string) =>
      getStore().modules.filter((m) => m.courseId === courseId).sort((a, b) => a.order - b.order),
    getById: (id: string) => getStore().modules.find((m) => m.id === id),
    create: (data: Omit<Module, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newModule: Module = {
        id: `mod-${Date.now()}`,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      getStore().modules.push(newModule);
      return newModule;
    },
    update: (id: string, data: Partial<Module>) => {
      const store = getStore();
      const index = store.modules.findIndex((m) => m.id === id);
      if (index === -1) return null;
      store.modules[index] = {
        ...store.modules[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return store.modules[index];
    },
  },

  // BATCHES
  batches: {
    getAll: () => getStore().batches,
    getById: (id: string) => getStore().batches.find((b) => b.id === id),
    getByCourseId: (courseId: string) => getStore().batches.filter((b) => b.courseId === courseId),
    getByInstructorId: (instructorId: string) => getStore().batches.filter((b) => b.instructorId === instructorId),
    create: (data: Omit<Batch, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newBatch: Batch = {
        id: `batch-${Date.now()}`,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      getStore().batches.push(newBatch);
      return newBatch;
    },
    update: (id: string, data: Partial<Batch>) => {
      const store = getStore();
      const index = store.batches.findIndex((b) => b.id === id);
      if (index === -1) return null;
      store.batches[index] = {
        ...store.batches[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return store.batches[index];
    },
  },

  // ENROLLMENTS
  enrollments: {
    getAll: () => getStore().enrollments,
    getById: (id: string) => getStore().enrollments.find((e) => e.id === id),
    getByStudentId: (studentId: string) => getStore().enrollments.filter((e) => e.studentId === studentId),
    getActiveForStudent: (studentId: string) =>
      getStore().enrollments.find((e) => e.studentId === studentId && e.status === "ACTIVE"),
    getByBatchId: (batchId: string) => getStore().enrollments.filter((e) => e.batchId === batchId),
    canStudentEnroll: (studentId: string): { canEnroll: boolean; activeEnrollment?: Enrollment } => {
      const active = getStore().enrollments.find(
        (e) => e.studentId === studentId && e.status === "ACTIVE"
      );
      return {
        canEnroll: !active,
        activeEnrollment: active,
      };
    },
    create: (data: Omit<Enrollment, "id">) => {
      const store = getStore();
      // Business Requirement (BR-10): Single-Trade Specialization Policy
      // A student can ONLY participate in ONE active course at any time.
      const activeEnrollment = store.enrollments.find(
        (e) => e.studentId === data.studentId && e.status === "ACTIVE"
      );
      if (activeEnrollment) {
        throw new Error(
          `Enrollment Policy Violation: Student is already actively participating in "${activeEnrollment.courseTitle || activeEnrollment.courseCode}". Under the KISS Single-Trade Specialization Policy, a student can only participate in one course at a time.`
        );
      }
      const newEnrollment: Enrollment = {
        id: `enr-${Date.now()}`,
        ...data,
      };
      store.enrollments.push(newEnrollment);
      return newEnrollment;
    },
    updateProgress: (id: string, progressPercentage: number) => {
      const store = getStore();
      const item = store.enrollments.find((e) => e.id === id);
      if (item) {
        item.progressPercentage = Math.min(100, Math.max(0, progressPercentage));
      }
      return item;
    },
  },

  // ATTENDANCE
  attendance: {
    getAll: () => getStore().attendanceRecords,
    getByStudentId: (studentId: string) => getStore().attendanceRecords.filter((a) => a.studentId === studentId),
    getByBatchAndDate: (batchId: string, date: string) =>
      getStore().attendanceRecords.filter((a) => a.batchId === batchId && a.date === date),
    calculateStudentAttendanceRate: (studentId: string): number => {
      const records = getStore().attendanceRecords.filter((a) => a.studentId === studentId);
      if (records.length === 0) return 87; // fallback realistic default
      const presentEquiv = records.filter((r) => r.status === "PRESENT").length +
        records.filter((r) => r.status === "LATE").length * 0.5;
      return Math.round((presentEquiv / records.length) * 100);
    },
    markAttendance: (records: Omit<AttendanceRecord, "id">[]) => {
      const store = getStore();
      const saved: AttendanceRecord[] = [];
      records.forEach((rec) => {
        const existingIdx = store.attendanceRecords.findIndex(
          (a) => a.studentId === rec.studentId && a.batchId === rec.batchId && a.date === rec.date
        );
        if (existingIdx !== -1) {
          store.attendanceRecords[existingIdx] = {
            ...store.attendanceRecords[existingIdx],
            status: rec.status,
            remarks: rec.remarks,
          };
          saved.push(store.attendanceRecords[existingIdx]);
        } else {
          const newRec: AttendanceRecord = {
            id: `att-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            ...rec,
          };
          store.attendanceRecords.push(newRec);
          saved.push(newRec);
        }
      });
      return saved;
    },
  },

  // TIMETABLE
  timetable: {
    getAll: () => getStore().timetable,
    getByBatchId: (batchId: string) => getStore().timetable.filter((t) => t.batchId === batchId),
  },

  // ASSIGNMENTS & SUBMISSIONS
  assignments: {
    getAll: () => getStore().assignments,
    getById: (id: string) => getStore().assignments.find((a) => a.id === id),
    getByBatchId: (batchId: string) => getStore().assignments.filter((a) => a.batchId === batchId),
    getByCourseId: (courseId: string) => getStore().assignments.filter((a) => a.courseId === courseId),
    create: (data: Omit<Assignment, "id" | "createdAt">) => {
      const newAssignment: Assignment = {
        id: `asg-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      getStore().assignments.push(newAssignment);
      return newAssignment;
    },
  },

  submissions: {
    getAll: () => getStore().assignmentSubmissions,
    getById: (id: string) => getStore().assignmentSubmissions.find((s) => s.id === id),
    getByAssignmentAndStudent: (assignmentId: string, studentId: string) =>
      getStore().assignmentSubmissions.find((s) => s.assignmentId === assignmentId && s.studentId === studentId),
    getByStudentId: (studentId: string) =>
      getStore().assignmentSubmissions.filter((s) => s.studentId === studentId),
    createOrUpdate: (data: Omit<AssignmentSubmission, "id" | "submissionDate">) => {
      const store = getStore();
      const existingIdx = store.assignmentSubmissions.findIndex(
        (s) => s.assignmentId === data.assignmentId && s.studentId === data.studentId
      );
      const now = new Date().toISOString();
      if (existingIdx !== -1) {
        store.assignmentSubmissions[existingIdx] = {
          ...store.assignmentSubmissions[existingIdx],
          ...data,
          submissionDate: now,
        };
        return store.assignmentSubmissions[existingIdx];
      }
      const newSub: AssignmentSubmission = {
        id: `sub-${Date.now()}`,
        ...data,
        submissionDate: now,
      };
      store.assignmentSubmissions.push(newSub);
      return newSub;
    },
    grade: (id: string, marksObtained: number, feedback: string, graderName: string) => {
      const store = getStore();
      const sub = store.assignmentSubmissions.find((s) => s.id === id);
      if (sub) {
        sub.marksObtained = marksObtained;
        sub.feedback = feedback;
        sub.status = "EVALUATED";
        sub.gradedAt = new Date().toISOString();
        sub.gradedByName = graderName;
      }
      return sub;
    },
  },

  // PRACTICALS & SUBMISSIONS
  practicals: {
    getAll: () => getStore().practicals,
    getById: (id: string) => getStore().practicals.find((p) => p.id === id),
    getByBatchId: (batchId: string) => getStore().practicals.filter((p) => p.batchId === batchId),
    create: (data: Omit<Practical, "id" | "createdAt">) => {
      const newPractical: Practical = {
        id: `prac-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      getStore().practicals.push(newPractical);
      return newPractical;
    },
  },

  practicalSubmissions: {
    getAll: () => getStore().practicalSubmissions,
    getById: (id: string) => getStore().practicalSubmissions.find((p) => p.id === id),
    getByPracticalAndStudent: (practicalId: string, studentId: string) =>
      getStore().practicalSubmissions.find((p) => p.practicalId === practicalId && p.studentId === studentId),
    getByStudentId: (studentId: string) =>
      getStore().practicalSubmissions.filter((p) => p.studentId === studentId),
    createOrUpdate: (data: Omit<PracticalSubmission, "id" | "submissionDate">) => {
      const store = getStore();
      const existingIdx = store.practicalSubmissions.findIndex(
        (p) => p.practicalId === data.practicalId && p.studentId === data.studentId
      );
      const now = new Date().toISOString();
      if (existingIdx !== -1) {
        store.practicalSubmissions[existingIdx] = {
          ...store.practicalSubmissions[existingIdx],
          ...data,
          submissionDate: now,
        };
        return store.practicalSubmissions[existingIdx];
      }
      const newSub: PracticalSubmission = {
        id: `psub-${Date.now()}`,
        ...data,
        submissionDate: now,
      };
      store.practicalSubmissions.push(newSub);
      return newSub;
    },
    grade: (
      id: string,
      score: number,
      criterionScores: Record<string, number>,
      feedback: string,
      graderName: string
    ) => {
      const store = getStore();
      const sub = store.practicalSubmissions.find((p) => p.id === id);
      if (sub) {
        sub.score = score;
        sub.criterionScores = criterionScores;
        sub.feedback = feedback;
        sub.status = "EVALUATED";
        sub.gradedAt = new Date().toISOString();
        sub.gradedByName = graderName;
      }
      return sub;
    },
  },

  // ASSESSMENTS & ATTEMPTS
  assessments: {
    getAll: () => getStore().assessments,
    getById: (id: string) => getStore().assessments.find((a) => a.id === id),
    getByBatchId: (batchId: string) => getStore().assessments.filter((a) => a.batchId === batchId),
    create: (data: Omit<Assessment, "id" | "createdAt">) => {
      const newAssessment: Assessment = {
        id: `asm-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      getStore().assessments.push(newAssessment);
      return newAssessment;
    },
  },

  assessmentAttempts: {
    getAll: () => getStore().assessmentAttempts,
    getByAssessmentAndStudent: (assessmentId: string, studentId: string) =>
      getStore().assessmentAttempts.find((a) => a.assessmentId === assessmentId && a.studentId === studentId),
    getByStudentId: (studentId: string) =>
      getStore().assessmentAttempts.filter((a) => a.studentId === studentId),
    submitAttempt: (
      assessmentId: string,
      studentId: string,
      studentName: string,
      answers: { questionId: string; selectedOptionIndex: number }[]
    ) => {
      const store = getStore();
      const assessment = store.assessments.find((a) => a.id === assessmentId);
      if (!assessment || !assessment.questions) {
        throw new Error("Assessment not found or has no questions");
      }

      let score = 0;
      const evaluatedAnswers = answers.map((ans) => {
        const q = assessment.questions?.find((quest) => quest.id === ans.questionId);
        const isCorrect = q ? q.correctOptionIndex === ans.selectedOptionIndex : false;
        if (isCorrect && q) {
          score += q.marks;
        }
        return {
          questionId: ans.questionId,
          selectedOptionIndex: ans.selectedOptionIndex,
          isCorrect,
        };
      });

      const percentage = (score / assessment.totalMarks) * 100;
      const passed = score >= assessment.passingMarks;

      const attempt: AssessmentAttempt = {
        id: `attm-${Date.now()}`,
        assessmentId,
        assessmentTitle: assessment.title,
        studentId,
        studentName,
        startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        submitTime: new Date().toISOString(),
        score,
        totalMarks: assessment.totalMarks,
        percentage,
        passed,
        answers: evaluatedAnswers,
        status: "SUBMITTED",
      };

      store.assessmentAttempts.push(attempt);
      return attempt;
    },
  },

  // RESULTS
  results: {
    getAll: () => getStore().results,
    getByStudentId: (studentId: string) => getStore().results.find((r) => r.studentId === studentId),
    getByCourseAndBatch: (courseId: string, batchId: string) =>
      getStore().results.filter((r) => r.courseId === courseId && r.batchId === batchId),
  },

  // CERTIFICATES & ELIGIBILITY
  certificates: {
    getAll: () => getStore().certificates,
    getById: (id: string) => getStore().certificates.find((c) => c.id === id),
    getByCertificateId: (certificateId: string) =>
      getStore().certificates.find((c) => c.certificateId.toUpperCase() === certificateId.toUpperCase()),
    getByStudentId: (studentId: string) => getStore().certificates.find((c) => c.studentId === studentId),

    // Dynamic Eligibility Check Calculation
    checkEligibility: (studentId: string): CertificateEligibility => {
      const store = getStore();
      const enrollment = store.enrollments.find((e) => e.studentId === studentId);
      const student = store.students.find((s) => s.id === studentId);
      const attendancePct = db.attendance.calculateStudentAttendanceRate(studentId);
      const assignmentSubs = store.assignmentSubmissions.filter((s) => s.studentId === studentId && s.status === "EVALUATED");
      const practicalSubs = store.practicalSubmissions.filter((p) => p.studentId === studentId && p.status === "EVALUATED");
      const passedAttempts = store.assessmentAttempts.filter((a) => a.studentId === studentId && a.passed);
      const existingCert = store.certificates.find((c) => c.studentId === studentId);

      const requirements = [
        {
          id: "req-1",
          title: "Minimum Attendance Requirement (75%)",
          description: "Student has maintained regular active attendance during classroom and laboratory sessions.",
          isMet: attendancePct >= 75,
          currentValue: `${attendancePct}%`,
          targetValue: "75%",
        },
        {
          id: "req-2",
          title: "Course Modules Completion (>= 75%)",
          description: "Core syllabus theory and practical modules have been thoroughly covered.",
          isMet: (enrollment?.progressPercentage || 0) >= 75,
          currentValue: `${enrollment?.progressPercentage || 0}%`,
          targetValue: "75%",
        },
        {
          id: "req-3",
          title: "Practical Training & Submissions",
          description: "Hands-on workshop practicals have been executed, submitted and graded.",
          isMet: practicalSubs.length >= 1,
          currentValue: `${practicalSubs.length} completed`,
          targetValue: "1 required",
        },
        {
          id: "req-4",
          title: "Continuous Assignments Submission",
          description: "Theory and CAD modeling assignments have been submitted and evaluated.",
          isMet: assignmentSubs.length >= 1,
          currentValue: `${assignmentSubs.length} completed`,
          targetValue: "1 required",
        },
        {
          id: "req-5",
          title: "Online Assessment Passing Score",
          description: "Achieved passing score in the final course theory & technical assessment.",
          isMet: passedAttempts.length >= 1,
          currentValue: passedAttempts.length > 0 ? `${passedAttempts[0].score}/${passedAttempts[0].totalMarks}` : "Pending",
          targetValue: "10/20 Marks",
        },
      ];

      const allMet = requirements.every((r) => r.isMet);
      const metCount = requirements.filter((r) => r.isMet).length;
      const overallPercentage = Math.round((metCount / requirements.length) * 100);

      let status: CertificateStatus = "NOT_ELIGIBLE";
      if (existingCert) {
        status = existingCert.status;
      } else if (allMet) {
        status = "ELIGIBLE";
      }

      return {
        isEligible: allMet,
        overallPercentage,
        status,
        requirements,
      };
    },

    recommendForCertification: (studentId: string, instructorName: string) => {
      const store = getStore();
      const cert = store.certificates.find((c) => c.studentId === studentId);
      if (cert) {
        cert.status = "INSTRUCTOR_APPROVED";
        cert.instructorApprovedAt = new Date().toISOString();
        cert.instructorName = instructorName;
        return cert;
      }
      return null;
    },

    approveAndIssueCertificate: (
      studentId: string,
      courseId: string,
      batchId: string,
      signatoryName: string
    ) => {
      const store = getStore();
      const student = store.students.find((s) => s.id === studentId);
      const course = store.courses.find((c) => c.id === courseId);
      const batch = store.batches.find((b) => b.id === batchId);

      if (!student || !course || !batch) {
        throw new Error("Student, Course or Batch details missing");
      }

      const existing = store.certificates.find((c) => c.studentId === studentId && c.courseId === courseId);
      if (existing) {
        existing.status = "ISSUED";
        existing.adminApprovedAt = new Date().toISOString();
        existing.issueDate = new Date().toISOString().split("T")[0];
        return existing;
      }

      // Generate institutional Certificate ID: e.g. KISS-VT-2026-000422
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const certificateId = `KISS-VT-2026-${randomNum}`;

      const newCert: Certificate = {
        id: `cert-${Date.now()}`,
        certificateId,
        studentId,
        studentName: student.fullName,
        studentCode: student.studentId,
        courseId,
        courseName: course.title,
        courseCode: course.code,
        batchId,
        batchCode: batch.code,
        duration: course.duration,
        completionDate: new Date().toISOString().split("T")[0],
        issueDate: new Date().toISOString().split("T")[0],
        verificationUrl: `http://localhost:3000/verify/${certificateId}`,
        status: "ISSUED",
        instructorApprovedAt: new Date().toISOString(),
        adminApprovedAt: new Date().toISOString(),
        signatoryName: signatoryName || "Prof. S. Samanta, Director",
        instructorName: course.instructorName || "Senior Instructor",
        createdAt: new Date().toISOString(),
      };

      store.certificates.push(newCert);
      return newCert;
    },

    revokeCertificate: (certificateId: string, reason: string) => {
      const store = getStore();
      const cert = store.certificates.find(
        (c) => c.certificateId.toUpperCase() === certificateId.toUpperCase()
      );
      if (cert) {
        cert.status = "REVOKED";
        cert.revokedAt = new Date().toISOString();
        cert.revocationReason = reason;
      }
      return cert;
    },
  },

  // ANNOUNCEMENTS
  announcements: {
    getAll: () => getStore().announcements,
    getByAudience: (role: UserRole) => {
      const store = getStore();
      return store.announcements.filter((a) => {
        if (a.audience === "ALL") return true;
        if (role === "STUDENT" && (a.audience === "STUDENTS" || a.audience === "BATCH" || a.audience === "COURSE"))
          return true;
        if (role === "INSTRUCTOR" && a.audience === "INSTRUCTORS") return true;
        if (role === "ADMIN") return true;
        return false;
      });
    },
    create: (data: Omit<Announcement, "id" | "createdAt">) => {
      const newAnn: Announcement = {
        id: `ann-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      getStore().announcements.unshift(newAnn);
      return newAnn;
    },
  },

  // NOTIFICATIONS
  notifications: {
    getByUserId: (userId: string) =>
      getStore().notifications.filter((n) => n.userId === userId).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    markAsRead: (id: string) => {
      const store = getStore();
      const notif = store.notifications.find((n) => n.id === id);
      if (notif) notif.isRead = true;
      return notif;
    },
    markAllAsRead: (userId: string) => {
      const store = getStore();
      store.notifications.forEach((n) => {
        if (n.userId === userId) n.isRead = true;
      });
      return true;
    },
  },

  // AUDIT LOGS
  auditLogs: {
    getAll: () => getStore().auditLogs.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    log: (data: Omit<AuditLog, "id" | "timestamp">) => {
      const newLog: AuditLog = {
        id: `log-${Date.now()}`,
        ...data,
        timestamp: new Date().toISOString(),
      };
      getStore().auditLogs.unshift(newLog);
      return newLog;
    },
  },

  // SYSTEM SETTINGS
  settings: {
    getAll: () => getStore().systemSettings,
    getByKey: (key: string) => getStore().systemSettings.find((s) => s.key === key)?.value,
    update: (key: string, value: string) => {
      const store = getStore();
      const setting = store.systemSettings.find((s) => s.key === key);
      if (setting) {
        setting.value = value;
        setting.updatedAt = new Date().toISOString();
      }
      return setting;
    },
  },
};
