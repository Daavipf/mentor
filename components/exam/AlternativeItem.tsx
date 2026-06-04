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
      className={`flex gap-3 items-start p-4 rounded-lg border cursor-pointer transition-all duration-200 ease-in-out ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20"
          : "border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      }`}
    >
      <input
        type="radio"
        name={`question-${alternative.id}`}
        checked={isSelected}
        onChange={onSelect}
        className="mt-1 cursor-pointer w-4 h-4 accent-blue-600 dark:accent-blue-500 shrink-0"
      />

      <div className="flex gap-2 flex-1">
        <strong
          className={`transition-colors duration-200 ${
            isSelected ? "text-blue-600 dark:text-blue-400" : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          {letter})
        </strong>

        <div className="flex flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          {alternative.text && <span>{alternative.text}</span>}

          {alternative.file && (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={alternative.file}
                alt={`Alternativa ${letter}`}
                className="w-20 h-20 object-contain rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </label>
  );
}
