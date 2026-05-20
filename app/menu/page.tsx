import { examsService } from "@/lib/api/main";
import { ExamDTO } from "@/lib/api/types/ExamDTO";

// 2. Função de busca (roda no servidor)
async function fetchData(questionsAmount: number, userId: string, area: string): Promise<ExamDTO> {
  return await examsService.createExam(questionsAmount, userId, area);
}

// 3. Componente de Página Assíncrono (Server Component)
export default async function TestExamPage() {
  let examData: ExamDTO | null = null;
  let errorMessage: string | null = null;

  try {
    // Executa a chamada diretamente na renderização do servidor
    examData = await fetchData(5, "123", "linguagens");
  } catch (err: any) {
    errorMessage = err.message || "Erro desconhecido ao criar simulado.";
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>Teste de Criação de Simulado</h1>

      {/* Exibição de Erro, se houver */}
      {errorMessage && (
        <div
          style={{ backgroundColor: "#1e1e1e", color: "#900", padding: "1rem", borderRadius: "4px", margin: "1rem 0" }}
        >
          <strong>Erro:</strong> {errorMessage}
        </div>
      )}

      {/* Exibição dos Dados com Sucesso */}
      {examData ? (
        <div>
          <section style={{ marginBottom: "2rem", backgroundColor: "1e1e1e", padding: "1rem", borderRadius: "6px" }}>
            <h2>Resumo do Simulado</h2>
            <p>
              <strong>ID do Simulado:</strong> {examData.id}
            </p>
            <p>
              <strong>Área:</strong> {examData.area}
            </p>
            <p>
              <strong>ID do Usuário:</strong> {examData.userId}
            </p>
            <p>
              <strong>Data:</strong> {new Date(examData.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Total de Questões Retornadas:</strong> {examData.questions?.length || 0}
            </p>
          </section>

          <h2>Questões Retornadas</h2>
          {examData.questions && examData.questions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {examData.questions.map((question) => (
                <div key={question.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "6px" }}>
                  <h3>
                    Questão {question.index} ({question.year})
                  </h3>
                  {question.title && (
                    <p>
                      <strong>Título:</strong> {question.title}
                    </p>
                  )}
                  {question.context && (
                    <blockquote
                      style={{
                        background: "1e1e1e",
                        padding: "0.5rem 1rem",
                        margin: "1rem 0",
                        borderLeft: "4px solid #0070f3",
                      }}
                    >
                      {question.context}
                    </blockquote>
                  )}
                  {question.alternativesIntroduction && <p>{question.alternativesIntroduction}</p>}

                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {question.alternatives?.map((alt, i) => (
                      <li
                        key={alt.id}
                        style={{ padding: "0.5rem", margin: "0.25rem 0", background: "#1e1e1e", borderRadius: "4px" }}
                      >
                        <strong>{i + 1}:</strong> {alt.text || "[Sem texto/Apenas imagem]"}
                        {alt.file && <span style={{ fontSize: "0.8rem", color: "#666" }}> (Arquivo: {alt.file})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma questão foi anexada a este simulado.</p>
          )}
        </div>
      ) : (
        !errorMessage && <p>Carregando dados do servidor...</p>
      )}
    </div>
  );
}
