"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { initialUsers, initialAdmins } from "@/lib/db/mock-data";

export default function AdminDashboardPage() {
  const user = initialUsers[2];
  const admin = initialAdmins[0];

  // Data for "Students by Course" bar chart matching screenshot
  const courseData = [
    { name: "3D Printing", students: 48 },
    { name: "Web Dev", students: 65 },
    { name: "Electrical", students: 52 },
    { name: "Automobile", students: 38 },
    { name: "CNC", students: 25 },
    { name: "Others", students: 42 },
  ];

  // Data for "Attendance Trend" area chart matching screenshot
  const attendanceTrendData = [
    { month: "Jan", attendance: 78 },
    { month: "Feb", attendance: 82 },
    { month: "Mar", attendance: 80 },
    { month: "Apr", attendance: 85 },
    { month: "May", attendance: 83 },
    { month: "Jun", attendance: 88 },
    { month: "Jul", attendance: 84 },
    { month: "Aug", attendance: 89 },
    { month: "Sep", attendance: 87 },
  ];

  return (
    <AppShell
      user={user}
      profileName={admin.fullName}
      profileIdentifier="Admin Officer"
      avatarUrl={admin.avatarUrl}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Overview of your vocational training programs, attendance metrics and institutional credentials
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shrink-0">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>01 Jan 2026 – 31 Dec 2026</span>
          </div>
        </div>

        {/* 6 Top Stats Cards matching Screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Students
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold text-slate-900">245</span>
              <span className="text-[10px] font-bold text-emerald-700">+12%</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Courses
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold text-slate-900">12</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Instructors
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold text-slate-900">8</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Batches
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold text-slate-900">18</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Completion Rate
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold text-emerald-700">88%</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Certificates Issued
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold text-amber-600">156</span>
              <span className="text-[10px] font-bold text-emerald-700">+84</span>
            </div>
          </div>
        </div>

        {/* 2 Analytics Charts matching Reference Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Students by Course Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-slate-900">Students by Course</h3>
              <span className="text-xs text-slate-400 font-semibold uppercase">Cohort 2026</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a261a",
                      color: "#fff",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="students" fill="#0b4f34" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Attendance Trends Area Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-slate-900">Attendance Trend</h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Avg: 87%
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrendData}>
                  <defs>
                    <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a261a",
                      color: "#fff",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="#0b4f34"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#attendanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
