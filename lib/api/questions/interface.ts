import { Prisma } from "@/lib/prisma/prisma/client";

export interface IQuestionsRepository {
  getRandomQuestions(amount: number, area: string): Promise<Prisma.QuestionsModel[]>;
  linkQuestionsToExam(examId: string, questions: Prisma.QuestionsModel[]): Promise<Prisma.QuestionsOnExamsModel[]>;
  getQuestionAlternatives(questionId: string): Promise<Prisma.AlternativesModel[]>;
  getMultipleQuestionsAlternatives(questionId: string[]): Promise<Prisma.AlternativesModel[]>;
}
