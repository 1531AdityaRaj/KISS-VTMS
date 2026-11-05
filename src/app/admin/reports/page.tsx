"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  BarChart3,
  Download,
  FileText,
  CalendarCheck,
  Award,
  Users,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { initialUsers, initialAdmins, initialCourses } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";

export default function AdminReportsPage() {
  const user = initialUsers[2];
  const admin = initialAdmins[0];

  const [reportType, setReportType] = useState<"students" | "attendance" | "results" | "certificates">("students");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const students = db.students.getAll();
  const certificates = db.certificates.getAll();

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    if (reportType === "students") {
      csvContent += "Student ID,Full Name,Email,Phone,Gender,Address\n";
      students.forEach((s) => {
        csvContent += `"${s.studentId}","${s.fullName}","${s.email || ""}","${s.phone || ""}","${s.gender || ""}","${s.address || ""}"\n`;
      });
    } else if (reportType === "certificates") {
      csvContent += "Certificate ID,Student Name,Course,Issue Date,Status\n";
      certificates.forEach((c) => {
        csvContent += `"${c.certificateId}","${c.studentName}","${c.courseName}","${c.issueDate}","${c.status}"\n`;
      });
    } else {
      csvContent += "Student ID,Name,Course,Metric,Value\n";
      students.forEach((s) => {
        const att = db.attendance.calculateStudentAttendanceRate(s.id);
        csvContent += `"${s.studentId}","${s.fullName}","3D Printing & CAD","Attendance","${att}%"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KISS_VTMS_${reportType}_report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
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
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Institutional Reports & Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Generate official accreditation reports, export student rosters and audit metrics
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-2 transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Dataset</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Report exported successfully!</span>
          </div>
        )}

        {/* Report Types Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "students", title: "Student Roster", desc: "Cohort enrollments & profiles", icon: Users },
            { id: "attendance", title: "Attendance Report", desc: "Session percentages & logs", icon: CalendarCheck },
            { id: "results", title: "Academic Results", desc: "Weighted evaluation scores", icon: BarChart3 },
            { id: "certificates", title: "Certificate Registry", desc: "Issued & verified credentials", icon: Award },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = reportType === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setReportType(item.id as any)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-emerald-50/70 border-emerald-600 shadow-sm"
                    : "bg-white hover:bg-slate-50 border-slate-200"
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-emerald-700" : "text-slate-400"}`} />
                <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Report Data Preview Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900 capitalize">
              {reportType} Preview Table
            </h3>
            <span className="text-xs text-slate-400 font-mono">Live In-Memory Database</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Identifier</th>
                  <th className="py-3 px-4">Name / Title</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Metric</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st, idx) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{st.studentId}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{st.fullName}</td>
                    <td className="py-3.5 px-4 text-slate-600">3D Printing & CAD</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-800">
                      Attendance: {db.attendance.calculateStudentAttendanceRate(st.id)}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
