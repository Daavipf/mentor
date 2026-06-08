import { BaseEntity } from "../BaseEntity";

export interface ExamArea extends BaseEntity {
  examId: string;
  area: string;
}
