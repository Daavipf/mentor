import { Prisma } from "@/lib/prisma/prisma/client";
import { AnswerPayload } from "@/lib/api/types/AnswerPayload";
import { ExamDTO } from "@/lib/api/types/ExamDTO";
import { QuestionDTO } from "@/lib/api/types/QuestionDTO";
import { IExamsRepository, IExamsService } from "./interface";
import { IQuestionsRepository } from "@/lib/api/questions/interface";
import { IHistoryRepository } from "@/lib/api/history/interface";

export default class ExamsService implements IExamsService {
  examsRepository: IExamsRepository;
  questionsRepository: IQuestionsRepository;
  historyRepository: IHistoryRepository;

  constructor(
    examsRepository: IExamsRepository,
    questionsRepository: IQuestionsRepository,
    historyRepository: IHistoryRepository,
  ) {
    this.examsRepository = examsRepository;
    this.questionsRepository = questionsRepository;
    this.historyRepository = historyRepository;
  }

  async createExam(examPayload: Record<string, number>, userId: string): Promise<ExamDTO> {
    const [exam, questions, alternatives] = await this.examsRepository.createExam(examPayload, userId);
    const examAreas = Object.entries(examPayload).map(([area, _]) => area);

    const questionsDTO: QuestionDTO[] = this.mapQuestionsToDTO(questions, alternatives);

    return {
      id: exam.id,
      areas: examAreas,
      date: exam.date,
      questions: questionsDTO,
      userId,
    };
  }

  async getUserExams(userId: string): Promise<Prisma.ExamsModel[]> {
    const exams = await this.examsRepository.getUserExams(userId);

    return exams;
  }

  async getExam(id: string): Promise<ExamDTO> {
    const exam = await this.examsRepository.getExam(id);
    if (!exam) throw new Error("Prova não encontada");

    const questions = await this.examsRepository.getExamQuestions(exam.id);
    const questionsIds = questions.map((q) => q.id);
    const alternatives = await this.questionsRepository.getMultipleQuestionsAlternatives(questionsIds);
    const examAreas = await this.examsRepository.getExamAreas(exam.id);
    const questionsDTO: QuestionDTO[] = this.mapQuestionsToDTO(questions, alternatives);

    return {
      id: exam.id,
      areas: examAreas.map((a) => a.area),
      date: exam.date,
      questions: questionsDTO,
      userId: exam.userId,
    };
  }

  async getExamResults(id: string): Promise<[ExamDTO, Prisma.QuestionsOnExamsModel[]]> {
    const exam = await this.examsRepository.getExam(id);
    if (!exam) throw new Error("Prova não encontada");

    const questions = await this.examsRepository.getExamQuestions(exam.id);
    const questionsIds = questions.map((q) => q.id);
    const alternatives = await this.questionsRepository.getMultipleQuestionsAlternatives(questionsIds);
    const examAreas = await this.examsRepository.getExamAreas(exam.id);
    const questionsDTO: QuestionDTO[] = this.mapQuestionsToDTO(questions, alternatives, true);

    const userSelectedAlternatives = await this.examsRepository.getExamQuestionsResults(exam.id);

    return [
      {
        id: exam.id,
        areas: examAreas.map((a) => a.area),
        date: exam.date,
        questions: questionsDTO,
        userId: exam.userId,
      },
      userSelectedAlternatives,
    ];
  }

  async isExamComplete(examId: string): Promise<boolean> {
    try {
      const examHistory = await this.historyRepository.getExamHistory(examId);
      if (!examHistory) return false;

      return examHistory.finishedAt < new Date();
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async submitExam(examId: string, userId: string, answer: AnswerPayload[]): Promise<number> {
    try {
      const isComplete = await this.isExamComplete(examId);
      if (isComplete) throw new Error("A prova já foi resolvida");

      const score = await this.examsRepository.submitExam(examId, userId, answer);
      return score;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  private mapQuestionsToDTO(
    questions: Prisma.QuestionsModel[],
    alternatives: Prisma.AlternativesModel[],
    includeResults: boolean = false,
  ): QuestionDTO[] {
    return questions.map((q) => {
      const qAlternatives = alternatives.filter((a) => a.questionId === q.id);

      return {
        id: q.id,
        area: q.area,
        alternativesIntroduction: q.alternativesIntroduction,
        year: q.year,
        context: q.context,
        index: q.index,
        language: q.language,
        title: q.title,
        alternatives: qAlternatives.map((alt) => {
          const baseAlternative: any = {
            id: alt.id,
            text: alt.text,
            file: alt.imagePath,
          };

          if (includeResults) {
            baseAlternative.isCorrect = alt.isCorrect;
          }

          return baseAlternative;
        }),
      };
    });
  }

  async deleteExam(examId: string, userId: string): Promise<boolean> {
    try {
      return this.examsRepository.deleteExam(examId, userId);
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
