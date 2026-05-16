import "dotenv/config";
import { prisma } from "@/lib/prisma/prisma";
import { PrismaClient, Prisma } from "./prisma/client";

type APIResponse = {
  metadata: any;
  questions: Question[];
};

type Question = {
  title: string;
  index: number;
  discipline: string;
  language: string | null;
  year: number;
  context: string;
  files: string[];
  correctAlternative: string;
  alternativesIntroduction: string;
  alternatives: Alternative[];
};

type Alternative = {
  letter: string;
  text: string | null;
  file: string | null;
  isCorrect: boolean;
};

const enemApiBaseUrl = process.env.ENEM_API_URL;
const YEAR_START = 2009;
const YEAR_END = 2023;
const LIMIT = 200;

async function main() {
  const data: Record<number, Question[]> = {};

  for (let year = YEAR_START; year <= YEAR_END; year++) {
    const response = await fetchQuestions(year);
    const englishResponse = await fetchQuestions(year, "ingles");

    data[year] = response.questions;
    data[year].splice(5, 5, ...englishResponse.questions);
  }

  //console.dir(data, { depth: null });

  for (let year = YEAR_START; year <= YEAR_END; year++) {
    //console.dir(data[year], { depth: null });
    const questions = data[year];

    console.log(
      `Iniciando inserção de ${questions.length} questões do ano ${year}...`,
    );

    for (let question of questions) {
      try {
        const questionPayload = mapQuestionPayload(question);
        await prisma.questions.create({ data: questionPayload });
      } catch (error) {
        console.error(
          `Erro ao inserir a questão index ${question.index} do ano ${year}:`,
          error,
        );
      }
    }
  }
}

function mapQuestionPayload(question: Question): Prisma.QuestionsCreateInput {
  return {
    discipline: question.discipline,
    index: question.index,
    context: question.context,
    alternativesIntroduction: question.alternativesIntroduction,
    year: question.year,
    language: question.language,
    title: question.title,
    alternatives: {
      create: question.alternatives.map((alternative) => ({
        text: alternative.text,
        isCorrect: alternative.isCorrect,
        imagePath: alternative.file,
      })),
    },
    images: {
      create: question.files.map((image) => ({
        path: image,
      })),
    },
  };
}

async function fetchQuestions(
  year: number,
  language?: "ingles" | "espanhol",
): Promise<APIResponse> {
  let response = await fetch(
    `${enemApiBaseUrl}/exams/${year}/questions?limit=${LIMIT}`,
  );

  if (language) {
    if (year >= 2017) {
      response = await fetch(
        `${enemApiBaseUrl}/exams/${year}/questions?limit=5&language=${language}`,
      );
    }
  }

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar questões do ano ${year}: ${response.statusText}`,
    );
  }

  return await response.json();
}

main();
