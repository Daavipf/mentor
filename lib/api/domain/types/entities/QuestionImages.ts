import { BaseEntity } from "../BaseEntity";

export interface QuestionImage extends BaseEntity {
  questionId: string;
  path: string;
}
