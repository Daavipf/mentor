"use client";

import { ExamDTO } from "@/lib/api/types/ExamDTO";
import ResultAlternativeItem from "./ResultAlternativeItem";
import { Prisma } from "@/lib/prisma/prisma/client";
import { Badge } from "@/components/ui/badge";

type Question = NonNullable<ExamDTO["questions"]>[number];

interface ResultQuestionDisplayProps {
  question: Question;
  userAnswer?: Prisma.QuestionsOnExamsModel;
}

export default function ResultQuestionDisplay({ question, userAnswer }: ResultQuestionDisplayProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Questão {question.index}</h3>

        <Badge variant="secondary">
          {question.area} {question.language && `(${question.language})`} • {question.year}
        </Badge>
      </div>

      {question.context && (
        <p className="whitespace-pre-wrap text-justify mb-6 leading-relaxed text-zinc-800 dark:text-zinc-200">
          {question.context}
        </p>
      )}

      {question.files && question.files.map((i) => <img key={i} src={i} />)}

      {question.alternativesIntroduction && (
        <p className="font-semibold mb-6 text-zinc-900 dark:text-zinc-100">{question.alternativesIntroduction}</p>
      )}

      {userAnswer?.selectedAlternativeId === null && (
        <div className="p-4 mb-6 flex items-center gap-2 rounded-md bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-500 dark:border-amber-900">
          <span className="text-xl">⚠️</span>
          <span className="font-medium">Você deixou esta questão em branco.</span>
        </div>
      )}

      {question.alternatives && (
        <div className="flex flex-col gap-3 mt-4">
          {question.alternatives.map((alt, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = userAnswer?.selectedAlternativeId === alt.id;

            return <ResultAlternativeItem key={alt.id} alternative={alt} letter={letter} isSelected={isSelected} />;
          })}
        </div>
      )}
    </div>
  );
}
