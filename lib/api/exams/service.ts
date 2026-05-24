import { Prisma } from "@/lib/prisma/prisma/client";
import { AnswerPayload } from "../types/AnswerPayload";
import { ExamDTO } from "../types/ExamDTO";
import { QuestionDTO } from "../types/QuestionDTO";
import { IExamsRepository, IExamsService } from "./interface";
import { IQuestionsRepository } from "../questions/interface";

export default class ExamsService implements IExamsService {
  examsRepository: IExamsRepository;
  questionsRepository: IQuestionsRepository;

  constructor(examsRepository: IExamsRepository, questionsRepository: IQuestionsRepository) {
    this.examsRepository = examsRepository;
    this.questionsRepository = questionsRepository;
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

  async submitExam(examId: string, userId: string, answer: AnswerPayload[]): Promise<number> {
    return 0;
  }

  private mapQuestionsToDTO(
    questions: Prisma.QuestionsModel[],
    alternatives: Prisma.AlternativesModel[],
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
        alternatives: qAlternatives.map((alt) => ({
          id: alt.id,
          text: alt.text,
          file: alt.imagePath,
        })),
      };
    });
  }
}
