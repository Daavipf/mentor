import ExamsRepository from "./exams/repository";
import QuestionsRepository from "./questions/repository";
import ExamsService from "./exams/service";

import { prisma } from "@/lib/prisma/prisma";

const questionsRepository = new QuestionsRepository(prisma);
const examsRepository = new ExamsRepository(prisma, questionsRepository);

const examsService = new ExamsService(examsRepository);

export { examsService };
