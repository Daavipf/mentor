"use client";

import { ExamDTO } from "@/lib/api/types/ExamDTO";
import AlternativeItem from "./AlternativeItem";

type Question = NonNullable<ExamDTO["questions"]>[number];

interface QuestionDisplayProps {
  question: Question;
  selectedAlternativeId?: string;
  onSelectAlternative: (questionId: string, alternativeId: string) => void;
}

export default function QuestionDisplay({
  question,
  selectedAlternativeId,
  onSelectAlternative,
}: QuestionDisplayProps) {
  return (
    <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "8px" }}>
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

      {question.alternatives && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          {question.alternatives.map((alt, index) => {
            // Converte o index (0, 1, 2) para letras (A, B, C)
            const letter = String.fromCharCode(65 + index);

            return (
              <AlternativeItem
                key={alt.id}
                alternative={alt}
                letter={letter}
                isSelected={selectedAlternativeId === alt.id}
                onSelect={() => onSelectAlternative(question.id, alt.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
