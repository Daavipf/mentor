import { QuestionDTO } from "./QuestionDTO";

export type ExamDTO = {
  id: string;
  areas: string[];
  date: Date;
  userId: string;
  questions: QuestionDTO[];
};
