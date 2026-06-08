import { BaseEntity } from "../BaseEntity";

export interface QuestionOnExam extends BaseEntity {
  examId: string;
  questionId: string;
  userSelectedAlternative?: string;
  gotRight?: boolean;
}
