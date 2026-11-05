"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/Navbar";
import { initialCourses, initialCategories } from "@/lib/db/mock-data";
import { Clock, Award, BookOpen, ArrowRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";

export default function CoursesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = initialCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (() => {
        const cat = initialCategories.find((c) => c.slug === selectedCategory);
        return cat ? course.categoryId === cat.id : true;
      })();

    const matchesSearch =
      searchQuery.trim() === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.categoryName && course.categoryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>20 Vocational Training Electives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-institutional-900">
            Vocational Programs & Electives
          </h1>
          <p className="text-sm text-slate-600">
            Industry-calibrated courses with hands-on laboratory practicals, mentorship from
            certified technical instructors, and verifiable digital certificates.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search electives (e.g. Electrical, Welding, Solar, Python)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-[#0b4f34] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Electives ({initialCourses.length})
          </button>
          {initialCategories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.slug
                  ? "bg-[#0b4f34] text-white shadow-sm font-semibold"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className="text-[10px] opacity-70 font-mono font-bold">{idx + 1}.</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Electives Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <CourseThumbnail
                    src={course.thumbnail}
                    alt={course.title}
                    code={course.code}
                    categoryName={course.categoryName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-institutional-900 font-bold text-xs px-2.5 py-1 rounded-md shadow-sm">
                    {course.code}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#0b4f34]/95 backdrop-blur text-white font-medium text-[10px] px-2 py-0.5 rounded shadow-sm">
                    {course.categoryName}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      {course.skillLevel}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3">{course.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1 truncate max-w-[140px]">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Cert. Included</span>
                </span>
                <Link
                  href={`/courses/${course.id}`}
                  className="px-3.5 py-1.5 bg-[#0b4f34] hover:bg-[#063d27] text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

