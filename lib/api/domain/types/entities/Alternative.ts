import { BaseEntity } from "../BaseEntity";

export interface Alternative extends BaseEntity {
  text: string | null;
  file: string | null;
  isCorrect: boolean;
  questionId: string;
}
