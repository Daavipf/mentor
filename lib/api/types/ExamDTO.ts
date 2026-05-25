import { QuestionDTO, QuestionResultDTO } from "./QuestionDTO";

export type ExamDTO = {
  id: string;
  areas: string[];
  date: Date;
  userId: string;
  questions: QuestionDTO[];
};

export interface ExamResultsDTO extends Omit<ExamDTO, 'questions'>{
  questions: QuestionResultDTO[]
}