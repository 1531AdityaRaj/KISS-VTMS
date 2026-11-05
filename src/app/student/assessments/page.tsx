"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { initialAssessments, initialStudents, initialUsers } from "@/lib/db/mock-data";
import { db } from "@/lib/db/db-store";

export default function StudentAssessmentsPage() {
  const student = initialStudents[0];
  const user = initialUsers[0];
  const assessment = initialAssessments[0];

  const [attempt, setAttempt] = useState(
    db.assessmentAttempts.getByAssessmentAndStudent(assessment.id, student.id)
  );
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = assessment.questions || [];

  // Countdown timer
  useEffect(() => {
    if (!isTakingTest || attempt?.status === "SUBMITTED") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTakingTest, attempt]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSubmitTest = () => {
    setIsSubmitting(true);
    const answersPayload = questions.map((q) => ({
      questionId: q.id,
      selectedOptionIndex: selectedAnswers[q.id] ?? -1,
    }));

    setTimeout(() => {
      const resultAttempt = db.assessmentAttempts.submitAttempt(
        assessment.id,
        student.id,
        student.fullName,
        answersPayload
      );
      setAttempt(resultAttempt);
      setIsTakingTest(false);
      setIsSubmitting(false);
    }, 800);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AppShell
      user={user}
      profileName={student.fullName}
      profileIdentifier={student.studentId}
      avatarUrl={student.avatarUrl}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Online Assessments</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Take modular quizzes and theoretical assessments evaluated with instant grading
            </p>
          </div>
          <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
            {assessment.courseTitle}
          </span>
        </div>

        {/* Assessment Card / Player */}
        {!isTakingTest ? (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                    MCQ Theory
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Duration: {assessment.durationMinutes} Mins
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  {assessment.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  {assessment.instructions}
                </p>
              </div>

              {attempt ? (
                <div className="text-right p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Score Achieved
                  </span>
                  <span className="text-2xl font-serif font-bold text-emerald-700">
                    {attempt.score}/{attempt.totalMarks} Marks
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 block mt-0.5">
                    Passed ({attempt.percentage}%)
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setIsTakingTest(true)}
                  className="px-6 py-3 bg-institutional-800 hover:bg-institutional-900 text-white font-semibold text-xs rounded-xl shadow transition-all shrink-0"
                >
                  Start Assessment Now
                </button>
              )}
            </div>

            {/* If completed, show summary of questions and correct solutions */}
            {attempt && (
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Detailed Answer Review
                </h3>
                <div className="space-y-3">
                  {questions.map((q, idx) => {
                    const studentAns = attempt.answers.find((a) => a.questionId === q.id);
                    const isCorrect = studentAns?.isCorrect;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border text-xs space-y-2 ${
                          isCorrect ? "bg-emerald-50/50 border-emerald-200" : "bg-rose-50/50 border-rose-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-slate-900">
                            Q{idx + 1}. {q.questionText}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                              isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {isCorrect ? `+${q.marks} Marks` : "0 Marks"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, optIdx) => (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-lg border ${
                                optIdx === q.correctOptionIndex
                                  ? "bg-emerald-100 border-emerald-300 font-bold text-emerald-950"
                                  : studentAns?.selectedOptionIndex === optIdx
                                  ? "bg-rose-100 border-rose-300 font-bold text-rose-950"
                                  : "bg-white border-slate-200 text-slate-600"
                              }`}
                            >
                              <span className="font-mono mr-1.5 font-bold">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <p className="text-slate-500 pt-1 italic">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Active MCQ Assessment Player */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
            {/* Player Header with Timer */}
            <div className="p-4 sm:p-6 bg-[#0a261a] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base">{assessment.title}</h3>
                <p className="text-xs text-emerald-300">
                  Question {currentQuestionIdx + 1} of {questions.length}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/20 font-mono text-sm font-bold text-amber-300">
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Question Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {questions[currentQuestionIdx] && (
                <div className="space-y-4">
                  <h4 className="text-base font-serif font-bold text-slate-900 leading-snug">
                    {currentQuestionIdx + 1}. {questions[currentQuestionIdx].questionText}
                  </h4>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {questions[currentQuestionIdx].options.map((opt, optIdx) => {
                      const isSelected =
                        selectedAnswers[questions[currentQuestionIdx].id] === optIdx;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            handleSelectOption(questions[currentQuestionIdx].id, optIdx)
                          }
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation & Submit Bar */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestionIdx(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        currentQuestionIdx === i
                          ? "bg-institutional-800 text-white"
                          : selectedAnswers[questions[i].id] !== undefined
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {currentQuestionIdx === questions.length - 1 ? (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitTest}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Finish & Submit"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentQuestionIdx((p) => Math.min(questions.length - 1, p + 1))
                    }
                    className="px-4 py-2 bg-institutional-800 hover:bg-institutional-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
