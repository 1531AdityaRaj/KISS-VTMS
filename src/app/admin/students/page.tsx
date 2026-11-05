"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Users,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Phone,
  Mail,
  BookOpen,
} from "lucide-react";
import { initialUsers, initialAdmins, initialStudents, initialCourses } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";

export default function AdminStudentsPage() {
  const user = initialUsers[2];
  const admin = initialAdmins[0];

  const [students, setStudents] = useState(db.students.getAll());
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const studentId = `KISS-ST-2026-${randomNum}`;

    const newStudent = db.students.create({
      userId: `user-st-${Date.now()}`,
      studentId,
      fullName,
      email,
      phone,
      gender,
      address: "KISS Campus, Bhubaneswar",
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
    });

    db.auditLogs.log({
      actorId: user.id,
      actorName: admin.fullName,
      actorRole: "ADMIN",
      action: "CREATE_STUDENT",
      entity: "Student",
      entityId: newStudent.id,
      metadata: { studentId, fullName },
    });

    setStudents([...db.students.getAll()]);
    setShowAddModal(false);
    setToastMessage(`Student ${fullName} (${studentId}) registered successfully!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove student ${name}?`)) {
      db.students.delete(id);
      db.auditLogs.log({
        actorId: user.id,
        actorName: admin.fullName,
        actorRole: "ADMIN",
        action: "DELETE_STUDENT",
        entity: "Student",
        entityId: id,
        metadata: { name },
      });
      setStudents([...db.students.getAll()]);
      setToastMessage(`Student ${name} removed.`);
      setTimeout(() => setToastMessage(""), 4000);
    }
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
            <h1 className="text-2xl font-serif font-bold text-slate-900">Student Directory</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage student enrollments, profiles and vocational cohort assignments
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, ID or email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500 font-semibold shrink-0">
            {filteredStudents.length} Students
          </span>
        </div>

        {/* Students Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Course & Batch</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => {
                  const att = db.attendance.calculateStudentAttendanceRate(st.id);

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                            {st.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{st.fullName}</p>
                            <p className="text-[11px] text-slate-400">{st.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {st.studentId}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        3D Printing & CAD <span className="text-slate-400">(VT-3D-2026-04)</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            att >= 75
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-rose-50 text-rose-800"
                          }`}
                        >
                          {att}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        <p>{st.email}</p>
                        <p className="text-[11px] text-slate-400">{st.phone}</p>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteStudent(st.id, st.fullName)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200">
              <h3 className="font-serif font-bold text-lg text-slate-900">Add Student Record</h3>

              <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Manas Swain"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manas.swain@example.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
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
                    Create Student
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
