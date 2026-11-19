"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Server,
  Activity,
  CheckCircle2,
  X,
  ExternalLink,
  Command,
  Database,
  Radio,
  Lock,
} from "lucide-react";

interface EnterpriseBarProps {
  onOpenCommandPalette?: () => void;
}

export function EnterpriseInstitutionalBar({ onOpenCommandPalette }: EnterpriseBarProps) {
  const [telemetryOpen, setTelemetryOpen] = useState(false);

  return (
    <>
      {/* Enterprise Institutional Top Ribbon */}
      <div className="w-full bg-[#031d12] text-slate-300 border-b border-emerald-950/80 px-3 sm:px-6 py-1.5 text-[11px] font-mono flex items-center justify-between select-none z-40 relative">
        {/* Left: Environment & Regulatory Identifiers */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
          <div className="flex items-center gap-1.5 text-emerald-300 font-bold shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider">PROD-ODISHA-01</span>
          </div>

          <span className="hidden md:inline text-slate-600">|</span>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300 truncate">
            <span className="text-slate-500">Tenant:</span>
            <span className="font-semibold text-slate-200">KISS Higher Education Campus 3</span>
            <span className="text-[10px] text-emerald-400/80 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800/40">
              ID: OD-KISS-0412
            </span>
          </div>

          <span className="hidden lg:inline text-slate-600">|</span>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>NCVET / NSQF Aligned</span>
            <span className="text-slate-600">•</span>
            <span>NEP 2020 Vocational Credit Framework</span>
          </div>
        </div>

        {/* Right: Operational Telemetry & Command Palette Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Real-time Health Modal Trigger */}
          <button
            type="button"
            onClick={() => setTelemetryOpen(true)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/40 hover:bg-emerald-900/80 text-emerald-300 hover:text-emerald-100 border border-emerald-700/40 transition-all cursor-pointer"
            title="Inspect Institutional System Telemetry"
          >
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="font-semibold">99.98% SLA</span>
            <span className="hidden sm:inline text-[10px] text-emerald-400/70 font-sans font-medium">
              (Healthy)
            </span>
          </button>

          {/* Quick Command Palette Button */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer text-[10px]"
              title="Open Command Palette (Ctrl+K / ⌘K)"
            >
              <Command className="w-3 h-3 text-slate-400" />
              <span className="hidden sm:inline">Quick Nav</span>
              <kbd className="hidden sm:inline-block bg-white/10 text-slate-300 px-1 py-0.2 rounded font-sans text-[9px]">
                Ctrl K
              </kbd>
            </button>
          )}
        </div>
      </div>

      {/* Enterprise System Telemetry & Health Modal */}
      {telemetryOpen && (
        <div
          onClick={() => setTelemetryOpen(false)}
          className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 text-slate-100 border border-slate-700/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden font-sans relative z-[101]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    Institutional System Telemetry
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                      ALL SYSTEMS OPERATIONAL
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Node: ap-south-1a (Bhubaneswar Core Campus Hub)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTelemetryOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Metrics Grid */}
            <div className="p-4 sm:p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                {/* Service 1 */}
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <Database className="w-3.5 h-3.5 text-blue-400" /> Relational Store
                    </span>
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-700/40 pt-2">
                    <span>Pool: 8/20 Active</span>
                    <span className="text-emerald-300">p95: 1.4ms</span>
                  </div>
                </div>

                {/* Service 2 */}
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <Radio className="w-3.5 h-3.5 text-amber-400" /> Cache & Session
                    </span>
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 99.4% Hit
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-700/40 pt-2">
                    <span>In-Memory Redis</span>
                    <span className="text-emerald-300">0.3ms</span>
                  </div>
                </div>

                {/* Service 3 */}
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" /> Cryptographic Signer
                    </span>
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> SHA-256 Valid
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-700/40 pt-2">
                    <span>QR Verification</span>
                    <span className="text-slate-300">0 Revocations</span>
                  </div>
                </div>

                {/* Service 4 */}
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <Server className="w-3.5 h-3.5 text-purple-400" /> NCVET / SDMS Relay
                    </span>
                    <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Synced
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-700/40 pt-2">
                    <span>Govt. API Webhook</span>
                    <span className="text-slate-300">HTTP 200 OK</span>
                  </div>
                </div>
              </div>

              {/* Compliance & Security Audit Statement */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-200">
                    Enterprise Data Protection & Institutional Audit Ready
                  </p>
                  <p className="text-[11px] text-emerald-300/80 mt-0.5 leading-relaxed">
                    Compliant with India DPDP Act 2023, ISO 27001 session governance, and automated
                    tamper-evident audit logging with immutable timestamps.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 bg-slate-800/50 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>SLA Target: 99.95% | Actual: 99.98%</span>
              <button
                type="button"
                onClick={() => setTelemetryOpen(false)}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

