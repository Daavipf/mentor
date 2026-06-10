"use client";

import { useState, useTransition } from "react";
import { ExamDTO } from "@/lib/api/domain/types/dto/ExamDTO";
import { submitExamAction } from "@/lib/api/actions/ExamActions";
import { AnswerPayload } from "@/lib/api/domain/types/AnswerPayload";

import QuestionSelect from "./QuestionSelect";
import ExamPaginationButtons from "./ExamPaginationButtons";
import QuestionDisplay from "./QuestionDisplay";
import { toast } from "sonner";

type Question = NonNullable<ExamDTO["questions"]>[number];

interface ExamViewerProps {
  examId: string;
  questions: Question[];
}

export default function ExamViewer({ examId, questions }: ExamViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!questions || questions.length === 0) {
    return <p>Nenhuma questão encontrada para esta prova.</p>;
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectAlternative = (questionId: string, alternativeId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: alternativeId }));
  };

  const handleSubmit = () => {
    const payload: AnswerPayload[] = Object.entries(answers).map(([questionId, selectedAlternativeId]) => ({
      questionId,
      selectedAlternativeId,
    }));

    startTransition(async () => {
      await submitExamAction(examId, payload);
      toast("Prova enviada com sucesso");
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <QuestionSelect currentIndex={currentIndex} totalQuestions={totalQuestions} onNavigate={setCurrentIndex} />

      <hr className="border-gray-200" />

      <QuestionDisplay
        question={currentQuestion}
        selectedAlternativeId={answers[currentQuestion.id]}
        onSelectAlternative={handleSelectAlternative}
      />

      <ExamPaginationButtons
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        onNavigate={setCurrentIndex}
        handleSubmit={handleSubmit}
        isSubmitting={isPending}
        canSubmit={true}
      />
    </div>
  );
}
