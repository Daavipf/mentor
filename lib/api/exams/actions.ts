// app/exams/actions.ts
"use server";

import { cookies } from "next/headers";
import { examsService } from "../main";
import { verifyJwt } from "../auth/util";
import { redirect } from "next/navigation";
import { AnswerPayload } from "../types/AnswerPayload";
import { revalidatePath } from "next/cache";
import { CreateExamPayload } from "@/lib/api/types/CreateExamPayload";

export async function generateExamAction(requests: CreateExamPayload) {
  let examId: string;

  try {
    const userId = await authenticateSession();

    const examDto = await examsService.createExam(requests, userId);
    examId = examDto.id;
    console.log("Prova criada com sucesso!", examDto.id);
  } catch (error: any) {
    console.error("Erro ao gerar prova:", error);
    return { success: false, error: error.message || "Falha ao gerar a prova." };
  }

  redirect(`/dashboard/exams/${examId}`);
}

export async function submitExamAction(examId: string, answers: AnswerPayload[]) {
  try {
    const userId = await authenticateSession();

    const score = await examsService.submitExam(examId, userId, answers);
  } catch (error: any) {
    console.error("Erro ao gerar prova:", error);
    return { success: false, error: error.message || "Falha ao gerar a prova." };
  }

  redirect(`/dashboard/exams/result/${examId}`);
}

export async function deleteExamAction(examId: string) {
  try {
    const userId = await authenticateSession();

    const success = await examsService.deleteExam(examId, userId);

    if (success) {
      revalidatePath("/dashboard/exams");
      return { success: true };
    } else {
      return { success: false, error: "Falha ao deletar a prova." };
    }
  } catch (error: any) {
    console.error("Erro ao deletar prova:", error);
    return { success: false, error: error.message || "Erro interno ao deletar a prova." };
  }
}

async function authenticateSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado. Nenhum token encontrado.");
  }

  const payload = verifyJwt(token);

  if (!payload || !payload.userId) {
    throw new Error("Sessão inválida ou expirada. Faça login novamente.");
  }

  return payload.userId;
}
