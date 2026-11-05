"use server";

import { db } from "@/lib/db/db-store";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserRole } from "@/types";

export async function loginAction(formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as UserRole;

  if (!identifier) {
    return { success: false, error: "Please enter your email or Student/Instructor ID" };
  }

  // Find user by email or username
  let user = db.users.getByEmail(identifier);

  // If not found by direct email, check if it's a student ID or instructor ID
  if (!user) {
    const student = db.students.getByStudentId(identifier);
    if (student) {
      user = db.users.getById(student.userId);
    }
  }

  if (!user) {
    // If demo mode or test user, allow matching based on selected role
    if (role === "STUDENT") {
      user = db.users.getById("user-student-1");
    } else if (role === "INSTRUCTOR") {
      user = db.users.getById("user-instructor-1");
    } else if (role === "ADMIN") {
      user = db.users.getById("user-admin-1");
    }
  }

  if (!user) {
    return { success: false, error: "Invalid credentials. Please check your details." };
  }

  // Set session cookie
  await setSessionCookie(user.id);

  // Log action
  db.auditLogs.log({
    actorId: user.id,
    actorName: user.username,
    actorRole: user.role,
    action: "USER_LOGIN",
    entity: "User",
    entityId: user.id,
  });

  revalidatePath("/");

  let redirectUrl = "/student";
  if (user.role === "INSTRUCTOR") redirectUrl = "/instructor";
  if (user.role === "ADMIN") redirectUrl = "/admin";

  return { success: true, redirectUrl };
}

export async function demoLoginAction(role: UserRole) {
  let userId = "user-student-1";
  let redirectUrl = "/student";

  if (role === "INSTRUCTOR") {
    userId = "user-instructor-1";
    redirectUrl = "/instructor";
  } else if (role === "ADMIN") {
    userId = "user-admin-1";
    redirectUrl = "/admin";
  }

  await setSessionCookie(userId);
  revalidatePath("/");
  return { success: true, redirectUrl };
}

export async function registerStudentAction(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const gender = formData.get("gender") as string;
  const courseId = formData.get("courseId") as string;

  if (!fullName || !email) {
    return { success: false, error: "Name and email are required" };
  }

  // Check Single-Trade Specialization Policy (BR-10) for existing accounts
  const existingUser = db.users.getByEmail(email);
  if (existingUser) {
    const existingStudent = db.students.getByUserId(existingUser.id);
    if (existingStudent) {
      const { canEnroll, activeEnrollment } = db.enrollments.canStudentEnroll(existingStudent.id);
      if (!canEnroll && activeEnrollment) {
        return {
          success: false,
          error: `Single-Trade Specialization Policy: You are already actively participating in "${activeEnrollment.courseTitle || activeEnrollment.courseCode}". Under KISS regulations, students can participate in only one course at a time.`,
        };
      }
    }
  }

  // Create User
  const user = db.users.create({
    email,
    username: email.split("@")[0],
    role: "STUDENT",
    phone,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
  });

  // Generate student ID: KISS-ST-2026-XXX
  const randomNum = Math.floor(100 + Math.random() * 900);
  const studentId = `KISS-ST-2026-${randomNum}`;

  const student = db.students.create({
    userId: user.id,
    studentId,
    fullName,
    email,
    phone,
    gender,
    address: "KISS Campus, Bhubaneswar, Odisha",
    avatarUrl: user.avatarUrl,
  });

  // Auto-enroll into selected course & active batch if provided
  const targetCourseId = courseId || "course-1";
  const batch = db.batches.getByCourseId(targetCourseId)[0] || db.batches.getAll()[0];

  if (batch) {
    try {
      db.enrollments.create({
        studentId: student.id,
        studentName: student.fullName,
        studentCode: student.studentId,
        studentAvatar: student.avatarUrl,
        courseId: batch.courseId,
        courseTitle: batch.courseTitle,
        courseCode: batch.courseCode,
        batchId: batch.id,
        batchName: batch.name,
        batchCode: batch.code,
        instructorName: batch.instructorName,
        status: "ACTIVE",
        enrolledAt: new Date().toISOString().split("T")[0],
        progressPercentage: 0,
      });
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  await setSessionCookie(user.id);
  revalidatePath("/");

  return { success: true, redirectUrl: "/student" };
}

export async function logoutAction() {
  await clearSessionCookie();
  revalidatePath("/");
  redirect("/login");
}
