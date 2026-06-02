import { examsService } from "@/lib/api/main";
import Link from "next/link";
import { redirect } from "next/navigation";
import ResultViewer from "@/components/exam/ResultViewer";
import ConfirmDeleteDialog from "@/components/dialog/confirmDelete";
import { ArrowLeft } from "lucide-react";

export default async function ExamResultsPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  const examId = resolvedParams.id;

  const [exam, selectedAlternatives] = await examsService.getExamResults(examId);

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

  const isComplete = await examsService.isExamComplete(examId);
  if (!isComplete) {
    redirect(`/dashboard/exams/${examId}`);
  }

  return (
    <section className="min-h-full flex flex-col p-4 gap-6 bg-zinc-100 dark:bg-zinc-950">
      <div className="w-full flex justify-between">
        <Link href="/dashboard/exams">
          <ArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl">{exam.title}</h1>
      </div>

      <ResultViewer questions={exam.questions} userAnswers={selectedAlternatives} />

      <ConfirmDeleteDialog examId={examId} />
    </section>
  );
}
