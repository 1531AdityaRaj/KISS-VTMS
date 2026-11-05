"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Settings, Save, CheckCircle2, Sliders, Shield, Award } from "lucide-react";
import { initialUsers, initialAdmins, initialSystemSettings } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";

export default function AdminSettingsPage() {
  const user = initialUsers[2];
  const admin = initialAdmins[0];

  const [institutionName, setInstitutionName] = useState(
    db.settings.getByKey("institution_name") || "Kalinga Institute of Social Sciences (KISS)"
  );
  const [certPrefix, setCertPrefix] = useState(db.settings.getByKey("certificate_prefix") || "KISS-VT");
  const [minAttendance, setMinAttendance] = useState(
    db.settings.getByKey("min_attendance_threshold") || "75"
  );
  const [passingPct, setPassingPct] = useState(
    db.settings.getByKey("min_passing_percentage") || "50"
  );
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    db.settings.update("institution_name", institutionName);
    db.settings.update("certificate_prefix", certPrefix);
    db.settings.update("min_attendance_threshold", minAttendance);
    db.settings.update("min_passing_percentage", passingPct);

    db.auditLogs.log({
      actorId: user.id,
      actorName: admin.fullName,
      actorRole: "ADMIN",
      action: "UPDATE_SYSTEM_SETTINGS",
      entity: "SystemSetting",
      metadata: { institutionName, certPrefix, minAttendance },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

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
            <h1 className="text-2xl font-serif font-bold text-slate-900">System Settings</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Configure institutional parameters, grading boundaries and digital certification rules
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved and applied across system services!</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 max-w-3xl">
          <div className="space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              Institutional Identity
            </h3>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Institution Display Name
              </label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Certificate ID Number Prefix
              </label>
              <input
                type="text"
                value={certPrefix}
                onChange={(e) => setCertPrefix(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase"
              />
            </div>

            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2 pt-4">
              Academic & Certification Rules
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Minimum Attendance Threshold (%)
                </label>
                <input
                  type="number"
                  value={minAttendance}
                  onChange={(e) => setMinAttendance(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Passing Score Threshold (%)
                </label>
                <input
                  type="number"
                  value={passingPct}
                  onChange={(e) => setPassingPct(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-800"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowRegistration}
                  onChange={(e) => setAllowRegistration(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-800"
                />
                <span className="font-semibold text-slate-700">
                  Allow Student Self-Registration from Public Website
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
