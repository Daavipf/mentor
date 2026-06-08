import { AlternativeComplete, IAlternative } from "./AlternativeDTO";

export interface QuestionDTO {
  id: string;
  title: string | null;
  index: number;
  area: string;
  language: string | null;
  year: number;
  context: string | null;
  alternativesIntroduction: string | null;
  files: string[];
  alternatives: IAlternative[];
}

export interface QuestionResultDTO extends Omit<QuestionDTO, "alternatives"> {
  alternatives: AlternativeComplete[];
}
