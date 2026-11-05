"use client";

import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Printer, CheckCircle2 } from "lucide-react";
import { KissLogo } from "@/components/ui/KissLogo";
import { Certificate } from "@/types";
import { formatDate } from "@/lib/utils";

interface CertificateDocumentProps {
  certificate: Certificate;
  onPrint?: () => void;
  showActions?: boolean;
}

export function CertificateDocument({
  certificate,
  onPrint,
  showActions = true,
}: CertificateDocumentProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleNativePrint = () => {
    window.print();
  };

  const isRevoked = certificate.status === "REVOKED";

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Actions Toolbar (hidden during print) */}
      {showActions && (
        <div className="no-print w-full max-w-4xl flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                isRevoked
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
              }`}
            >
              {isRevoked ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  Certificate Revoked
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Authentic Institutional Certificate
                </>
              )}
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              ID: {certificate.certificateId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrint || handleNativePrint}
              className="px-3.5 py-1.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Official Certificate Container (A4 Landscape aspect ratio) */}
      <div
        ref={certRef}
        id="certificate-print-area"
        className="certificate-print-container relative w-full max-w-4xl bg-white text-slate-900 shadow-xl rounded-2xl overflow-hidden cert-border-outer p-4 sm:p-6 select-none"
        style={{
          minHeight: "560px",
          background: "#ffffff",
        }}
      >
        <div className="cert-border-inner h-full w-full p-6 sm:p-10 flex flex-col justify-between relative">
          {/* Watermark Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <KissLogo className="w-96 h-96" />
          </div>

          {/* Revoked watermark overlay if revoked */}
          {isRevoked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="border-8 border-red-600/80 text-red-600/80 text-6xl font-black px-12 py-4 rotate-[-20deg] uppercase tracking-widest rounded-xl bg-white/70 backdrop-blur-xs">
                REVOKED
              </div>
            </div>
          )}

          {/* Certificate Header */}
          <div className="text-center space-y-1 relative z-10">
            <div className="flex justify-center mb-1">
              <KissLogo className="w-16 h-16" />
            </div>
            <h4 className="text-xs font-semibold tracking-widest text-[#0b4f34] uppercase font-sans">
              Kalinga Institute of Social Sciences
            </h4>
            <p className="text-[11px] text-slate-500 italic font-serif">
              &quot;Eradicating hunger through Education&quot;
            </p>
            <div className="h-0.5 w-24 bg-[#c89d3c] mx-auto my-2" />
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-slate-900 uppercase pt-1">
              Certificate of Completion
            </h1>
            <p className="text-xs text-slate-500 italic">This is to certify that</p>
          </div>

          {/* Student Recipient Name */}
          <div className="text-center my-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0b4f34] tracking-tight">
              {certificate.studentName}
            </h2>
            <div className="w-48 h-0.5 bg-slate-300 mx-auto mt-2" />
          </div>

          {/* Achievement Description */}
          <div className="text-center max-w-2xl mx-auto space-y-1 relative z-10">
            <p className="text-xs sm:text-sm text-slate-600">
              has successfully completed the comprehensive vocational training program in
            </p>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
              {certificate.courseName}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Vocational Training Program • {certificate.duration}
            </p>
            <p className="text-[11px] text-slate-400 font-medium pt-1">
              Completed on: {formatDate(certificate.completionDate)} • Batch: {certificate.batchCode || "2026"}
            </p>
          </div>

          {/* Signatures, Certificate ID, & QR Code Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200/80 grid grid-cols-3 items-end relative z-10 text-xs">
            {/* Left: Instructor Signature */}
            <div className="text-left space-y-1">
              <div className="h-10 flex items-end">
                <span className="font-serif italic text-sm text-slate-700 font-bold border-b border-slate-400 pb-0.5 inline-block">
                  {certificate.instructorName.split(",")[0]}
                </span>
              </div>
              <p className="font-semibold text-slate-800">{certificate.instructorName}</p>
              <p className="text-[10px] text-slate-500">Course Instructor</p>
            </div>

            {/* Center: Unique ID & Verified QR */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-1.5 bg-white border border-slate-300 rounded-lg shadow-xs">
                <QRCodeSVG
                  value={
                    typeof window !== "undefined"
                      ? `${window.location.origin}/verify/${certificate.certificateId}`
                      : `http://localhost:3000/verify/${certificate.certificateId}`
                  }
                  size={64}
                  level="M"
                />
              </div>
              <div className="text-center">
                <p className="font-mono text-[10px] font-bold text-slate-700 tracking-wider">
                  {certificate.certificateId}
                </p>
                <p className="text-[9px] text-slate-400">Scan to verify online</p>
              </div>
            </div>

            {/* Right: Director / Authorized Signatory */}
            <div className="text-right space-y-1">
              <div className="h-10 flex items-end justify-end">
                <span className="font-serif italic text-sm text-slate-700 font-bold border-b border-slate-400 pb-0.5 inline-block">
                  {certificate.signatoryName.split(",")[0]}
                </span>
              </div>
              <p className="font-semibold text-slate-800">{certificate.signatoryName}</p>
              <p className="text-[10px] text-slate-500">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
