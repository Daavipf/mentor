export type CreateExamPayload = {
  areas: Record<string, number>;
  year: number | null;
  title: string;
};
