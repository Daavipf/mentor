import { examsService } from "@/lib/api/main";
import Link from "next/link";
import ResultViewer from "@/components/exam/ResultViewer";
import { redirect } from "next/navigation";

export default async function ExamResultsPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  const examId = resolvedParams.id;

  // Busca a prova já corrigida, com as flags isCorrect e as escolhas do usuário
  const [exam, selectedAlternatives] = await examsService.getExamResults(examId);

  if (!exam) {
    return <div style={{ padding: "20px" }}>Prova não encontrada.</div>;
  }

  const isComplete = await examsService.isExamComplete(examId);
  if (!isComplete) {
    redirect(`/dashboard/exams/${examId}`);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/dashboard" style={{ color: "blue", textDecoration: "none" }}>
        &larr; Voltar para o Dashboard
      </Link>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h1 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>Resultados da Prova</h1>
        <p style={{ margin: "5px 0", color: "#555" }}>
          <strong>ID da Prova:</strong> {examId}
        </p>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* Renderiza o visualizador de resultados */}
      <ResultViewer questions={exam.questions} userAnswers={selectedAlternatives} />
    </div>
  );
}
