import { BaseEntity } from "../BaseEntity";

export interface Alternative extends BaseEntity {
  text?: string;
  file?: string;
  isCorrect: boolean;
  questionId: string;
}
