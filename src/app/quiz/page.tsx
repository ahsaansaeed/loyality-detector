"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { LucideChevronRight, LucideCheckCircle2 } from "lucide-react";

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userName, setUserName] = useState("");
  const [userRoll, setUserRoll] = useState("");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    const roll = localStorage.getItem("user_roll");
    if (!name || !roll) {
      router.push("/");
    } else {
      setUserName(name);
      setUserRoll(roll);
    }
  }, [router]);

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          rollNumber: userRoll,
          answers: answers,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("latest_result", JSON.stringify(data.data));
        router.push(`/result/${userRoll}`);
      } else if (response.status === 409) {
        // Roll number already exists
        alert("Wait a minute... You already took the test! 🐍");
        router.push(`/result/${userRoll}`);
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting test. Please try again.");
    }
  };


  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full glass rounded-3xl p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Question {currentStep + 1} of 5</h2>
            <p className="text-slate-400 text-xs mt-1">Tester: {userName}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {currentQuestion.question}
          </h1>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all group relative overflow-hidden ${
                  answers[currentStep] === index
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span className={`text-lg font-medium ${answers[currentStep] === index ? "text-emerald-400" : "text-slate-300"}`}>
                    {option.label}
                  </span>
                  {answers[currentStep] === index && (
                    <LucideCheckCircle2 className="w-6 h-6 text-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <button
            disabled={answers[currentStep] === undefined}
            onClick={nextStep}
            className="flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            {currentStep === questions.length - 1 ? "Finish Test" : "Next Question"}
            <LucideChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
