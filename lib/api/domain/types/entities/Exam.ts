import { BaseEntity } from "../BaseEntity";

export interface Exam extends BaseEntity {
  title: string;
  //areas: string[];
  userId: string;
}
