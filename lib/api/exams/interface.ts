import { Prisma } from "@/lib/prisma/prisma/client";
import { ExamDTO } from "../types/ExamDTO";

export interface IExamsRepository {
  createExam(
    questionsAmount: number,
    userId: string,
    area: string,
  ): Promise<[Prisma.ExamsModel, Prisma.QuestionsModel[], Prisma.AlternativesModel[]]>;
}

export interface IExamsService {
  createExam(questionsAmount: number, userId: string, area: string): Promise<ExamDTO>;
}
