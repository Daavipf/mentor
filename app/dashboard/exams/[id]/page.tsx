import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import { examsService } from "@/lib/api/main";
import Link from "next/link";
import { ExamDTO } from "@/lib/api/types/ExamDTO";
import ExamViewer from "@/components/exam/ExamViewer";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  const examId = resolvedParams.id;

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const payload = token ? verifyJwt(token) : null;

  if (!payload || !payload.userId) {
    return <div style={{ padding: "20px" }}>Houve um erro ao buscar a prova. Permissão negada.</div>;
  }

  const isComplete = await examsService.isExamComplete(examId);
  if (isComplete) {
    redirect(`/dashboard/exams/result/${examId}`);
  }

  const exam: ExamDTO = await examsService.getExam(examId);

  if (!exam) {
    return (
      <section className="h-full flex flex-col p-4 gap-6 bg-zinc-100 dark:bg-zinc-950">
        <div className="w-full flex justify-between">
          <Link href="/dashboard/exams">
            <ArrowLeft size={28} />
          </Link>
        </div>
        <div style={{ padding: "20px" }}>Prova não encontrada.</div>;
      </section>
    );
  }

  return (
    <section className="min-h-full flex flex-col p-4 gap-6 bg-zinc-100 dark:bg-zinc-950">
      <div className="w-full flex justify-between">
        <Link href="/dashboard/exams">
          <ArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl">{exam.title}</h1>
      </div>

      <ExamViewer questions={exam.questions} examId={exam.id} />
    </section>
  );
}
