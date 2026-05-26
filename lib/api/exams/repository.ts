import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";
import { IQuestionsRepository } from "@/lib/api/questions/interface";
import { IExamsRepository } from "./interface";
import { AnswerPayload } from "@/lib/api/types/AnswerPayload";

export default class ExamsRepository implements IExamsRepository {
  prisma: PrismaClient;
  questionsRepository: IQuestionsRepository;

  constructor(prismaClient: PrismaClient, questionsRepository: IQuestionsRepository) {
    this.prisma = prismaClient;
    this.questionsRepository = questionsRepository;
  }

  async createExam(
    examPayload: Record<string, number>,
    userId: string,
  ): Promise<[Prisma.ExamsModel, Prisma.QuestionsModel[], Prisma.AlternativesModel[]]> {
    const selectedAreasCreateInput = Object.entries(examPayload).map(([area, _]) => ({
      area: area,
    }));

    try {
      const exam = await this.prisma.exams.create({
        data: {
          userId: userId,
          date: new Date(),
          areas: {
            createMany: {
              data: selectedAreasCreateInput,
            },
          },
        },
      });

      const completePayload = this.mapQuestionAreaName(examPayload);
      const questionsPromises = completePayload.map(({ area, language, amount }) =>
        this.questionsRepository.getRandomQuestions(amount, area, language),
      );

      const nestedQuestions = await Promise.all(questionsPromises);
      const questions: Prisma.QuestionsModel[] = nestedQuestions.flat();

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

  async getExam(id: string): Promise<Prisma.ExamsModel | null> {
    try {
      const exam = await this.prisma.exams.findFirst({ where: { id } });

      return exam;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getUserExams(userId: string): Promise<Prisma.ExamsModel[]> {
    try {
      const exams = await this.prisma.exams.findMany({ where: { userId } });

      return exams;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getExamAreas(examId: string): Promise<Prisma.ExamAreasModel[]> {
    try {
      const areas = await this.prisma.examAreas.findMany({ where: { examsId: examId } });

      return areas;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getExamQuestions(examId: string): Promise<Prisma.QuestionsModel[]> {
    try {
      const questionsOnExam = await this.prisma.questionsOnExams.findMany({
        where: { examId },
      });

      const questions = await this.prisma.questions.findMany({
        where: { id: { in: questionsOnExam.map((q) => q.questionId) } },
      });

      return questions;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  // async getExamQuestionsResults(examId: string): Promise<Prisma.QuestionsOnExamsModel[]> {
  //   try {
  //     const questionsOnExam = await this.prisma.questionsOnExams.findMany({
  //       where: { examId },
  //     });

  //     return questionsOnExam;
  //   } catch (error: any) {
  //     console.error(error);
  //     throw new Error(error.message);
  //   }
  // }

  async markQuestion(examId: string, questionId: string, alternativeId: string): Promise<Prisma.QuestionsModel | null> {
    try {
      await this.prisma.questionsOnExams.update({
        where: { questionId_examId: { questionId: questionId, examId: examId } },
        data: { selectedAlternativeId: alternativeId },
      });

      return await this.prisma.questions.findFirst({ where: { id: questionId } });
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
