import ExamsRepository from "@/lib/api/infra/repositories/ExamsRepository";
import QuestionsRepository from "@/lib/api/infra/repositories/QuestionRepository";
import UsersRepository from "@/lib/api/infra/repositories/UsersRepository";
import HistoryRepository from "@/lib/api/infra/repositories/HistoryRepository";

import ExamsService from "@/lib/api/services/ExamsService";
import AuthService from "@/lib/api/services/AuthService";

import { prisma } from "@/lib/prisma/prisma";

const questionsRepository = new QuestionsRepository(prisma);
const examsRepository = new ExamsRepository(prisma, questionsRepository);
const usersRepository = new UsersRepository(prisma);
const historyRepository = new HistoryRepository(prisma);

const examsService = new ExamsService(examsRepository, questionsRepository, historyRepository);

const authService = new AuthService(usersRepository);

export { examsService, authService };
