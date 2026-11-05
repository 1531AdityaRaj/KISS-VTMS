"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Layers, PlusCircle, Users, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { initialUsers, initialAdmins, initialBatches, initialCourses } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";
import { formatDate } from "@/lib/utils";

export default function AdminBatchesPage() {
  const user = initialUsers[2];
  const admin = initialAdmins[0];

  const [batches, setBatches] = useState(db.batches.getAll());
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [startDate, setStartDate] = useState("2026-10-01");
  const [endDate, setEndDate] = useState("2026-12-31");
  const [location, setLocation] = useState("Lab 2, KISS Campus");

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch = db.batches.create({
      name,
      code: code.toUpperCase(),
      courseId: "course-1",
      courseTitle: "3D Printing & CAD",
      courseCode: "VT-3D",
      startDate,
      endDate,
      maxStudents: 30,
      enrolledCount: 0,
      location,
      status: "UPCOMING",
    });

    setBatches([...db.batches.getAll()]);
    setShowAddModal(false);
    setToastMessage(`Batch ${code} created successfully!`);
    setTimeout(() => setToastMessage(""), 4000);
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
            <h1 className="text-2xl font-serif font-bold text-slate-900">Training Batches</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Organize student cohorts, laboratory locations, scheduled timelines and assigned instructors
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Batch</span>
          </button>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-lg">
                  {batch.code}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    batch.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {batch.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base text-slate-900">{batch.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{batch.courseTitle}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {formatDate(batch.startDate)} – {formatDate(batch.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{batch.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {batch.enrolledCount || 24} / {batch.maxStudents} Students Enrolled
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200">
              <h3 className="font-serif font-bold text-lg text-slate-900">Create Batch Cohort</h3>

              <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Batch Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. 3D Printing & CAD - Batch 05"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Batch Code *</label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. VT-3D-2026-05"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-2.5 bg-slate-100 font-semibold rounded-xl text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-institutional-800 text-white font-semibold rounded-xl shadow"
                  >
                    Create Batch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
