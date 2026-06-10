import { IQuestionsRepository } from "@/lib/api/domain/repositories/IQuestionsRepository";
import { IExamsRepository } from "@/lib/api/domain/repositories/IExamsRepository";
import { AnswerPayload } from "@/lib/api/domain/types/AnswerPayload";
import { CreateExamPayload } from "@/lib/api/domain/types/dto/CreateExamPayload";
import { GetUserExamsRepositoryResponse } from "@/lib/api/domain/types/dto/GetUserExamsRepositoryResponse";

import { Exam } from "@/lib/api/domain/types/entities/Exam";
import { Question } from "@/lib/api/domain/types/entities/Question";
import { Alternative } from "@/lib/api/domain/types/entities/Alternative";
import { ExamArea } from "@/lib/api/domain/types/entities/ExamArea";
import { QuestionImage } from "@/lib/api/domain/types/entities/QuestionImages";
import { QuestionOnExam } from "@/lib/api/domain/types/entities/QuestionOnExam";

import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";

export default class ExamsRepository implements IExamsRepository {
  prisma: PrismaClient;
  questionsRepository: IQuestionsRepository;

  constructor(prismaClient: PrismaClient, questionsRepository: IQuestionsRepository) {
    this.prisma = prismaClient;
    this.questionsRepository = questionsRepository;
  }

  async createExam(examPayload: CreateExamPayload, userId: string): Promise<[Exam, Question[], Alternative[]]> {
    const selectedAreasCreateInput = Object.entries(examPayload.areas).map(([area, _]) => ({
      area: area,
    }));

    try {
      const exam = await this.prisma.exams.create({
        data: {
          title: examPayload.title,
          userId: userId,
          date: new Date(),
          areas: {
            createMany: {
              data: selectedAreasCreateInput,
            },
          },
        },
      });

      const completePayload = this.mapQuestionAreaName(examPayload.areas);
      const questionsPromises = completePayload.map(({ area, language, amount }) =>
        this.questionsRepository.getRandomQuestions(amount, area, examPayload.year, language),
      );

      const nestedQuestions = await Promise.all(questionsPromises);
      const questions: Question[] = nestedQuestions.flat();

      await this.questionsRepository.linkQuestionsToExam(exam.id, questions);

      const qIds = questions.map((q) => q.id);
      const alternatives = await this.questionsRepository.getMultipleQuestionsAlternatives(qIds);

      return [exam, questions, alternatives];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  private mapQuestionAreaName(
    payload: Record<string, number>,
  ): { area: string; language: string | null; amount: number }[] {
    return Object.entries(payload).map(([area, amount]) => {
      switch (area) {
        case "Matemática":
          return { area: "matematica", language: null, amount };
        case "Linguagens":
          return { area: "linguagens", language: null, amount };
        case "Língua Estrangeira (Inglês)":
          return { area: "linguagens", language: "ingles", amount };
        case "Língua Estrangeira (Espanhol)":
          return { area: "linguagens", language: "espanhol", amount };
        case "Ciências Humanas":
          return { area: "ciencias-humanas", language: null, amount };
        case "Ciências da Natureza":
          return { area: "ciencias-natureza", language: null, amount };
        default:
          return { area: "matematica", language: null, amount };
      }
    });
  }

  async getExam(id: string): Promise<Exam | null> {
    try {
      const exam = await this.prisma.exams.findFirst({ where: { id } });

      return exam;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getUserExams(userId: string, page: number, limit: number): Promise<GetUserExamsRepositoryResponse[]> {
    try {
      const skip = (page - 1) * limit;
      const exams = await this.prisma.exams.findMany({
        where: { userId },
        take: limit,
        skip: skip,
        orderBy: { createdAt: "desc" },
        include: {
          areas: { select: { area: true } },
          questions: { select: { gotRight: true } },
          histories: { select: { finishedAt: true }, orderBy: { createdAt: "desc" }, take: 1 },
        },
      });

      return exams;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getExamAreas(examId: string): Promise<ExamArea[]> {
    try {
      const areas = await this.prisma.examAreas.findMany({ where: { examsId: examId } });

      return areas.map((a) => ({
        id: a.id,
        area: a.area,
        examId: a.examsId,
      }));
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getExamQuestions(examId: string): Promise<[Question[], QuestionImage[]]> {
    try {
      const questionsOnExam = await this.prisma.questionsOnExams.findMany({
        where: { examId },
      });

      const questions = await this.prisma.questions.findMany({
        where: { id: { in: questionsOnExam.map((q) => q.questionId) } },
      });

      const questionsImages = await this.prisma.questionImages.findMany({
        where: { questionId: { in: questionsOnExam.map((q) => q.questionId) } },
      });

      return [questions, questionsImages];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getExamQuestionsResults(examId: string): Promise<QuestionOnExam[]> {
    try {
      const questionsOnExam = await this.prisma.questionsOnExams.findMany({
        where: { examId },
      });

      return questionsOnExam.map((q) => ({
        examId: q.examId,
        questionId: q.questionId,
        gotRight: q.gotRight,
        id: `${q.examId}_${q.questionId}`,
        userSelectedAlternative: q.selectedAlternativeId,
      }));
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async submitExam(examId: string, userId: string, answers: AnswerPayload[]): Promise<number> {
    const selectedAlternativesIds = answers.map((answer) => answer.selectedAlternativeId);
    const alternativesFromDB = await this.prisma.alternatives.findMany({
      where: { id: { in: selectedAlternativesIds } },
      select: { id: true, isCorrect: true },
    });

    const altMap = new Map(alternativesFromDB.map((alt) => [alt.id, alt.isCorrect]));

    let score = 0;

    const updateOperations = answers.map((answer) => {
      const isCorrect = altMap.get(answer.selectedAlternativeId) || false;

      if (isCorrect) score++;

      return this.prisma.questionsOnExams.update({
        where: { questionId_examId: { questionId: answer.questionId, examId: examId } },
        data: {
          selectedAlternativeId: answer.selectedAlternativeId,
          gotRight: isCorrect,
        },
      });
    });

    const historyCreation = this.prisma.history.create({
      data: {
        userId: userId,
        examId: examId,
        score: score,
        finishedAt: new Date(),
      },
    });

    try {
      const result = await this.prisma.$transaction([...updateOperations, historyCreation]);
      return score;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async deleteExam(examId: string, userId: string): Promise<boolean> {
    try {
      const exam = await this.prisma.exams.findFirst({
        where: { id: examId },
      });

      if (!exam) throw new Error("Prova não encontrada");

      if (userId !== exam.userId) throw new Error("Operação não auorizada");

      const result = await this.prisma.exams.delete({ where: { id: examId } });

      return result !== null;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
