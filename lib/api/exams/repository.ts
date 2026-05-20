import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";
import { IQuestionsRepository } from "@/lib/api/questions/interface";
import { IExamsRepository } from "./interface";

export default class ExamsRepository implements IExamsRepository {
  prisma: PrismaClient;
  questionsRepository: IQuestionsRepository;

  constructor(prismaClient: PrismaClient, questionsRepository: IQuestionsRepository) {
    this.prisma = prismaClient;
    this.questionsRepository = questionsRepository;
  }

  async createExam(
    questionsAmount: number,
    userId: string,
    area: string,
  ): Promise<[Prisma.ExamsModel, Prisma.QuestionsModel[], Prisma.AlternativesModel[]]> {
    try {
      const exam = await this.prisma.exams.create({
        data: {
          area: area,
          userId: userId,
          date: new Date(),
        },
      });

      const questions: Prisma.QuestionsModel[] = await this.questionsRepository.getRandomQuestions(
        questionsAmount,
        area,
      );

      await this.questionsRepository.linkQuestionsToExam(exam.id, questions);

      const qIds = questions.map((q) => q.id);
      const alternatives = await this.questionsRepository.getMultipleQuestionsAlternatives(qIds);

      return [exam, questions, alternatives];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
