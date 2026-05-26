"use client";

import { ExamDTO } from "@/lib/api/types/ExamDTO";

type Alternative = NonNullable<NonNullable<ExamDTO["questions"]>[number]["alternatives"]>[number];

interface AlternativeItemProps {
  alternative: Alternative;
  letter: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function AlternativeItem({ alternative, letter, isSelected, onSelect }: AlternativeItemProps) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px",
        backgroundColor: isSelected ? "#e6f7ff" : "#fafafa",
        border: `1px solid ${isSelected ? "#1890ff" : "#ddd"}`,
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <input
        type="radio"
        name={`question-${alternative.id}`} // O name garante comportamento de radio no HTML, mas o controle é via React
        checked={isSelected}
        onChange={onSelect}
        style={{ marginTop: "4px", cursor: "pointer" }}
      />

      <div style={{ display: "flex", gap: "8px", flex: 1 }}>
        <strong style={{ color: isSelected ? "#1890ff" : "#333" }}>{letter})</strong>

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
    </label>
  );
}
