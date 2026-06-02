"use client";

import { ExamDTO } from "@/lib/api/types/ExamDTO";
import AlternativeItem from "./AlternativeItem";
import { Badge } from "../ui/badge";

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Questão {question.index}</h3>
        <Badge>
          {question.area} {question.language && `(${question.language})`} • {question.year}
        </Badge>
      </div>

      {/*question.title && <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>{question.title}</h4>*/}

      {question.context && (
        <p style={{ whiteSpace: "pre-wrap", textAlign: "justify", marginBottom: "15px" }}>{question.context}</p>
      )}

      {question.alternativesIntroduction && (
        <p style={{ fontWeight: "bold", marginBottom: "15px" }}>{question.alternativesIntroduction}</p>
      )}

      {question.alternatives && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          {question.alternatives.map((alt, index) => {
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
