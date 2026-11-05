import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { GraduationCap, Mail, Phone, BookOpen, Layers } from "lucide-react";

export default async function AdminInstructorsPage() {
  const session = await getSession();
  const admin = session?.admin || db.admins.getAll()[0];
  const user = session?.user || db.users.getById(admin.userId)!;

  const instructors = db.instructors.getAll();

  return (
    <AppShell
      user={user}
      profileName={admin.fullName}
      profileIdentifier="Admin Officer"
      avatarUrl={admin.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Instructor Faculty Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage certified vocational master trainers, technical specialists and faculty allocations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructors.map((ins) => (
            <div
              key={ins.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ins.avatarUrl}
                    alt={ins.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600 shadow-xs"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900">{ins.fullName}</h3>
                    <p className="text-xs text-slate-500">{ins.designation}</p>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1 inline-block">
                      {ins.instructorId}
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1 pt-2 border-t border-slate-100">
                  <p className="text-slate-500">
                    <strong className="text-slate-700">Department:</strong> {ins.department}
                  </p>
                  <p className="text-slate-500">
                    <strong className="text-slate-700">Specialization:</strong> {ins.specialization}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 italic">&ldquo;{ins.bio}&rdquo;</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ins.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ins.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
