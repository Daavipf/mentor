import { Prisma } from "@/lib/prisma/prisma/client";
import { ExamDTO } from "../types/ExamDTO";
import { AnswerPayload } from "../types/AnswerPayload";

export interface IExamsRepository {
  createExam(
    examPayload: Record<string, number>,
    userId: string,
  ): Promise<[Prisma.ExamsModel, Prisma.QuestionsModel[], Prisma.AlternativesModel[]]>;
  getExam(id: string): Promise<Prisma.ExamsModel | null>;
  getUserExams(userId: string): Promise<Prisma.ExamsModel[]>;
  getExamQuestions(examId: string): Promise<Prisma.QuestionsModel[]>;
  getExamAreas(examId: string): Promise<Prisma.ExamAreasModel[]>;
  markQuestion(examId: string, questionId: string, alternativeId: string): Promise<Prisma.QuestionsModel | null>;
  submitExam(examId: string, userId: string, answer: AnswerPayload[]): Promise<number>;
}

export interface IExamsService {
  createExam(examPayload: Record<string, number>, userId: string): Promise<ExamDTO>;
  getExam(id: string): Promise<ExamDTO>;
  getUserExams(userId: string): Promise<Prisma.ExamsModel[]>;
  submitExam(examId: string, userId: string, answer: AnswerPayload[]): Promise<number>;
}
