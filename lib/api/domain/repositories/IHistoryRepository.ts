import { History } from "@/lib/api/domain/types/entities/History";

export interface IHistoryRepository {
  getExamHistory(examId: string): Promise<History | null>;
}
