import { QuestionDTO } from "./QuestionDTO";

export type ExamDTO = {
  id: string;
  area: string;
  date: Date;
  userId: string;
  questions: QuestionDTO[];
};
