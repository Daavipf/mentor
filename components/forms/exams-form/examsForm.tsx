"use client";

import { useState } from "react";
import { generateExamAction } from "@/lib/api/exams/actions";
import { CreateExamPayload } from "@/lib/api/types/CreateExamPayload";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AreaSelect from "./areaSelect";
import SelectedAreaItem from "./selectedAreaItem";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import StateButton from "@/components/buttons/StateButton";
import { Spinner } from "@/components/ui/spinner";

const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 45;
const MIN_YEAR = 2009;
const MAX_YEAR = 2023;

const PREDEFINED_AREAS = [
  "Matemática",
  "Linguagens",
  "Língua Estrangeira (Inglês)",
  "Língua Estrangeira (Espanhol)",
  "Ciências Humanas",
  "Ciências da Natureza",
];

export default function ExamsForm() {
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<number | "">("");

  const [areas, setAreas] = useState<Record<string, number>>({});

  const [areaInput, setAreaInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<number>(MIN_QUESTIONS);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const availableAreas = PREDEFINED_AREAS.filter((area) => !Object.keys(areas).includes(area));

  const handleAddRequest = () => {
    if (!areaInput || amountInput <= 0) {
      toast.warning("Selecione uma área de conhecimento válida");
      return;
    }

    setAreas((prev) => ({
      ...prev,
      [areaInput]: amountInput,
    }));

    setAreaInput("");
    setAmountInput(MIN_QUESTIONS);
  };

  const handleRemoveRequest = (areaToRemove: string) => {
    setAreas((prev) => {
      const newAreas = { ...prev };
      delete newAreas[areaToRemove];
      return newAreas;
    });
  };

  const handleSubmit = async (formData: FormData) => {
    if (!title.trim()) {
      toast.warning("O título da prova é obrigatório.");
      return;
    }

    if (Object.keys(areas).length === 0) {
      toast.warning("Adicione pelo menos uma área antes de gerar a prova.");
      return;
    }

    try {
      const payload: CreateExamPayload = {
        title: title.trim(),
        year: year === "" ? null : Number(year),
        areas: areas,
      };

      await generateExamAction(payload);
    } catch (error) {
      if (isRedirectError(error)) throw error;

      console.log(error);
      toast.error("Ocorreu um erro ao gerar a prova.");
    }
  };

  return (
    <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Input
          type="text"
          placeholder="Título da Prova"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <Input
          type="number"
          placeholder="Ano (Opcional)"
          value={year}
          min={MIN_YEAR}
          max={MAX_YEAR}
          onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
          disabled={isSubmitting}
        />
      </div>

      <hr className="w-full border mt-2.5 mb-2.5" />

      <div className="flex gap-2.5 items-center">
        <AreaSelect areaInput={areaInput} setAreaInput={setAreaInput} availableAreas={availableAreas} />

        <Input
          type="number"
          min={MIN_QUESTIONS}
          max={MAX_QUESTIONS}
          value={amountInput}
          onChange={(e) => setAmountInput(Number(e.target.value))}
          disabled={availableAreas.length === 0 || isSubmitting}
        />
        <Button
          size="icon-lg"
          type="button"
          onClick={handleAddRequest}
          disabled={availableAreas.length === 0 || !areaInput || isSubmitting}
        >
          <Plus />
        </Button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(areas).map(([area, amount]) => (
          <li key={area}>
            <SelectedAreaItem area={area} amount={amount} handleRemoveRequest={handleRemoveRequest} />
          </li>
        ))}
      </ul>

      <StateButton
        size="lg"
        type="submit"
        title="Gerar Prova"
        alternative="Trabalhando..."
        disabled={isSubmitting || Object.keys(areas).length === 0 || !title.trim()}
      />
    </form>
  );
}
