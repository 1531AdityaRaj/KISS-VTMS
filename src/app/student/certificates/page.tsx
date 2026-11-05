"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import {
  Award,
  CheckCircle2,
  Download,
  Share2,
  ExternalLink,
  Printer,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import { db } from "@/lib/db/db-store";
import { CertificateDocument } from "@/components/certificates/CertificateDocument";

export default function StudentCertificatesPage() {
  const student = db.students.getById("st-1")!;
  const user = db.users.getById(student.userId)!;

  const certificate = db.certificates.getByStudentId(student.id);
  const eligibility = db.certificates.checkEligibility(student.id);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (certificate && typeof window !== "undefined") {
      const url = `${window.location.origin}/verify/${certificate.certificateId}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
            <h1 className="text-2xl font-serif font-bold text-slate-900">Digital Certificate Hub</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Track your eligibility checklist and download your official QR-verified certificate
            </p>
          </div>

          {certificate && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "Link Copied" : "Share Verification"}</span>
              </button>
              <Link
                href={`/verify/${certificate.certificateId}`}
                target="_blank"
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Public Verification</span>
              </Link>
            </div>
          )}
        </div>

        {/* Congratulations Banner if Issued */}
        {certificate && (
          <div className="bg-gradient-to-r from-[#0a261a] to-[#0b4f34] text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Official Credential Ready</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">
                Congratulations, {student.fullName}!
              </h2>
              <p className="text-xs text-slate-200 max-w-xl leading-relaxed">
                You have fulfilled all academic requirements, practical assessments and attendance
                guidelines for <strong>{certificate.courseName}</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={() => window.print()}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 font-bold text-slate-950 rounded-xl text-xs shadow transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        )}

        {/* Eligibility Requirements Checklist */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Institutional Eligibility Requirements
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {eligibility.overallPercentage}% Requirements Satisfied
            </span>
          </div>

          <div className="space-y-3">
            {eligibility.requirements.map((req) => (
              <div
                key={req.id}
                className={`p-4 rounded-xl border flex items-start justify-between gap-4 ${
                  req.isMet ? "bg-emerald-50/40 border-emerald-200" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      req.isMet ? "text-emerald-600" : "text-slate-300"
                    }`}
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{req.title}</p>
                    <p className="text-[11px] text-slate-500">{req.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 text-xs">
                  <span className="font-bold text-slate-800">{req.currentValue}</span>
                  <span className="text-[10px] text-slate-400 block">Req: {req.targetValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Preview Render Component */}
        {certificate && (
          <div className="pt-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-4">
              Certificate Document Preview
            </h3>
            <CertificateDocument certificate={certificate} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
