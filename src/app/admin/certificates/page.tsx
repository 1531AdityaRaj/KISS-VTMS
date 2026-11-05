"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Printer,
  Trash2,
  PlusCircle,
  Search,
  Send,
  ExternalLink,
} from "lucide-react";
import { db } from "@/lib/db/db-store";
import { initialUsers, initialAdmins, initialStudents, initialCourses, initialBatches } from "@/lib/db/mock-data";
import { CertificateDocument } from "@/components/certificates/CertificateDocument";
import { Certificate } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminCertificatesPage() {
  const user = initialUsers[2];
  const admin = initialAdmins[0];

  const [certificates, setCertificates] = useState(db.certificates.getAll());
  const [selectedCertForPreview, setSelectedCertForPreview] = useState<Certificate | null>(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [certToRevoke, setCertToRevoke] = useState<Certificate | null>(null);
  const [revokeReason, setRevokeReason] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // New Certificate Issuance State
  const [selectedStudentId, setSelectedStudentId] = useState("st-2");
  const [signatoryName, setSignatoryName] = useState("Prof. S. Samanta, Director (Academics)");

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCert = db.certificates.approveAndIssueCertificate(
      selectedStudentId,
      "course-1",
      "batch-1",
      signatoryName
    );

    db.auditLogs.log({
      actorId: user.id,
      actorName: admin.fullName,
      actorRole: "ADMIN",
      action: "ISSUE_CERTIFICATE",
      entity: "Certificate",
      entityId: newCert.id,
      metadata: { certificateId: newCert.certificateId, studentName: newCert.studentName },
    });

    setCertificates([...db.certificates.getAll()]);
    setShowIssueModal(false);
    setToastMessage(`Certificate ${newCert.certificateId} successfully generated and issued!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleRevokeConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certToRevoke) return;

    db.certificates.revokeCertificate(certToRevoke.certificateId, revokeReason);

    db.auditLogs.log({
      actorId: user.id,
      actorName: admin.fullName,
      actorRole: "ADMIN",
      action: "REVOKE_CERTIFICATE",
      entity: "Certificate",
      entityId: certToRevoke.id,
      metadata: { certificateId: certToRevoke.certificateId, reason: revokeReason },
    });

    setCertificates([...db.certificates.getAll()]);
    setShowRevokeModal(false);
    setToastMessage(`Certificate ${certToRevoke.certificateId} has been revoked.`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <AppShell
      user={user}
      profileName={admin.fullName}
      profileIdentifier="Admin Officer"
      avatarUrl={admin.avatarUrl}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              Institutional Certificates
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review certification eligibility, issue tamper-proof credentials, and manage public verification status
            </p>
          </div>

          <button
            onClick={() => setShowIssueModal(true)}
            className="px-4 py-2.5 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Issue New Certificate</span>
          </button>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Certificates Management Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Certificate ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Vocational Course</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {cert.certificateId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{cert.studentName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{cert.courseName}</td>
                    <td className="py-3.5 px-4 text-slate-500">{formatDate(cert.issueDate)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          cert.status === "ISSUED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : cert.status === "REVOKED"
                            ? "bg-rose-50 text-rose-800 border border-rose-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {cert.status === "ISSUED" ? "Active / Issued" : cert.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCertForPreview(cert)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg"
                          title="Preview Certificate"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <Link
                          href={`/verify/${cert.certificateId}`}
                          target="_blank"
                          className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-emerald-700 rounded-lg"
                          title="Verify Publicly"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {cert.status !== "REVOKED" && (
                          <button
                            onClick={() => {
                              setCertToRevoke(cert);
                              setShowRevokeModal(true);
                            }}
                            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg"
                            title="Revoke Certificate"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Modal */}
        {selectedCertForPreview && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 max-w-4xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Institutional Certificate Preview
                </h3>
                <button
                  onClick={() => setSelectedCertForPreview(null)}
                  className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  ✕ Close
                </button>
              </div>

              <CertificateDocument certificate={selectedCertForPreview} />
            </div>
          </div>
        )}

        {/* Issue Certificate Modal */}
        {showIssueModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Approve & Issue Certificate
              </h3>
              <p className="text-xs text-slate-500">
                Generate an official credential with verifiable QR code and record in the public directory.
              </p>

              <form onSubmit={handleIssueCertificate} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Select Student</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {initialStudents.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.fullName} ({st.studentId})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Authorized Signatory
                  </label>
                  <input
                    type="text"
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowIssueModal(false)}
                    className="w-1/2 py-2.5 bg-slate-100 font-semibold rounded-xl text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-institutional-800 text-white font-semibold rounded-xl shadow"
                  >
                    Approve & Issue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Revoke Confirmation Dialog matching Section 64 & 75 */}
        {showRevokeModal && certToRevoke && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-rose-200">
              <div className="flex items-center gap-3 text-rose-700">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Revoke Certificate
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to revoke certificate{" "}
                <strong className="font-mono text-slate-900">{certToRevoke.certificateId}</strong>{" "}
                issued to <strong>{certToRevoke.studentName}</strong>? Public verification will
                immediately flag this credential as revoked.
              </p>

              <form onSubmit={handleRevokeConfirm} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Revocation Reason *
                  </label>
                  <input
                    type="text"
                    required
                    value={revokeReason}
                    onChange={(e) => setRevokeReason(e.target.value)}
                    placeholder="e.g. Incomplete practical hours, administrative audit correction"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRevokeModal(false)}
                    className="w-1/2 py-2.5 bg-slate-100 font-semibold rounded-xl text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-xl shadow"
                  >
                    Confirm Revocation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
