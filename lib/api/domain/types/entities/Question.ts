import { BaseEntity } from "../BaseEntity";

export interface Question extends BaseEntity {
  title?: string;
  index: number;
  area: string;
  discipline?: string;
  topics?: string[];
  language?: string;
  year: number;
  context?: string;
  alternativesIntroduction?: string;
  files: string[];
}
