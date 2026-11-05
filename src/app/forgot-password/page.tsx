"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { KissLogo } from "@/components/ui/KissLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3.5 group">
          <KissLogo className="h-16 w-auto drop-shadow-xs" />
          <div className="text-left">
            <span className="font-serif font-bold text-xl text-institutional-900 block leading-tight">
              KISS VTMS
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Eradicating hunger through Education
            </span>
          </div>
        </Link>
        <h2 className="mt-6 text-2xl font-serif font-bold text-slate-900">Reset Your Password</h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your registered email address to receive password recovery instructions
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-card rounded-2xl border border-slate-200">
          {submitted ? (
            <div className="text-center space-y-3 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Password Reset Email Sent
              </h3>
              <p className="text-xs text-slate-500">
                If an account exists for <strong className="text-slate-800">{email}</strong>, you will
                receive recovery instructions shortly.
              </p>
              <div className="pt-4">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-institutional-800 text-white rounded-xl text-xs font-semibold inline-block"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold rounded-xl shadow transition-all"
              >
                Send Recovery Link
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
