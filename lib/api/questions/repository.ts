import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";
import { IQuestionsRepository } from "./interface";

export default class QuestionsRepository implements IQuestionsRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getRandomQuestions(amount: number, area: string): Promise<Prisma.QuestionsModel[]> {
    const shuffledIds = await this.getAllIds(amount, area);

    return this.prisma.questions.findMany({
      where: {
        id: { in: shuffledIds },
      },
    });
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
    let alternatives: Prisma.AlternativesModel[] = [];

    for (const questionId of questionsId) {
      const a = await this.prisma.alternatives.findMany({
        where: { questionId: questionId },
      });

      alternatives = [...alternatives, ...a];
    }

    return alternatives;
  }

  private async getAllIds(amount: number, area: string): Promise<string[]> {
    const allIds = await this.prisma.questions.findMany({
      where: { area: area },
      select: { id: true },
    });

    return allIds
      .map((item) => item.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, amount);
  }
}
