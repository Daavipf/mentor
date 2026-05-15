import { prisma } from "@/lib/prisma/prisma";

async function createUser() {
  const user = await prisma.user.create({
    data: {
      email: "suki@emi.com",
      name: "Suki",
    },
  });

  console.log("Criou um user: ", user.id);
}

export async function example() {
  //await createUser();

  const data = await prisma.user.findFirst({
    where: { email: "suki@emi.com" },
  });

  if (!data) throw Error("Não encontrado");

  return data?.name;
}
