export interface IAlternative{
  id: string;
  text: string | null;
  file: string | null;
}

// interseção de tipos
export type AlternativeComplete = IAlternative &  {
  isCorrect: boolean
};
