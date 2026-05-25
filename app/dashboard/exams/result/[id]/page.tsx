import { examsService } from "@/lib/api/main";
import { ExamDTO } from "@/lib/api/types/ExamDTO";

export default async function ExamResultsPage({ params }: { params: Promise<{ id: string }> | { id: string } }){
    const resolvedParams = await params;
    const examId = resolvedParams.id;

    const exam: ExamDTO = await examsService.getExamResults(examId);
    
      if (!exam) {
        return <div style={{ padding: "20px" }}>Prova não encontrada.</div>;
      }
    
    return(
        <div>
            <h1>Acompanhe os resultados da sua prova</h1>
            <h2>Prova: {examId}</h2>
        </div>
    )
}