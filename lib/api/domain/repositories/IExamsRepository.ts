import { CreateExamPayload } from "@/lib/api/domain/types/dto/CreateExamPayload";
import { Exam } from "@/lib/api/domain/types/entities/Exam";
import { Question } from "@/lib/api/domain/types/entities/Question";
import { Alternative } from "@/lib/api/domain/types/entities/Alternative";
import { QuestionImage } from "@/lib/api/domain/types/entities/QuestionImages";
import { QuestionOnExam } from "@/lib/api/domain/types/entities/QuestionOnExam";
import { ExamArea } from "@/lib/api/domain/types/entities/ExamArea";
import { GetUserExamsRepositoryResponse } from "@/lib/api/domain/types/dto/GetUserExamsRepositoryResponse";
import { AnswerPayload } from "@/lib/api/domain/types/AnswerPayload";

export interface IExamsRepository {
  createExam(examPayload: CreateExamPayload, userId: string): Promise<[Exam, Question[], Alternative[]]>;
  getExam(id: string): Promise<Exam | null>;
  getUserExams(userId: string, page: number, limit: number): Promise<GetUserExamsRepositoryResponse[]>;
  getExamQuestions(examId: string): Promise<[Question[], QuestionImage[]]>;
  getExamQuestionsResults(examId: string): Promise<QuestionOnExam[]>;
  getExamAreas(examId: string): Promise<ExamArea[]>;
  submitExam(examId: string, userId: string, answer: AnswerPayload[]): Promise<number>;
  deleteExam(examId: string, userId: string): Promise<boolean>;
}
