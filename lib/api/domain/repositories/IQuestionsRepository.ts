import { Question } from "@/lib/api/domain/types/entities/Question";
import { QuestionOnExam } from "@/lib/api/domain/types/entities/QuestionOnExam";
import { Alternative } from "@/lib/api/domain/types/entities/Alternative";

export interface IQuestionsRepository {
  getRandomQuestions(amount: number, area: string, year: number | null, language: string | null): Promise<Question[]>;
  linkQuestionsToExam(examId: string, questions: Question[]): Promise<QuestionOnExam[]>;
  getQuestionAlternatives(questionId: string): Promise<Alternative[]>;
  getMultipleQuestionsAlternatives(questionId: string[]): Promise<Alternative[]>;
}
