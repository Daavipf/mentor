"use client";

import { ExamDTO } from "@/lib/api/types/ExamDTO";
import { cn } from "@/lib/utils";

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

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 border rounded-md transition-colors",
        // Estado: Correta
        isCorrect &&
          "bg-emerald-100 border-emerald-500 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-600 dark:text-emerald-200",
        // Estado: Incorreta, mas selecionada pelo usuário
        isSelected &&
          !isCorrect &&
          "bg-red-100 border-red-500 text-red-900 dark:bg-red-950/30 dark:border-red-600 dark:text-red-200",
        // Estado: Incorreta e não selecionada (Padrão)
        !isCorrect &&
          !isSelected &&
          "bg-zinc-50 border-zinc-200 text-zinc-800 opacity-70 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300",
      )}
    >
      <input type="radio" checked={isSelected} readOnly disabled className="mt-1 cursor-not-allowed" />

      <div className="flex flex-1 gap-2">
        <strong
          className={cn(
            isCorrect && "text-emerald-600 dark:text-emerald-500",
            isSelected && !isCorrect && "text-red-600 dark:text-red-500",
            !isCorrect && !isSelected && "text-zinc-500 dark:text-zinc-400",
          )}
        >
          {letter})
        </strong>

        <div className="flex flex-col gap-2">
          {alternative.text && <span>{alternative.text}</span>}

          {alternative.file && (
            <div>
              <img src={alternative.file} alt={`Alternativa ${letter}`} className="w-full object-contain rounded-md" />
            </div>
          )}
        </div>
      </div>

      {isCorrect && isSelected && (
        <span className="ml-auto whitespace-nowrap text-xs font-bold text-emerald-600 dark:text-emerald-500">
          ✓ Você acertou
        </span>
      )}

      {isSelected && !isCorrect && (
        <span className="ml-auto whitespace-nowrap text-xs font-bold text-red-600 dark:text-red-500">
          ✗ Você marcou
        </span>
      )}
    </div>
  );
}
