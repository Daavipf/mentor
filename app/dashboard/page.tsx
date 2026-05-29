import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import Link from "next/link";

import { User } from "lucide-react";
import ExamCard from "@/components/exam/ExamCard";
import { Button } from "@/components/ui/button";
import { ExamCardDTO } from "@/lib/api/types/ExamCardDTO";
import { examsService } from "@/lib/api/main";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const user = token ? verifyJwt(token) : null;

  const exams: ExamCardDTO[] = await examsService.getUserExams(user.id, 1, 10);

  return (
    <section className="h-full flex flex-col p-4 gap-6 bg-zinc-100 dark:bg-zinc-950">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl">
          Bem-vindo, <strong>{user?.name}</strong>!
        </h1>
        <Link
          href="/dashboard/settings"
          className="border border-zinc-600 dark:border-zinc-500 p-1 rounded-full flex justify-center items-center"
        >
          <User size={28} />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-lg">Provas</h2>
          <Link href="/dashboard/exams" className="text-sm underline font-semibold">
            Ver tudo
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {exams.map((exam) => (
            <ExamCard exam={exam} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <h2 className="text-lg">Desempenho</h2>
          <Link href="/dashboard/exams" className="text-sm underline font-semibold">
            Ver tudo
          </Link>
        </div>
        <div className="flex flex-col gap-2">Em desenvolvimento...</div>
      </div>

      <Link className="mt-auto w-full" href="/dashboard/exams/create">
        <Button className="w-full" size="lg">
          Nova Prova
        </Button>
      </Link>
    </section>
  );
}
