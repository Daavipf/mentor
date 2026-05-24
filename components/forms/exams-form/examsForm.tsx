"use client";

import { useState } from "react";
import { generateExamAction } from "@/lib/api/exams/actions";
import { toast } from "sonner";

const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 45;

// 1. Defina suas áreas de conhecimento pré-definidas aqui
const PREDEFINED_AREAS = [
  "Matemática",
  "Linguagens",
  "Língua Estrangeira (Inglês)",
  "Língua Estrangeira (Espanhol)",
  "Ciências Humanas",
  "Ciências da Natureza",
];

export default function ExamsForm() {
  const [areaInput, setAreaInput] = useState("");
  const [amountInput, setAmountInput] = useState<number>(MIN_QUESTIONS);

  const [requests, setRequests] = useState<Record<string, number>>({});

  // 2. Filtra as áreas disponíveis: só mantém as que NÃO estão no objeto requests
  const availableAreas = PREDEFINED_AREAS.filter((area) => !Object.keys(requests).includes(area));

  const handleAddRequest = () => {
    if (!areaInput || amountInput <= 0) {
      toast.warning("Selecione uma área de conhecimento válida");
      return;
    }

    setRequests((prev) => ({
      ...prev,
      [areaInput]: amountInput, // Como a área some do select, não precisamos mais somar, apenas atribuir
    }));

    // Reseta os inputs para o estado inicial
    setAreaInput("");
    setAmountInput(MIN_QUESTIONS);
  };

  const handleRemoveRequest = (areaToRemove: string) => {
    setRequests((prev) => {
      const newRequests = { ...prev };
      delete newRequests[areaToRemove];
      return newRequests;
    });
  };

  const handleSubmit = async (formData: FormData) => {
    if (Object.keys(requests).length === 0) {
      toast.warning("Adicione pelo menos uma área antes de gerar a prova.");
      return;
    }

    // Chama a Server Action
    await generateExamAction(requests);
  };

  return (
    <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* 3. Input substituído pelo Select */}
        <select
          value={areaInput}
          onChange={(e) => setAreaInput(e.target.value)}
          disabled={availableAreas.length === 0} // Desabilita se acabarem as opções
        >
          <option value="" disabled>
            {availableAreas.length > 0 ? "Selecione uma área..." : "Nenhuma área disponível"}
          </option>

          {availableAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={MIN_QUESTIONS}
          max={MAX_QUESTIONS}
          value={amountInput}
          onChange={(e) => setAmountInput(Number(e.target.value))}
          disabled={availableAreas.length === 0} // Opcional: trava o número se não houver área
        />
        <button type="button" onClick={handleAddRequest} disabled={availableAreas.length === 0 || !areaInput}>
          Adicionar à prova
        </button>
      </div>

      {/* Lista de Tarefas / Áreas Solicitadas */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(requests).map(([area, amount]) => (
          <li
            key={area}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              padding: "8px",
              border: "1px solid #ccc",
            }}
          >
            <span>
              <strong>{area}</strong>: {amount} questões
            </span>
            <button type="button" onClick={() => handleRemoveRequest(area)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      {/* Submit final */}
      <button type="submit" disabled={Object.keys(requests).length === 0}>
        Gerar Prova
      </button>
    </form>
  );
}
