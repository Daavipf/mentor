import { AlternativeDTO } from "./AlternativeDTO";

export type QuestionDTO = {
  id: string;
  title: string | null;
  index: number;
  area: string;
  language: string | null;
  year: number;
  context: string | null;
  alternativesIntroduction: string | null;
  alternatives: AlternativeDTO[];
};
