import Link from "next/link";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import { examsService } from "@/lib/api/main";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "@/components/dialog/confirmDelete";

export default async function ExamsListPage() {
  // 1. Pega e valida a sessão
  const cookieStore = await cookies(); // Use 'await' se estiver no Next.js 15
  const token = cookieStore.get("session")?.value;
  const payload = token ? verifyJwt(token) : null;

  if (!payload || !payload.userId) {
    return <div style={{ padding: "20px" }}>Houve um erro ao ver suas provas.</div>;
  }

  // 2. Busca as provas do usuário
  // Assuma que você vai criar um método parecido com esse no seu service
  const exams = await examsService.getUserExams(payload.userId);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Minhas Provas</h1>
      <Link href="/dashboard/exams/create">Nova Prova</Link>

      {exams.length === 0 ? (
        <p>Você ainda não gerou nenhuma prova.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {exams.map((exam) => (
            <li key={exam.id} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
              <Link href={`/dashboard/exams/${exam.id}`} style={{ textDecoration: "none", color: "blue" }}>
                <strong>Prova ID:</strong> {exam.id}
                {/* Se você tiver um campo de data, coloque aqui ex: {new Date(exam.createdAt).toLocaleDateString()} */}
              </Link>
              <ConfirmDeleteDialog examId={exam.id} />
            </li>
          ))}
        </ul>
      )}
      <Link href="/dashboard/">Voltar</Link>
    </div>
  );
}
