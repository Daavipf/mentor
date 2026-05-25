// app/exams/actions.ts
"use server";

import { cookies } from "next/headers";
import { examsService } from "../main";
import { verifyJwt } from "../auth/util";
import { redirect } from "next/navigation";
import { AnswerPayload } from "../types/AnswerPayload";

export async function generateExamAction(requests: Record<string, number>) {
  let examId: string;

  try {
    const userId = await authenticateSession()
    
    const examDto = await examsService.createExam(requests, userId);
    examId = examDto.id
    console.log("Prova criada com sucesso!", examDto.id);
  } catch (error: any) {
    console.error("Erro ao gerar prova:", error);
    return { success: false, error: error.message || "Falha ao gerar a prova." };
  }

  redirect(`/dashboard/exams/${examId}`);
}

export async function submitExamAction(examId: string, answers: AnswerPayload[]){
  try {
    const userId = await authenticateSession()

    const score = await examsService.submitExam(examId, userId, answers)
  } catch (error: any) {
    console.error("Erro ao gerar prova:", error);
    return { success: false, error: error.message || "Falha ao gerar a prova." };
  }

  redirect(`/dashboard/exams/result/${examId}`)
}

async function authenticateSession(){
const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado. Nenhum token encontrado.")
  }

  const payload = verifyJwt(token);

  if (!payload || !payload.userId) {
    throw new Error("Sessão inválida ou expirada. Faça login novamente.")
  }

  return payload.userId
}