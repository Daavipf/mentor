// app/exams/actions.ts
"use server";

import { cookies } from "next/headers";
import { examsService } from "../main";
import { verifyJwt } from "../auth/util";
import { redirect } from "next/navigation";
import { ExamDTO } from "../types/ExamDTO";

export async function generateExamAction(requests: Record<string, number>) {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado. Nenhum token encontrado." };
  }

  const payload = verifyJwt(token);

  if (!payload || !payload.userId) {
    return { success: false, error: "Sessão inválida ou expirada. Faça login novamente." };
  }

  const userId = payload.userId;
  let examDto: ExamDTO;

  try {
    examDto = await examsService.createExam(requests, userId);
    console.log("Prova criada com sucesso!", examDto.id);
  } catch (error) {
    console.error("Erro ao gerar prova:", error);
    return { success: false, error: "Falha ao gerar a prova." };
  }

  redirect(`/dashboard/exams/${examDto.id}`);
}
