import { ExamDTO } from "../types/ExamDTO";
import { QuestionDTO } from "../types/QuestionDTO";
import { IExamsRepository, IExamsService } from "./interface";

export default class ExamsService implements IExamsService {
  examsRepository: IExamsRepository;

  constructor(examsRepository: IExamsRepository) {
    this.examsRepository = examsRepository;
  }

  async createExam(questionsAmount: number, userId: string, area: string): Promise<ExamDTO> {
    const [exam, questions, alternatives] = await this.examsRepository.createExam(questionsAmount, userId, area);

    const questionsDTO: QuestionDTO[] = questions.map((q) => {
      const qAlternatives = alternatives.filter((a) => a.questionId === q.id);

      return {
        id: q.id,
        area: area,
        alternativesIntroduction: q.alternativesIntroduction,
        year: q.year,
        context: q.context,
        index: q.index,
        language: q.language,
        title: q.title,
        alternatives: qAlternatives.map((alt) => ({
          id: alt.id,
          text: alt.text,
          file: alt.imagePath,
        })),
      };
    });
    return {
      id: exam.id,
      area: exam.area,
      date: exam.date,
      questions: questionsDTO,
      userId,
    };
  }
}
