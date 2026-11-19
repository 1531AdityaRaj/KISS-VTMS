"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Award,
  Users,
  ShieldCheck,
  ShieldAlert,
  Settings,
  BarChart3,
  Wrench,
  Layers,
  ArrowRight,
  Sparkles,
  X,
  GraduationCap,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Portals" | "Academic Modules" | "Enterprise Governance";
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  // Portals
  { id: "p-student", title: "Student Lifecycle Portal", category: "Portals", href: "/student", icon: LayoutDashboard, badge: "Student" },
  { id: "p-instructor", title: "Instructor Grading & Attendance Portal", category: "Portals", href: "/instructor", icon: GraduationCap, badge: "Faculty" },
  { id: "p-admin", title: "Institutional Admin Console", category: "Portals", href: "/admin", icon: Settings, badge: "Officer" },
  { id: "p-verify", title: "Public QR & Certificate Verification Engine", category: "Portals", href: "/verify", icon: ShieldCheck, badge: "Public" },
  { id: "p-courses", title: "Vocational Electives Catalog (20 NSQF Trades)", category: "Portals", href: "/courses", icon: BookOpen },
  { id: "p-about", title: "About KISS Vocational Mission & Leadership", category: "Portals", href: "/about", icon: Sparkles },

  // Academic Modules
  { id: "m-att-admin", title: "Attendance Oversight & Biometric Logs", category: "Academic Modules", href: "/admin/attendance", icon: CalendarCheck },
  { id: "m-students", title: "Student Roster & Enrollment Directory", category: "Academic Modules", href: "/admin/students", icon: Users },
  { id: "m-batches", title: "Batch Allocation & Laboratory Capacity", category: "Academic Modules", href: "/admin/batches", icon: Layers },
  { id: "m-assessments", title: "Continuous Assessments & Rubric Grading", category: "Academic Modules", href: "/instructor/assessments", icon: BarChart3 },
  { id: "m-practicals", title: "Hands-on Practical Labs & Tool Work", category: "Academic Modules", href: "/instructor/practicals", icon: Wrench },
  { id: "m-certificates", title: "Graduation Credentials & Cryptographic Certificates", category: "Academic Modules", href: "/admin/certificates", icon: Award },

  // Enterprise Governance
  { id: "g-audit", title: "Immutable System Audit Trail & Logs", category: "Enterprise Governance", href: "/admin/audit", icon: ShieldAlert, badge: "SOC 2" },
  { id: "g-reports", title: "Institutional MIS Reports & Analytical Trends", category: "Enterprise Governance", href: "/admin/reports", icon: BarChart3 },
  { id: "g-settings", title: "Institutional Settings & Accreditation Parameters", category: "Enterprise Governance", href: "/admin/settings", icon: Settings },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally or toggled
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = COMMAND_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const categories = ["Portals", "Academic Modules", "Enterprise Governance"] as const;

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col font-sans relative z-[101]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search enterprise portals, academic modules, audit logs... (Esc to close)"
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500 font-medium">
              No matching enterprise module or record found.
            </div>
          ) : (
            categories.map((category) => {
              const items = filteredItems.filter((i) => i.category === category);
              if (items.length === 0) return null;

              return (
                <div key={category} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {category}
                  </div>
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 hover:border-emerald-200 border border-transparent transition-all group text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-800 flex items-center justify-center transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950 transition-colors">
                              {item.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-emerald-200/60 text-slate-600 group-hover:text-emerald-900 transition-colors">
                              {item.badge}
                            </span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>Navigate:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px]">Enter</kbd>
            <span className="text-slate-300">|</span>
            <span>Close:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px]">Esc</kbd>
          </div>
          <span className="text-emerald-800 font-semibold font-sans">KISS-VTMS Enterprise OS</span>
        </div>
      </div>
    </div>
  );
}

