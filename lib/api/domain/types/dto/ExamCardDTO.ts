export interface ExamCardDTO {
  id: string;
  title: string;
  date: string;
  finishedAt: string | null;
  areas: string[];
  questions: number;
  rightQuestions: number | null;
}
