export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type CourseStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type ModuleStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type BatchStatus = "UPCOMING" | "ACTIVE" | "COMPLETED" | "CANCELLED";

export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "DROPPED" | "SUSPENDED";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export type SubmissionStatus = "PENDING" | "SUBMITTED" | "LATE" | "EVALUATED";

export type AssessmentType = "THEORY" | "PRACTICAL" | "PROJECT" | "ONLINE" | "OFFLINE";

export type AssessmentStatus = "DRAFT" | "UPCOMING" | "ACTIVE" | "COMPLETED";

export type AttemptStatus = "IN_PROGRESS" | "SUBMITTED" | "TIMED_OUT";

export type ResultStatus = "PASSED" | "FAILED" | "WITHHELD";

export type CertificateStatus =
  | "NOT_ELIGIBLE"
  | "ELIGIBLE"
  | "INSTRUCTOR_REVIEW"
  | "INSTRUCTOR_APPROVED"
  | "ADMIN_REVIEW"
  | "APPROVED"
  | "ISSUED"
  | "REVOKED";

export type Priority = "NORMAL" | "IMPORTANT" | "URGENT";

export type Audience = "ALL" | "STUDENTS" | "INSTRUCTORS" | "COURSE" | "BATCH";

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studentId: string; // e.g. KISS-ST-2026-001
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstructorProfile {
  id: string;
  userId: string;
  instructorId: string; // e.g. KISS-INS-001
  fullName: string;
  designation: string;
  department: string;
  qualification?: string; // e.g. "M.Tech in Mechanical Engineering, B.Tech"
  specialization?: string;
  bio?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProfile {
  id: string;
  userId: string;
  fullName: string;
  department: string;
  email?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Course {
  id: string;
  title: string;
  code: string; // e.g. VT-3D
  categoryId: string;
  categoryName?: string;
  description: string;
  duration: string;
  skillLevel: SkillLevel;
  practicalFocus: string;
  hasCertificate: boolean;
  status: CourseStatus;
  instructorId?: string;
  instructorName?: string;
  instructorDesignation?: string;
  instructorAvatar?: string;
  thumbnail: string;
  overviewVideo?: string;
  modules?: Module[];
  batchesCount?: number;
  enrolledStudentsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description?: string;
  learningObjectives?: string[];
  durationHours: number;
  status: ModuleStatus;
  resources?: { title: string; url: string; type: "pdf" | "video" | "doc" | "link" }[];
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  id: string;
  name: string;
  code: string; // e.g. VT-3D-2026-04
  courseId: string;
  courseTitle?: string;
  courseCode?: string;
  instructorId?: string;
  instructorName?: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  enrolledCount?: number;
  location: string;
  status: BatchStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName?: string;
  studentCode?: string;
  studentAvatar?: string;
  courseId: string;
  courseTitle?: string;
  courseCode?: string;
  batchId: string;
  batchName?: string;
  batchCode?: string;
  instructorName?: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  progressPercentage: number;
  grade?: string;
  finalScore?: number;
  completionDate?: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  date: string;
  sessionNumber: number;
  courseId: string;
  batchId: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  batchId: string;
  batchCode?: string;
  instructorId: string;
  date: string;
  sessionNumber: number;
  topic?: string;
  room: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
}

export interface TimetableEntry {
  id: string;
  batchId: string;
  batchCode: string;
  courseId: string;
  courseTitle: string;
  moduleId?: string;
  moduleTitle?: string;
  instructorId: string;
  instructorName: string;
  dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  startTime: string; // e.g. "09:30 AM"
  endTime: string;   // e.g. "11:00 AM"
  room: string;
  topic: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseTitle?: string;
  moduleId?: string;
  moduleTitle?: string;
  batchId: string;
  batchCode?: string;
  instructorId: string;
  instructorName?: string;
  deadline: string;
  maxMarks: number;
  attachmentUrl?: string;
  instructions?: string;
  status: "PUBLISHED" | "DRAFT";
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle?: string;
  studentId: string;
  studentName?: string;
  studentCode?: string;
  submissionDate: string;
  files: { name: string; url: string; size: string; type: string }[];
  comments?: string;
  status: SubmissionStatus;
  marksObtained?: number;
  maxMarks?: number;
  feedback?: string;
  gradedAt?: string;
  gradedByName?: string;
}

export interface PracticalRubricCriterion {
  id: string;
  name: string;
  maxScore: number;
  score?: number;
  description?: string;
}

export interface Practical {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseTitle?: string;
  moduleId?: string;
  moduleTitle?: string;
  batchId: string;
  batchCode?: string;
  instructorId: string;
  instructorName?: string;
  deadline: string;
  maxMarks: number;
  toolsRequired: string[];
  instructions: string[];
  rubricCriteria: PracticalRubricCriterion[];
  createdAt: string;
}

export interface PracticalSubmission {
  id: string;
  practicalId: string;
  practicalTitle?: string;
  studentId: string;
  studentName?: string;
  studentCode?: string;
  submissionDate: string;
  files: { name: string; url: string; size: string; type: string }[];
  comments?: string;
  status: SubmissionStatus;
  score?: number;
  maxMarks?: number;
  criterionScores?: Record<string, number>;
  feedback?: string;
  gradedAt?: string;
  gradedByName?: string;
}

export interface Question {
  id: string;
  assessmentId: string;
  order: number;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  marks: number;
}

export interface Assessment {
  id: string;
  title: string;
  type: AssessmentType;
  courseId: string;
  courseTitle?: string;
  moduleId?: string;
  moduleTitle?: string;
  batchId: string;
  batchCode?: string;
  instructorId: string;
  instructorName?: string;
  scheduledDate: string;
  startTime: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  maxAttempts: number;
  instructions?: string;
  status: AssessmentStatus;
  questions?: Question[];
  createdAt: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  assessmentTitle?: string;
  studentId: string;
  studentName?: string;
  studentCode?: string;
  startTime: string;
  submitTime?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  answers: { questionId: string; selectedOptionIndex: number; isCorrect: boolean }[];
  status: AttemptStatus;
}

export interface Result {
  id: string;
  studentId: string;
  studentName?: string;
  studentCode?: string;
  courseId: string;
  courseTitle?: string;
  courseCode?: string;
  batchId: string;
  batchCode?: string;
  theoryScore: number;
  maxTheory: number;
  practicalScore: number;
  maxPractical: number;
  projectScore: number;
  maxProject: number;
  attendanceScore: number;
  maxAttendance: number;
  totalScore: number;
  maxTotal: number;
  percentage: number;
  grade: string;
  status: ResultStatus;
  computedAt: string;
}

export interface Certificate {
  id: string;
  certificateId: string; // e.g. KISS-VT-2026-000421
  studentId: string;
  studentName: string;
  studentCode?: string;
  courseId: string;
  courseName: string;
  courseCode?: string;
  batchId: string;
  batchCode?: string;
  duration: string;
  completionDate: string;
  issueDate: string;
  qrCodeUrl?: string;
  verificationUrl: string;
  pdfUrl?: string;
  status: CertificateStatus;
  instructorApprovedAt?: string;
  adminApprovedAt?: string;
  revokedAt?: string;
  revocationReason?: string;
  signatoryName: string;
  instructorName: string;
  createdAt: string;
}

export interface CertificateEligibility {
  isEligible: boolean;
  overallPercentage: number;
  status: CertificateStatus;
  requirements: {
    id: string;
    title: string;
    description: string;
    isMet: boolean;
    currentValue?: string | number;
    targetValue?: string | number;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  audience: Audience;
  priority: Priority;
  courseId?: string;
  batchId?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ALERT";
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
  updatedAt: string;
}
