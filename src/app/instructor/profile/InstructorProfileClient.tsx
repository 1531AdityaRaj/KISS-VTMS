"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  GraduationCap,
  Award,
  Mail,
  Phone,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Building2,
  BookOpen,
  User as UserIcon,
} from "lucide-react";
import { InstructorProfile, User } from "@/types";
import { db } from "@/lib/db/db-store";

interface InstructorProfileClientProps {
  initialInstructor: InstructorProfile;
  user: User;
}

export function InstructorProfileClient({
  initialInstructor,
  user,
}: InstructorProfileClientProps) {
  const [instructor, setInstructor] = useState<InstructorProfile>(initialInstructor);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    fullName: initialInstructor.fullName,
    qualification: initialInstructor.qualification || "M.Tech in CAD/CAM, B.Tech in Mechanical Engineering",
    designation: initialInstructor.designation,
    department: initialInstructor.department,
    specialization: initialInstructor.specialization || "",
    bio: initialInstructor.bio || "",
    email: initialInstructor.email || "",
    phone: initialInstructor.phone || "",
    avatarUrl: initialInstructor.avatarUrl || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Update in data store
      const updated = db.instructors.update(instructor.id, {
        fullName: formData.fullName,
        qualification: formData.qualification,
        designation: formData.designation,
        department: formData.department,
        specialization: formData.specialization,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        avatarUrl: formData.avatarUrl,
      });

      if (updated) {
        setInstructor(updated);
      } else {
        // Fallback update local state
        setInstructor((prev) => ({
          ...prev,
          ...formData,
        }));
      }

      setIsSaving(false);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to update instructor profile", err);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: instructor.fullName,
      qualification: instructor.qualification || "",
      designation: instructor.designation,
      department: instructor.department,
      specialization: instructor.specialization || "",
      bio: instructor.bio || "",
      email: instructor.email || "",
      phone: instructor.phone || "",
      avatarUrl: instructor.avatarUrl || "",
    });
    setIsEditing(false);
  };

  return (
    <AppShell
      user={user}
      profileName={instructor.fullName}
      profileIdentifier={instructor.instructorId}
      avatarUrl={instructor.avatarUrl}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header with Title and Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-slate-900">Faculty Profile</h1>
              <span className="text-[11px] font-bold tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                Verified Faculty
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your academic accreditation, qualifications, and department credentials
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-all hover:shadow cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-amber-300" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Cancel Editing</span>
            </button>
          )}
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2.5 shadow-sm animate-in fade-in duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile and academic qualifications updated successfully!</span>
          </div>
        )}

        {/* EDIT MODE FORM */}
        {isEditing ? (
          <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-emerald-600" />
                  Edit Faculty Details
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your contact details, designation, and formal academic qualifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                    placeholder="e.g. Rohit Kumar"
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Academic Qualification - PROMINENT REQUIREMENT */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    Academic Qualification <span className="text-rose-500">*</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Degree & Certifications</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="qualification"
                    required
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-emerald-50/40 focus:bg-white border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all font-medium text-slate-800"
                    placeholder="e.g. M.Tech in CAD/CAM, B.Tech in Mechanical Engg."
                  />
                  <GraduationCap className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Designation <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="designation"
                    required
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                    placeholder="e.g. Senior Instructor"
                  />
                  <Award className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Department <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                    placeholder="e.g. Mechanical & Manufacturing"
                  />
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                    placeholder="instructor@example.com"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                    placeholder="+91 98111 22334"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Specialization */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Technical Specialization
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                    placeholder="e.g. CAD Modeling, Additive Manufacturing & CNC"
                  />
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Avatar URL */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Biography */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Professional Biography & Teaching Statement
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:outline-none transition-all"
                  placeholder="Describe your vocational experience and technical teaching background..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Profile Changes"}</span>
              </button>
            </div>
          </form>
        ) : (
          /* VIEW MODE */
          <div className="space-y-6">
            {/* Primary Profile Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-emerald-100 border-2 border-emerald-600 shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={instructor.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
                  alt={instructor.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                    {instructor.fullName}
                  </h2>
                  <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                    {instructor.instructorId}
                  </span>
                </div>

                <p className="text-sm text-slate-600 font-medium">
                  {instructor.designation} • <span className="text-emerald-800 font-semibold">{instructor.department}</span>
                </p>

                {/* Highlighted Qualification Banner */}
                <div className="pt-2 flex items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs">
                    <GraduationCap className="w-4 h-4 text-amber-700" />
                    <span>Qualification:</span>
                    <strong className="text-slate-900 font-bold">
                      {instructor.qualification || "M.Tech in CAD/CAM, B.Tech in Mechanical Engineering"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Credentials & Qualification Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Qualification & Education Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-slate-900">
                      Educational Qualification
                    </h3>
                    <p className="text-[11px] text-slate-500">Academic degrees & accredited certifications</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Highest Qualification
                  </span>
                  <p className="text-sm font-bold text-emerald-900 mt-0.5 leading-snug">
                    {instructor.qualification || "M.Tech in CAD/CAM, B.Tech in Mechanical Engineering"}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Technical Specialization
                  </span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    {instructor.specialization || "CAD Modeling, Additive Manufacturing & CNC"}
                  </p>
                </div>
              </div>

              {/* Contact & Department Information Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="p-2 rounded-xl bg-institutional-50 text-institutional-800">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-slate-900">
                      Institutional Department
                    </h3>
                    <p className="text-[11px] text-slate-500">Official KISS contact & appointment records</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Email Address
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5 truncate">{instructor.email}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Phone Number
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">{instructor.phone || "+91 98111 22334"}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Campus Location & Lab
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    Vocational Training Complex, Workshop Lab-3, KISS Campus, Bhubaneswar
                  </p>
                </div>
              </div>
            </div>

            {/* Teaching Biography Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Teaching Statement & Industry Experience
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {instructor.bio || "Over 8 years of hands-on industrial training experience empowering youth through cutting-edge rapid prototyping, CAD/CAM design, and advanced CNC machining."}
              </p>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
