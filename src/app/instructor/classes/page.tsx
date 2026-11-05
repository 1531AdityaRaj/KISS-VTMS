import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { Layers, CalendarCheck, Users, Clock, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function InstructorClassesPage() {
  const session = await getSession();
  const instructor = session?.instructor || db.instructors.getById("ins-1")!;
  const user = session?.user || db.users.getById(instructor.userId)!;

  const batches = db.batches.getByInstructorId(instructor.id);
  const timetable = db.timetable.getAll();

  return (
    <AppShell
      user={user}
      profileName={instructor.fullName}
      profileIdentifier={instructor.instructorId}
      avatarUrl={instructor.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              My Classes & Timetable
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Weekly lab schedule, session locations and cohort management
            </p>
          </div>
        </div>

        {/* Assigned Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batches.map((b) => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    {b.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">{b.status}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">{b.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{b.location}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  {b.enrolledCount || 24} Enrolled Students
                </span>
                <Link
                  href="/instructor/attendance"
                  className="px-3.5 py-1.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1 transition-all"
                >
                  <span>Mark Attendance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Timetable Grid */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900">Weekly Lab Schedule</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timetable.map((tt) => (
              <div
                key={tt.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">{tt.dayOfWeek}</span>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border text-slate-600 font-semibold">
                    {tt.room}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500 font-bold">
                  {tt.startTime} – {tt.endTime}
                </p>
                <p className="text-xs font-bold text-slate-900">{tt.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
