import { QuestionDTO, QuestionResultDTO } from "./QuestionDTO";

export interface ExamDTO {
  id: string;
  title: string;
  areas: string[];
  date: Date;
  userId: string;
  questions: QuestionDTO[];
}

export interface ExamResultsDTO extends Omit<ExamDTO, "questions"> {
  questions: QuestionResultDTO[];
}
