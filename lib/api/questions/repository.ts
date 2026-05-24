import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";
import { IQuestionsRepository } from "./interface";

export default class QuestionsRepository implements IQuestionsRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getRandomQuestions(amount: number, area: string, language: string | null): Promise<Prisma.QuestionsModel[]> {
    const shuffledIds = await this.getAllIds(amount, area, language);

    return this.prisma.questions.findMany({
      where: {
        id: { in: shuffledIds },
      },
    });
  }

  private async getAllIds(amount: number, area: string, language: string | null): Promise<string[]> {
    const allIds = await this.prisma.questions.findMany({
      where: { area: area, language: language },
      select: { id: true },
    });

    return allIds
      .map((item) => item.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, amount);
  }

  async linkQuestionsToExam(
    examId: string,
    questions: Prisma.QuestionsModel[],
  ): Promise<Prisma.QuestionsOnExamsModel[]> {
    const createPayload: Prisma.QuestionsOnExamsCreateManyInput[] = questions.map((question) => ({
      examId: examId,
      questionId: question.id,
    }));

    const [_, items] = await this.prisma.$transaction([
      this.prisma.questionsOnExams.createMany({ data: createPayload }),
      this.prisma.questionsOnExams.findMany({
        where: { examId: examId },
      }),
    ]);

    return items;
  }

  async getQuestionAlternatives(questionId: string): Promise<Prisma.AlternativesModel[]> {
    return this.prisma.alternatives.findMany({
      where: { questionId: questionId },
    });
  }

  async getMultipleQuestionsAlternatives(questionsId: string[]): Promise<Prisma.AlternativesModel[]> {
    return this.prisma.alternatives.findMany({
      where: { questionId: { in: questionsId } },
    });
  }
}
