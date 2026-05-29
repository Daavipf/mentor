import { Prisma } from "@/lib/prisma/prisma/client";
import { ExamDTO } from "@/lib/api/types/ExamDTO";
import { AnswerPayload } from "@/lib/api/types/AnswerPayload";
import { ExamCardDTO } from "@/lib/api/types/ExamCardDTO";
import { CreateExamPayload } from "@/lib/api/types/CreateExamPayload";
import { GetUserExamsRepositoryResponse } from "@/lib/api/types/GetUserExamsRepositoryResponse";

export interface IExamsRepository {
  createExam(
    examPayload: CreateExamPayload,
    userId: string,
  ): Promise<[Prisma.ExamsModel, Prisma.QuestionsModel[], Prisma.AlternativesModel[]]>;
  getExam(id: string): Promise<Prisma.ExamsModel | null>;
  //getUserExams(userId: string): Promise<Prisma.ExamsModel[]>;
  getUserExams(userId: string, page: number, limit: number): Promise<GetUserExamsRepositoryResponse[]>;
  getExamQuestions(examId: string): Promise<Prisma.QuestionsModel[]>;
  getExamQuestionsResults(examId: string): Promise<Prisma.QuestionsOnExamsModel[]>;
  getExamAreas(examId: string): Promise<Prisma.ExamAreasModel[]>;
  //markQuestion(examId: string, questionId: string, alternativeId: string): Promise<Prisma.QuestionsModel | null>;
  submitExam(examId: string, userId: string, answer: AnswerPayload[]): Promise<number>;
  deleteExam(examId: string, userId: string): Promise<boolean>;
}

export interface IExamsService {
  createExam(examPayload: CreateExamPayload, userId: string): Promise<ExamDTO>;
  getExam(id: string): Promise<ExamDTO>;
  getExamResults(examId: string): Promise<[ExamDTO, Prisma.QuestionsOnExamsModel[]]>;
  //getUserExams(userId: string): Promise<Prisma.ExamsModel[]>;
  getUserExams(userId: string, page: number, limit: number): Promise<ExamCardDTO[]>;
  isExamComplete(examId: string): Promise<boolean>;
  submitExam(examId: string, userId: string, answer: AnswerPayload[]): Promise<number>;
  deleteExam(examId: string, userId: string): Promise<boolean>;
}
