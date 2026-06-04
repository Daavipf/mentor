import Link from "next/link";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import { examsService } from "@/lib/api/main";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExamCard from "@/components/exam/ExamCard";
import { ExamCardDTO } from "@/lib/api/types/ExamCardDTO";

export default async function ExamsListPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const payload = token ? verifyJwt(token) : null;

  if (!payload || !payload.userId) {
    return <div style={{ padding: "20px" }}>Houve um erro ao ver suas provas.</div>;
  }

  const exams: ExamCardDTO[] = await examsService.getUserExams(payload.userId, 1, 10);

  return (
    <section className="h-full flex flex-col p-4 gap-6 bg-zinc-100 dark:bg-zinc-950">
      <div className="w-full flex justify-between">
        <Link href="/dashboard">
          <ArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl">Minhas Provas</h1>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {exams.length === 0 ? (
            <h2>Você ainda não criou nenhuma prova</h2>
          ) : (
            exams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
          )}
        </div>
      </div>
      <Link className="mt-auto w-full" href="/dashboard/exams/create">
        <Button className="w-full" size="lg">
          Nova Prova
        </Button>
      </Link>
    </section>
  );
}
