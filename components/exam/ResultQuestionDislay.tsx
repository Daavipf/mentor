"use client";

import { ExamDTO } from "@/lib/api/types/ExamDTO";
import ResultAlternativeItem from "./ResultAlternativeItem";
import { Prisma } from "@/lib/prisma/prisma/client";

type Question = NonNullable<ExamDTO["questions"]>[number];

interface ResultQuestionDisplayProps {
  question: Question;
  userAnswer?: Prisma.QuestionsOnExamsModel;
}

export default function ResultQuestionDisplay({ question, userAnswer }: ResultQuestionDisplayProps) {
  return (
    <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "8px", backgroundColor: "#fff" }}>
      {/* Cabeçalho da questão omitido para brevidade (mantenha o mesmo que você já tem) */}
      <div style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Questão {question.index}</h3>
        <span style={{ fontSize: "12px", background: "#e0e0e0", padding: "4px 8px", borderRadius: "12px" }}>
          {question.area} {question.language && `(${question.language})`} • {question.year}
        </span>
      </div>

      {question.title && <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>{question.title}</h4>}
      {question.context && (
        <p style={{ whiteSpace: "pre-wrap", textAlign: "justify", marginBottom: "15px" }}>{question.context}</p>
      )}
      {question.alternativesIntroduction && (
        <p style={{ fontWeight: "bold", marginBottom: "15px" }}>{question.alternativesIntroduction}</p>
      )}

      {/* Exibição se o usuário não tiver respondido nada nessa questão */}
      {userAnswer?.selectedAlternativeId === null && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            color: "#856404",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          ⚠️ Você deixou esta questão em branco.
        </div>
      )}

      {question.alternatives && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          {question.alternatives.map((alt, index) => {
            const letter = String.fromCharCode(65 + index);

            // Verifica se esta foi a alternativa que o usuário selecionou
            const isSelected = userAnswer?.selectedAlternativeId === alt.id;

            return <ResultAlternativeItem key={alt.id} alternative={alt} letter={letter} isSelected={isSelected} />;
          })}
        </div>
      )}
    </div>
  );
}
