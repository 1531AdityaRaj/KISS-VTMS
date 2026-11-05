"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  FileText,
  Wrench,
  Award,
  UserCircle,
  Bell,
  LogOut,
  Menu,
  X,
  Search,
  Users,
  GraduationCap,
  ShieldAlert,
  Settings,
  BarChart3,
  Layers,
  ClipboardList,
} from "lucide-react";
import { User, UserRole, Notification } from "@/types";
import { logoutAction, demoLoginAction } from "@/features/auth/auth-actions";
import { NayiDishaLogo } from "@/components/ui/NayiDishaLogo";

interface AppShellProps {
  user: User;
  profileName: string;
  profileIdentifier?: string;
  avatarUrl?: string;
  notifications?: Notification[];
  children: React.ReactNode;
}

export function AppShell({
  user,
  profileName,
  profileIdentifier,
  avatarUrl,
  notifications = [],
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(notifications);

  const role = user.role;

  // Student Navigation Links
  const studentNavItems = [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "My Courses", href: "/student/courses", icon: BookOpen },
    { label: "Attendance", href: "/student/attendance", icon: CalendarCheck },
    { label: "Assignments", href: "/student/assignments", icon: FileText },
    { label: "Practicals", href: "/student/practicals", icon: Wrench },
    { label: "Assessments", href: "/student/assessments", icon: ClipboardList },
    { label: "Results", href: "/student/results", icon: BarChart3 },
    { label: "Certificates", href: "/student/certificates", icon: Award },
    { label: "Profile", href: "/student/profile", icon: UserCircle },
  ];

  // Instructor Navigation Links
  const instructorNavItems = [
    { label: "Dashboard", href: "/instructor", icon: LayoutDashboard },
    { label: "My Classes", href: "/instructor/classes", icon: Layers },
    { label: "Students", href: "/instructor/students", icon: Users },
    { label: "Attendance", href: "/instructor/attendance", icon: CalendarCheck },
    { label: "Assignments", href: "/instructor/assignments", icon: FileText },
    { label: "Practicals", href: "/instructor/practicals", icon: Wrench },
    { label: "Assessments", href: "/instructor/assessments", icon: ClipboardList },
    { label: "Results", href: "/instructor/results", icon: BarChart3 },
    { label: "Certifications", href: "/instructor/certifications", icon: Award },
    { label: "Profile", href: "/instructor/profile", icon: UserCircle },
  ];

  // Admin Navigation Links
  const adminNavItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Instructors", href: "/admin/instructors", icon: GraduationCap },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Batches", href: "/admin/batches", icon: Layers },
    { label: "Enrollments", href: "/admin/enrollments", icon: ClipboardList },
    { label: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
    { label: "Certificates", href: "/admin/certificates", icon: Award },
    { label: "Reports", href: "/admin/reports", icon: BarChart3 },
    { label: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const currentNavItems =
    role === "ADMIN" ? adminNavItems : role === "INSTRUCTOR" ? instructorNavItems : studentNavItems;

  const handleRoleSwitch = async (newRole: UserRole) => {
    await demoLoginAction(newRole);
    router.refresh();
  };

  const markAllRead = () => {
    setUnreadNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = unreadNotifs.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-64 bg-[#0a261a] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-20 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <Link href="/" className="flex items-center gap-2.5">
              <NayiDishaLogo className="h-12 w-auto object-contain shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-bold text-sm text-white tracking-wide">
                    NayiDisha
                  </span>
                  <span className="text-[9px] font-bold tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30 uppercase">
                    {role}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-300/80 truncate leading-tight mt-0.5">
                  In collab. with KISS
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === `/student` || item.href === `/instructor` || item.href === `/admin`
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-700/80 text-white shadow-sm font-semibold border-l-4 border-amber-400"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-white/10 space-y-2 bg-[#061e14]/95">
          {/* Quick Role Switcher Pill */}
          <div className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Demo Role:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleRoleSwitch("STUDENT")}
                className={`btn-interactive px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                  role === "STUDENT" ? "bg-emerald-600 text-white shadow-xs" : "hover:bg-white/15 text-slate-300"
                }`}
                title="Switch view to Student"
              >
                ST
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch("INSTRUCTOR")}
                className={`btn-interactive px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                  role === "INSTRUCTOR" ? "bg-emerald-600 text-white shadow-xs" : "hover:bg-white/15 text-slate-300"
                }`}
                title="Switch view to Instructor"
              >
                INS
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch("ADMIN")}
                className={`btn-interactive px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                  role === "ADMIN" ? "bg-emerald-600 text-white shadow-xs" : "hover:bg-white/15 text-slate-300"
                }`}
                title="Switch view to Admin"
              >
                ADM
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden border border-emerald-400/40 shadow-xs">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt={profileName} className="w-full h-full object-cover" />
                ) : (
                  profileName.charAt(0)
                )}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{profileName}</p>
                <p className="text-[10px] text-emerald-300 truncate">
                  {profileIdentifier || user.email}
                </p>
              </div>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-16 px-4 sm:px-6 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Institutional Search Bar */}
            <div className="relative hidden sm:block w-72 md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, modules, records..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Public Verification Link */}
            <Link
              href="/verify"
              className="hidden lg:flex items-center gap-1 text-xs font-semibold text-institutional-800 bg-institutional-50 hover:bg-institutional-100 px-2.5 py-1.5 rounded-lg border border-institutional-200 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Verify ID</span>
            </Link>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
                  <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-institutional-700 hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {unreadNotifs.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-500">
                        No notifications right now.
                      </div>
                    ) : (
                      unreadNotifs.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3.5 transition-colors ${
                            notif.isRead ? "bg-white" : "bg-emerald-50/40"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                              <p className="text-xs text-slate-600 mt-0.5">{notif.message}</p>
                              {notif.link && (
                                <Link
                                  href={notif.link}
                                  onClick={() => setNotificationsOpen(false)}
                                  className="inline-block mt-1 text-[11px] font-semibold text-institutional-700 hover:underline"
                                >
                                  View details →
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-institutional-800 text-white flex items-center justify-center font-bold text-xs overflow-hidden shadow-sm">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt={profileName} className="w-full h-full object-cover" />
                ) : (
                  profileName.charAt(0)
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-900 leading-tight">{profileName}</p>
                <p className="text-[10px] font-medium text-slate-500 capitalize">{role.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
