"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/Navbar";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Award,
  Calendar,
  Clock,
  User,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Printer,
  Copy,
  Check,
} from "lucide-react";
import { db } from "@/lib/db/db-store";
import { CertificateDocument } from "@/components/certificates/CertificateDocument";
import { formatDate } from "@/lib/utils";

export default function VerifyCertificateResultPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const resolvedParams = use(params);
  const certificateId = decodeURIComponent(resolvedParams.certificateId);
  const [showFullDoc, setShowFullDoc] = useState(false);
  const [copied, setCopied] = useState(false);

  const cert = db.certificates.getByCertificateId(certificateId);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Back Link */}
        <Link
          href="/verify"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Search Another Certificate</span>
        </Link>

        {/* Verification Result State */}
        {!cert ? (
          /* NOT FOUND / INVALID */
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <XCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Certificate Could Not Be Verified
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              No matching institutional certificate record found for ID:{" "}
              <span className="font-mono font-bold text-slate-800">{certificateId}</span>. Please
              verify that the ID was entered correctly.
            </p>
            <div className="pt-4">
              <Link
                href="/verify"
                className="px-6 py-2.5 bg-institutional-800 text-white text-xs font-semibold rounded-xl shadow inline-block"
              >
                Try Again
              </Link>
            </div>
          </div>
        ) : cert.status === "REVOKED" ? (
          /* REVOKED CERTIFICATE */
          <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-rose-300 shadow-card space-y-6">
            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">
              <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
              <div>
                <h3 className="font-bold text-base">This Certificate Has Been Revoked</h3>
                <p className="text-xs text-rose-700 mt-0.5">
                  Reason: {cert.revocationReason || "Revoked by institutional administrator."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500">Student Name:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{cert.studentName}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500">Course:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{cert.courseName}</p>
              </div>
            </div>
          </div>
        ) : (
          /* VALID CERTIFICATE */
          <div className="space-y-6">
            {/* Green Verified Banner matching Reference Screenshot */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-institutional-900">
                        Certificate Verified
                      </h2>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Authentic
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Issued by Kalinga Institute of Social Sciences (KISS)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Link Copied" : "Share Link"}</span>
                  </button>
                  <button
                    onClick={() => setShowFullDoc(!showFullDoc)}
                    className="px-4 py-2 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                  >
                    {showFullDoc ? "Hide Document" : "View Full Certificate"}
                  </button>
                </div>
              </div>

              {/* Verified Safe Details Grid matching screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Student Name
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span className="font-serif font-bold text-slate-900 text-base">
                      {cert.studentName}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Vocational Course
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900 text-sm">{cert.courseName}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Training Duration
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900 text-sm">{cert.duration}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Completion Date
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900 text-sm">
                      {formatDate(cert.completionDate)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Certificate ID
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {cert.certificateId}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80">
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                    Status
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-900 text-sm">Active & Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Full Document View */}
            {showFullDoc && (
              <div className="pt-4">
                <CertificateDocument certificate={cert} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
