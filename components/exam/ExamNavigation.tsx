"use client";

interface ExamNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onNavigate: (index: number) => void;
}

export default function ExamNavigation({ currentIndex, totalQuestions, onNavigate }: ExamNavigationProps) {
  const handlePrev = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) onNavigate(currentIndex + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        padding: "10px",
        backgroundColor: "#eef2f5",
        borderRadius: "8px",
      }}
    >
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        style={{
          padding: "8px 16px",
          cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          opacity: currentIndex === 0 ? 0.5 : 1,
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        &larr; Anterior
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <label htmlFor="question-select" style={{ fontWeight: "bold" }}>
          Navegar:
        </label>
        <select
          id="question-select"
          value={currentIndex}
          onChange={(e) => onNavigate(Number(e.target.value))}
          style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <option key={index} value={index}>
              Questão {index + 1} de {totalQuestions}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleNext}
        disabled={currentIndex === totalQuestions - 1}
        style={{
          padding: "8px 16px",
          cursor: currentIndex === totalQuestions - 1 ? "not-allowed" : "pointer",
          opacity: currentIndex === totalQuestions - 1 ? 0.5 : 1,
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        Próxima &rarr;
      </button>
    </div>
  );
}
