export default async function ExamResultsPage({ params }: { params: Promise<{ id: string }> | { id: string } }){
    const resolvedParams = await params;
    const examId = resolvedParams.id;
    
    return(
        <div>
            <h1>Acompanhe os resultados da sua prova</h1>
            <h2>Prova: {examId}</h2>
        </div>
    )
}