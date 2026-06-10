import { IHistoryRepository } from "../../domain/repositories/IHistoryRepository";
import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";
import { History } from "../../domain/types/entities/History";

export default class HistoryRepository implements IHistoryRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getExamHistory(examId: string): Promise<History | null> {
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
