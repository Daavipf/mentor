"use client";

import { ExamDTO } from "@/lib/api/types/ExamDTO";

type Alternative = NonNullable<NonNullable<ExamDTO["questions"]>[number]["alternatives"]>[number] & {
  isCorrect?: boolean;
};

interface ResultAlternativeItemProps {
  alternative: Alternative;
  letter: string;
  isSelected: boolean;
}

export default function ResultAlternativeItem({ alternative, letter, isSelected }: ResultAlternativeItemProps) {
  const isCorrect = alternative.isCorrect;

  // Cores Padrão (Neutro)
  let bgColor = "#fafafa";
  let borderColor = "#ddd";
  let textColor = "#333";

  // Se for a alternativa correta (gabarito), sempre destaca em verde
  if (isCorrect) {
    bgColor = "#e6ffed";
    borderColor = "#2ea043";
    textColor = "#055016";
  }
  // Se o usuário marcou E está errada, destaca em vermelho
  else if (isSelected && !isCorrect) {
    bgColor = "#ffebe9";
    borderColor = "#cb2431";
    textColor = "#9e1c23";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px",
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "6px",
        color: textColor,
        opacity: !isCorrect && !isSelected ? 0.7 : 1, // Suaviza alternativas irrelevantes
      }}
    >
      <input type="radio" checked={isSelected} readOnly disabled style={{ marginTop: "4px" }} />

      <div style={{ display: "flex", gap: "8px", flex: 1 }}>
        <strong style={{ color: borderColor }}>{letter})</strong>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {alternative.text && <span>{alternative.text}</span>}

          {alternative.file && (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={alternative.file}
                alt={`Alternativa ${letter}`}
                style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain", borderRadius: "4px" }}
              />
            </div>
          )}
        </div>
      </div>

      {isCorrect && isSelected && (
        <span style={{ fontSize: "12px", color: "#2ea043", fontWeight: "bold", marginLeft: "auto" }}>
          ✓ Você acertou
        </span>
      )}
      {isSelected && !isCorrect && (
        <span style={{ fontSize: "12px", color: "#cb2431", fontWeight: "bold", marginLeft: "auto" }}>
          ✗ Você marcou
        </span>
      )}
    </div>
  );
}
