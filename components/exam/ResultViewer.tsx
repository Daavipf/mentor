"use client";

import { useState } from "react";
import { ExamDTO } from "@/lib/api/types/ExamDTO";
import ExamNavigation from "../../components/exam/ExamNavigation";
import ResultQuestionDisplay from "./ResultQuestionDislay";
import { Prisma } from "@/lib/prisma/prisma/client";

type Question = NonNullable<ExamDTO["questions"]>[number];

interface ResultViewerProps {
  questions: Question[] | undefined;
  userAnswers: Prisma.QuestionsOnExamsModel[];
}

export default function ResultViewer({ questions, userAnswers }: ResultViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!questions || questions.length === 0) {
    return <p>Nenhuma questão encontrada para os resultados desta prova.</p>;
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Encontra a resposta específica do usuário para a questão atual
  const currentUserAnswer = userAnswers.find((ua) => ua.questionId === currentQuestion.id);

  return (
    <div>
      <ExamNavigation currentIndex={currentIndex} totalQuestions={totalQuestions} onNavigate={setCurrentIndex} />

      <ResultQuestionDisplay question={currentQuestion} userAnswer={currentUserAnswer} />
    </div>
  );
}
