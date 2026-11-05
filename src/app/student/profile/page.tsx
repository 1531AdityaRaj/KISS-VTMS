"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  BookOpen,
  Layers,
  Edit,
  Save,
  CheckCircle2,
} from "lucide-react";
import { db } from "@/lib/db/db-store";

export default function StudentProfilePage() {
  const student = db.students.getById("st-1")!;
  const user = db.users.getById(student.userId)!;
  const enrollment = db.enrollments.getActiveForStudent(student.id) || db.enrollments.getAll()[0];

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(student.phone || "+91 98765 43210");
  const [address, setAddress] = useState(student.address || "KISS Campus, Bhubaneswar, Odisha");
  const [emergencyContact, setEmergencyContact] = useState(
    student.emergencyContact || "+91 98765 43210 (Father)"
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.students.update(student.id, {
      phone,
      address,
      emergencyContact,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">My Profile</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your verified student personal and contact details
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition-all shrink-0"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>{isEditing ? "Cancel Editing" : "Edit Profile"}</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile details updated successfully.</span>
          </div>
        )}

        {/* Top Profile Card matching Screenshot */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-emerald-100 border-2 border-emerald-600 shadow-sm shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-serif font-bold text-slate-900">{student.fullName}</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded">
                  Student ID: {student.studentId}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {enrollment.courseTitle} • Batch: {enrollment.batchCode}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Info Form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              Personal Information
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  disabled
                  value={student.fullName}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Residential Address</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full p-2.5 rounded-xl font-medium ${
                    isEditing
                      ? "bg-white border border-slate-300 focus:ring-2 focus:ring-emerald-700 text-slate-900"
                      : "bg-slate-50 border border-slate-200 text-slate-700"
                  }`}
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Emergency Contact & Guardian
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className={`w-full p-2.5 rounded-xl font-medium ${
                    isEditing
                      ? "bg-white border border-slate-300 focus:ring-2 focus:ring-emerald-700 text-slate-900"
                      : "bg-slate-50 border border-slate-200 text-slate-700"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
              Contact & Academic Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={student.email || user.email}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-2.5 rounded-xl font-medium ${
                    isEditing
                      ? "bg-white border border-slate-300 focus:ring-2 focus:ring-emerald-700 text-slate-900"
                      : "bg-slate-50 border border-slate-200 text-slate-700"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Date of Birth</label>
                  <input
                    type="text"
                    disabled
                    value="15 March 2005"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Gender</label>
                  <input
                    type="text"
                    disabled
                    value={student.gender || "Male"}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Enrollment Date</label>
                <input
                  type="text"
                  disabled
                  value="01 July 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 cursor-not-allowed"
                />
              </div>
            </div>

            {isEditing && (
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </AppShell>
  );
}
