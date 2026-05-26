import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import { examsService } from "@/lib/api/main";
import Link from "next/link";
import { ExamDTO } from "@/lib/api/types/ExamDTO";
import ExamViewer from "@/components/exam/ExamViewer"; // Importando o Client Component

export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  const examId = resolvedParams.id;

  // 1. Validação de usuário
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const payload = token ? verifyJwt(token) : null;

  if (!payload || !payload.userId) {
    return <div style={{ padding: "20px" }}>Houve um erro ao buscar a prova. Permissão negada.</div>;
  }

  // 2. Busca os detalhes da prova
  const exam: ExamDTO = await examsService.getExam(examId);

  if (!exam) {
    return <div style={{ padding: "20px" }}>Prova não encontrada.</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/dashboard/exams" style={{ color: "blue", textDecoration: "none" }}>
        &larr; Voltar para minhas provas
      </Link>

      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h1 style={{ margin: "0 0 10px 0" }}>Prova: {exam.id}</h1>
        <p style={{ margin: "5px 0" }}>
          <strong>Data de Criação:</strong> {new Date(exam.date).toLocaleDateString("pt-BR")}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Áreas:</strong> {exam.areas.join(", ")}
        </p>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* Renderização Interativa das Questões */}
      <ExamViewer questions={exam.questions} examId={exam.id} />
    </div>
  );
}
