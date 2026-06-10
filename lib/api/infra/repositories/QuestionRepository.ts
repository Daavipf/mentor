import { IQuestionsRepository } from "@/lib/api/domain/repositories/IQuestionsRepository";
import { Alternative } from "@/lib/api/domain/types/entities/Alternative";
import { Question } from "@/lib/api/domain/types/entities/Question";
import { QuestionOnExam } from "@/lib/api/domain/types/entities/QuestionOnExam";

import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";

export default class QuestionsRepository implements IQuestionsRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getRandomQuestions(
    amount: number,
    area: string,
    year: number | null,
    language: string | null,
  ): Promise<Question[]> {
    const shuffledIds = await this.getAllIds(amount, area, language, year);

    const questions = await this.prisma.questions.findMany({
      where: {
        id: { in: shuffledIds },
      },
    });

    return questions.map((q) => ({
      id: q.id,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt,
      index: q.index,
      title: q.title,
      area: q.area,
      alternativesIntroduction: q.alternativesIntroduction,
      language: q.language,
      context: q.context,
      year: q.year,
      //files: [],
      topics: [],
      discipline: q.discipline,
    }));
  }

  private async getAllIds(
    amount: number,
    area: string,
    language: string | null,
    year: number | null,
  ): Promise<string[]> {
    let allIds;

    if (year) {
      allIds = await this.prisma.questions.findMany({
        where: { area: area, language: language, year: year },
        select: { id: true },
      });
    } else {
      allIds = await this.prisma.questions.findMany({
        where: { area: area, language: language },
        select: { id: true },
      });
    }

    return allIds
      .map((item) => item.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, amount);
  }

  async linkQuestionsToExam(examId: string, questions: Question[]): Promise<QuestionOnExam[]> {
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

    return items.map((i) => ({
      id: `${i.examId}_${i.questionId}`,
      examId: i.examId,
      questionId: i.questionId,
      userSelectedAlternative: i.selectedAlternativeId,
      gotRight: i.gotRight,
      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
    }));
  }

  async getQuestionAlternatives(questionId: string): Promise<Alternative[]> {
    const alternatives = await this.prisma.alternatives.findMany({
      where: { questionId: questionId },
    });

    return alternatives.map((a) => ({
      id: a.id,
      file: a.imagePath,
      isCorrect: a.isCorrect,
      text: a.text,
      questionId: a.questionId,
    }));
  }

  async getMultipleQuestionsAlternatives(questionsId: string[]): Promise<Alternative[]> {
    const alternatives = await this.prisma.alternatives.findMany({
      where: { questionId: { in: questionsId } },
    });

    return alternatives.map((a) => ({
      id: a.id,
      file: a.imagePath,
      isCorrect: a.isCorrect,
      text: a.text,
      questionId: a.questionId,
    }));
  }
}
