import { BaseEntity } from "../BaseEntity";

export interface Question extends BaseEntity {
  title: string | null;
  index: number;
  area: string;
  discipline: string | null;
  topics: string[] | null;
  language: string | null;
  year: number;
  context: string | null;
  alternativesIntroduction: string | null;
  files: string[];
}
