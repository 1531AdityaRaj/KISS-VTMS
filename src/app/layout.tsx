import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NayiDisha — Turning Skills into Opportunities | In collaboration with KISS",
  description: "NayiDisha — Turning Skills into Opportunities. Vocational Training & Skill Development Portal in collaboration with Kalinga Institute of Social Sciences (KISS). Providing free and subsidized skill-based vocational education, practical labs, and verifiable certificates.",
  keywords: ["NayiDisha", "Turning Skills into Opportunities", "vocational training", "KISS", "Kalinga Institute of Social Sciences", "skill development", "practical education", "digital certificates"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="h-full min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
