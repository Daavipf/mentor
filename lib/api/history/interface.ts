import { Prisma } from "@/lib/prisma/prisma/client";

export interface IHistoryRepository {
  getExamHistory(examId: string): Promise<Prisma.HistoryModel | null>;
}
