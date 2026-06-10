"use client";

import { useState } from "react";
import { ExamDTO } from "@/lib/api/domain/types/dto/ExamDTO";
import { QuestionOnExam } from "@/lib/api/domain/types/entities/QuestionOnExam";
import QuestionSelect from "./QuestionSelect";
import ResultQuestionDisplay from "./ResultQuestionDislay";
import ExamPaginationButtons from "./ExamPaginationButtons";

type Question = NonNullable<ExamDTO["questions"]>[number];

interface ResultViewerProps {
  questions: Question[] | undefined;
  userAnswers: QuestionOnExam[];
}

export default function ResultViewer({ questions, userAnswers }: ResultViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!questions || questions.length === 0) {
    return <p>Nenhuma questão encontrada para os resultados desta prova.</p>;
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const currentUserAnswer = userAnswers.find((ua) => ua.questionId === currentQuestion.id);

  return (
    <div>
      <QuestionSelect currentIndex={currentIndex} totalQuestions={totalQuestions} onNavigate={setCurrentIndex} />

      <ResultQuestionDisplay question={currentQuestion} userAnswer={currentUserAnswer} />

      <ExamPaginationButtons currentIndex={currentIndex} totalQuestions={totalQuestions} onNavigate={setCurrentIndex} />
    </div>
  );
}
