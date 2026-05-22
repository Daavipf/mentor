import ExamsRepository from "./exams/repository";
import QuestionsRepository from "./questions/repository";
import ExamsService from "./exams/service";

import { prisma } from "@/lib/prisma/prisma";
import AuthService from "./auth/service";
import UsersRepository from "./users/repository";

const questionsRepository = new QuestionsRepository(prisma);
const examsRepository = new ExamsRepository(prisma, questionsRepository);
const usersRepository = new UsersRepository(prisma);

const examsService = new ExamsService(examsRepository);

const authService = new AuthService(usersRepository);

export { examsService, authService };
