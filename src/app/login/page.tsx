"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { KissLogo } from "@/components/ui/KissLogo";
import { NayiDishaLogo } from "@/components/ui/NayiDishaLogo";
import { loginAction, demoLoginAction } from "@/features/auth/auth-actions";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("STUDENT");
  const [identifier, setIdentifier] = useState("KISS-ST-2026-001");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "STUDENT") {
      setIdentifier("KISS-ST-2026-001");
    } else if (role === "INSTRUCTOR") {
      setIdentifier("rohit.kumar@example.com");
    } else if (role === "ADMIN") {
      setIdentifier("admin@kiss.ac.in");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("identifier", identifier);
      formData.append("password", password);
      formData.append("role", selectedRole);

      const result = await loginAction(formData);

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        setErrorMessage(result.error || "Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: UserRole) => {
    setLoading(true);
    const result = await demoLoginAction(role);
    if (result.success && result.redirectUrl) {
      router.push(result.redirectUrl);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen hero-ambient-mesh flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-3.5 group">
          <NayiDishaLogo className="h-16 w-auto object-contain transition-transform group-hover:scale-105" />
        </Link>
        <div className="mt-2 text-center">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full shadow-2xs">
            In collaboration with KISS
          </span>
        </div>
        <h2 className="mt-5 text-2xl sm:text-3xl font-serif font-bold text-slate-900">
          Welcome Back
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Sign in to access your training dashboard
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in">
        <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200/90">
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100/90 p-1 rounded-xl mb-6 text-xs font-semibold">
            {(["STUDENT", "INSTRUCTOR", "ADMIN"] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleTabChange(r)}
                className={`py-2 rounded-lg transition-all capitalize cursor-pointer ${
                  selectedRole === r
                    ? "bg-[#0b4f34] text-white shadow font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {r.toLowerCase()}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {selectedRole === "STUDENT"
                  ? "Email or Student ID"
                  : selectedRole === "INSTRUCTOR"
                  ? "Email or Instructor ID"
                  : "Administrator Email"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    selectedRole === "STUDENT"
                      ? "e.g. KISS-ST-2026-001 or email"
                      : "Enter your email"
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-institutional-800/20 focus:border-institutional-800 transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-institutional-800/20 focus:border-institutional-800 transition-all font-medium text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-institutional-800 focus:ring-institutional-800 border-slate-300"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-institutional-700 hover:text-institutional-900 font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-institutional-800 hover:bg-institutional-900 font-semibold text-sm text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins Section */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              1-Click Instant Demo Access
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo("STUDENT")}
                className="btn-interactive py-2 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-900 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer flex flex-col items-center gap-0.5"
              >
                <span className="text-sm">🎓</span>
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("INSTRUCTOR")}
                className="btn-interactive py-2 px-2 bg-blue-50 hover:bg-blue-100 border border-blue-300/80 text-blue-900 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer flex flex-col items-center gap-0.5"
              >
                <span className="text-sm">👨‍🏫</span>
                <span>Instructor</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("ADMIN")}
                className="btn-interactive py-2 px-2 bg-purple-50 hover:bg-purple-100 border border-purple-300/80 text-purple-900 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer flex flex-col items-center gap-0.5"
              >
                <span className="text-sm">🏛️</span>
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-institutional-800 hover:text-institutional-900 underline"
            >
              Register as a student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
