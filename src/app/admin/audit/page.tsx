import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/db-store";
import { ShieldAlert, Clock, User, FileText, CheckCircle2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default async function AdminAuditLogsPage() {
  const session = await getSession();
  const admin = session?.admin || db.admins.getAll()[0];
  const user = session?.user || db.users.getById(admin.userId)!;

  const logs = db.auditLogs.getAll();

  return (
    <AppShell
      user={user}
      profileName={admin.fullName}
      profileIdentifier="Admin Officer"
      avatarUrl={admin.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">System Audit Logs</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Immutable activity records of administrative operations, certificate issuances, marks changes and logins
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {logs.length} Recorded Events
          </span>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500">
                      {formatDateTime(log.timestamp)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 font-sans">
                      {log.actorName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {log.actorRole}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-800">{log.action}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-sans">{log.entity}</td>
                    <td className="py-3.5 px-4 text-slate-500 truncate max-w-xs font-mono">
                      {log.metadata ? JSON.stringify(log.metadata) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
