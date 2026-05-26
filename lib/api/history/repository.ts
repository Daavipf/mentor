import { IHistoryRepository } from "./interface";
import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";

export default class HistoryRepository implements IHistoryRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getExamHistory(examId: string): Promise<Prisma.HistoryModel | null> {
    try {
      return this.prisma.history.findFirst({
        where: { examId },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
