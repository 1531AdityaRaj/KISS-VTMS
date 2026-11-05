import React from "react";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { InstructorProfileClient } from "./InstructorProfileClient";

export default async function InstructorProfilePage() {
  const session = await getSession();
  const instructor = session?.instructor || db.instructors.getById("ins-1")!;
  const user = session?.user || db.users.getById(instructor.userId)!;

  return (
    <InstructorProfileClient
      initialInstructor={instructor}
      user={user}
    />
  );
}
