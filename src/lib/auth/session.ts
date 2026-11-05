import { cookies } from "next/headers";
import { User, StudentProfile, InstructorProfile, AdminProfile, UserRole } from "@/types";
import { db } from "../db/db-store";

const SESSION_COOKIE = "kiss_vtms_session";

export interface SessionData {
  user: User;
  student?: StudentProfile;
  instructor?: InstructorProfile;
  admin?: AdminProfile;
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
    if (!sessionCookie) return null;

    const parsed = JSON.parse(sessionCookie);
    const user = db.users.getById(parsed.userId);
    if (!user) return null;

    const student = user.role === "STUDENT" ? db.students.getByUserId(user.id) : undefined;
    const instructor = user.role === "INSTRUCTOR" ? db.instructors.getByUserId(user.id) : undefined;
    const admin = user.role === "ADMIN" ? db.admins.getAll().find((a) => a.userId === user.id) : undefined;

    return {
      user,
      student,
      instructor,
      admin,
    };
  } catch (error) {
    return null;
  }
}

export async function setSessionCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify({ userId }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth(allowedRoles?: UserRole[]) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    throw new Error("Forbidden");
  }
  return session;
}
