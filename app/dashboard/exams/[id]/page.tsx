import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import { examsService } from "@/lib/api/main";
import Link from "next/link";
import { ExamDTO } from "@/lib/api/types/ExamDTO";

export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params;
  const examId = resolvedParams.id;

  // 1. Validação de usuário
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const payload = token ? verifyJwt(token) : null;

  if (!payload || !payload.userId) {
    return <div style={{ padding: "20px" }}>Houve um erro ao buscar a prova.</div>;
  }

  // 2. Busca os detalhes da prova (que agora retorna o seu ExamDTO)
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

      {/* Renderização das Questões */}
      {exam.questions && exam.questions.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {exam.questions.map((question) => (
            <div key={question.id} style={{ borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
              {/* Cabeçalho da Questão */}
              <div
                style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <h3 style={{ margin: 0 }}>Questão {question.index}</h3>
                <span style={{ fontSize: "12px", background: "#e0e0e0", padding: "4px 8px", borderRadius: "12px" }}>
                  {question.area} {question.language && `(${question.language})`} • {question.year}
                </span>
              </div>

              {/* Título (se houver) */}
              {question.title && <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>{question.title}</h4>}

              {/* Contexto (Texto base da questão) */}
              {question.context && (
                <p style={{ whiteSpace: "pre-wrap", textAlign: "justify", marginBottom: "15px" }}>{question.context}</p>
              )}

              {/* Introdução às alternativas (ex: "A partir da leitura do texto, infere-se que:") */}
              {question.alternativesIntroduction && (
                <p style={{ fontWeight: "bold", marginBottom: "15px" }}>{question.alternativesIntroduction}</p>
              )}

              {/* Alternativas */}
              {question.alternatives && (
                <ol
                  style={{
                    listStyleType: "upper-alpha",
                    paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {question.alternatives.map((alt) => (
                    <li
                      key={alt.id}
                      style={{
                        padding: "8px",
                        backgroundColor: "#fafafa",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    >
                      {alt.text && <span>{alt.text}</span>}

                      {/* Caso a alternativa seja uma imagem (file) ao invés de texto */}
                      {alt.file && (
                        <div style={{ marginTop: alt.text ? "10px" : "0" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={alt.file}
                            alt="Alternativa visual"
                            style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain" }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma questão encontrada para esta prova.</p>
      )}
    </div>
  );
}
