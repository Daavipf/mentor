import { AlternativeComplete, IAlternative } from "./AlternativeDTO";

export type QuestionDTO = {
  id: string;
  title: string | null;
  index: number;
  area: string;
  language: string | null;
  year: number;
  context: string | null;
  alternativesIntroduction: string | null;
  alternatives: IAlternative[];
};

export interface QuestionResultDTO extends Omit<QuestionDTO, 'alternatives'>{
  alternatives: AlternativeComplete[]
}