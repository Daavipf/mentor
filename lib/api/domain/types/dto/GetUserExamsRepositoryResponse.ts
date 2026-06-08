export interface GetUserExamsRepositoryResponse {
  id: string;
  userId: string;
  date: Date;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  areas: {
    area: string;
  }[];
  questions: {
    gotRight: boolean | null;
  }[];
  histories: {
    finishedAt: Date | null;
  }[];
}
