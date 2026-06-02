"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuestionSelectProps {
  currentIndex: number;
  totalQuestions: number;
  onNavigate: (index: number) => void;
}

export default function QuestionSelect({ currentIndex, totalQuestions, onNavigate }: QuestionSelectProps) {
  return (
    <div className="w-full py-4">
      <Select value={currentIndex.toString()} onValueChange={(value) => onNavigate(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a Questão" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <SelectItem key={index} value={index.toString()}>
                Questão {index + 1} de {totalQuestions}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
