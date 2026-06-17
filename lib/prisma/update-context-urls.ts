import "dotenv/config";
import { prisma } from "@/lib/prisma/prisma";
import { replaceMarkdownImageUrls } from "@/util/replaceMarkdownImageUrl";

const imagePathTemplate = process.env.IMAGE_PATH_TEMPLATE;
const BATCH_SIZE = 100;

async function main() {
  console.log("Buscando questões cadastradas no banco de dados...");

  const questions = await prisma.questions.findMany({
    select: {
      id: true,
      context: true,
    },
  });

  console.log(`Total de ${questions.length} questões encontradas. Iniciando varredura...`);
  let updatedCount = 0;

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (question) => {
        try {
          const originalContext = question.context;

          if (!originalContext) return;

          const updatedContext = replaceMarkdownImageUrls(originalContext, imagePathTemplate);

          if (originalContext !== updatedContext) {
            await prisma.questions.update({
              where: {
                id: question.id,
              },
              data: {
                context: updatedContext,
              },
            });
            updatedCount++;
          }
        } catch (error) {
          console.error(`Erro ao atualizar o registro ID ${question.id}:`, error);
        }
      }),
    );

    console.log(`Progresso: ${Math.min(i + BATCH_SIZE, questions.length)} / ${questions.length} questões verificadas.`);
  }

  console.log(`\n==================================================`);
  console.log(`Migração concluída!`);
  console.log(`Total de enunciados modificados no banco: ${updatedCount}`);
  console.log(`==================================================`);
}

main()
  .catch((error) => {
    console.error("Erro crítico durante a execução da migração:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
