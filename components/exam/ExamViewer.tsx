"use client";

import { useState, useTransition } from "react";
import { ExamDTO } from "@/lib/api/types/ExamDTO";
import { submitExamAction } from "@/lib/api/exams/actions"; // Ajuste o path da sua action
import { AnswerPayload } from "@/lib/api/types/AnswerPayload";
import ExamNavigation from "./ExamNavigation";
import QuestionDisplay from "./QuestionDisplay";

type Question = NonNullable<ExamDTO["questions"]>[number];

interface ExamViewerProps {
  examId: string;
  questions: Question[];
}

export default function ExamViewer({ examId, questions }: ExamViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  // Estado para armazenar as respostas: { "id-da-questao": "id-da-alternativa" }
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!questions || questions.length === 0) {
    return <p>Nenhuma questão encontrada para esta prova.</p>;
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Atualiza a resposta de uma questão
  const handleSelectAlternative = (questionId: string, alternativeId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: alternativeId }));
  };

  // Prepara o payload e envia para a Server Action
  const handleSubmit = () => {
    const payload: AnswerPayload[] = Object.entries(answers).map(([questionId, selectedAlternativeId]) => ({
      questionId,
      selectedAlternativeId,
    }));

    startTransition(async () => {
      await submitExamAction(examId, payload);
      // Aqui você pode adicionar um redirecionamento ou mensagem de sucesso
      alert("Prova enviada com sucesso!");
    });
  };

  return (
    <div>
      <ExamNavigation currentIndex={currentIndex} totalQuestions={totalQuestions} onNavigate={setCurrentIndex} />

      <QuestionDisplay
        question={currentQuestion}
        selectedAlternativeId={answers[currentQuestion.id]}
        onSelectAlternative={handleSelectAlternative}
      />

      {/* Rodapé com botão de envio */}
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          style={{
            padding: "12px 24px",
            backgroundColor: isPending ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Enviando..." : "Finalizar e Enviar Prova"}
        </button>
      </div>
    </div>
  );
}
