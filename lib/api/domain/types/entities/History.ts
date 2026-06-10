import { BaseEntity } from "../BaseEntity";

export interface History extends BaseEntity {
  userId: string;
  examId: string;
  score: number | null;
  finishedAt: Date | null;
}
