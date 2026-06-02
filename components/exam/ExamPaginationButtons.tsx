"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

interface ExamPaginationButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  onNavigate: (index: number) => void;
  handleSubmit?: () => void;
  isSubmitting?: boolean;
  canSubmit?: boolean;
}

export default function ExamPaginationButtons({
  currentIndex,
  totalQuestions,
  isSubmitting = false,
  onNavigate,
  handleSubmit,
  canSubmit,
}: ExamPaginationButtonsProps) {
  const handlePrev = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) onNavigate(currentIndex + 1);
  };

  return (
    <div className="flex items-center justify-between w-full py-4">
      <Button size="lg" variant="outline" onClick={handlePrev} disabled={currentIndex === 0 || isSubmitting}>
        &larr; Anterior
      </Button>

      {canSubmit && currentIndex === totalQuestions - 1 && (
        <Button size="lg" variant="default" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner />
              Finalizando...
            </>
          ) : (
            "Finalizar e Enviar"
          )}
        </Button>
      )}

      {currentIndex < totalQuestions - 1 && (
        <Button
          size="lg"
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1 || isSubmitting}
        >
          Próxima &rarr;
        </Button>
      )}
    </div>
  );
}
