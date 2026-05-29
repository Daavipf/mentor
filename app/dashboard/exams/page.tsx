import Link from "next/link";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/api/auth/util";
import { examsService } from "@/lib/api/main";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "@/components/dialog/confirmDelete";
import ExamCard from "@/components/exam/ExamCard";
import { ExamCardDTO } from "@/lib/api/types/ExamCardDTO";

export default async function ExamsListPage() {
  // 1. Pega e valida a sessão
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const payload = token ? verifyJwt(token) : null;

  if (!payload || !payload.userId) {
    return <div style={{ padding: "20px" }}>Houve um erro ao ver suas provas.</div>;
  }

  // 2. Busca a lista básica de provas do usuário
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
        <div className="flex justify-between items-end">
          <h2 className="text-lg">Provas</h2>
          <Link href="/dashboard/exams" className="text-sm underline font-semibold">
            Ver tudo
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
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

// export default async function ExamsListPage() {
//   // 1. Pega e valida a sessão
//   const cookieStore = await cookies();
//   const token = cookieStore.get("session")?.value;
//   const payload = token ? verifyJwt(token) : null;

//   if (!payload || !payload.userId) {
//     return <div style={{ padding: "20px" }}>Houve um erro ao ver suas provas.</div>;
//   }

//   // 2. Busca a lista básica de provas do usuário
//   const exams = await examsService.getUserExams(payload.userId);

//   // 3. Enriquece a lista com o status de conclusão resolvendo todas as Promises de uma vez
//   const examsWithStatus = await Promise.all(
//     exams.map(async (exam) => {
//       const isComplete = await examsService.isExamComplete(exam.id);
//       return { ...exam, isComplete };
//     }),
//   );

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>Minhas Provas</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <Link
//           href="/dashboard/exams/create"
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#000",
//             color: "#fff",
//             textDecoration: "none",
//             borderRadius: "4px",
//           }}
//         >
//           Nova Prova
//         </Link>
//       </div>

//       {examsWithStatus.length === 0 ? (
//         <p>Você ainda não gerou nenhuma prova.</p>
//       ) : (
//         <ul style={{ listStyleType: "none", padding: 0 }}>
//           {examsWithStatus.map((exam) => {
//             // Define a URL de destino com base no status de conclusão
//             const targetUrl = exam.isComplete
//               ? `/dashboard/exams/result/${exam.id}` // Link para ver os resultados
//               : `/dashboard/exams/${exam.id}`; // Link para responder a prova

//             return (
//               <li
//                 key={exam.id}
//                 style={{
//                   margin: "10px 0",
//                   padding: "15px",
//                   border: "1px solid #ccc",
//                   borderRadius: "8px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div>
//                   <Link
//                     href={targetUrl}
//                     style={{
//                       textDecoration: "none",
//                       color: "blue",
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "5px",
//                     }}
//                   >
//                     <strong>Prova ID: {exam.id}</strong>

//                     {/* Indicador visual de status amigável para o usuário */}
//                     <span
//                       style={{
//                         fontSize: "12px",
//                         padding: "4px 8px",
//                         borderRadius: "12px",
//                         width: "fit-content",
//                         backgroundColor: exam.isComplete ? "#e6ffed" : "#fff3cd",
//                         color: exam.isComplete ? "#055016" : "#856404",
//                         border: `1px solid ${exam.isComplete ? "#2ea043" : "#ffeeba"}`,
//                       }}
//                     >
//                       {exam.isComplete ? "✓ Concluída (Ver Resultados)" : "⏳ Pendente (Continuar)"}
//                     </span>
//                   </Link>
//                 </div>

//                 <ConfirmDeleteDialog examId={exam.id} />
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       <div style={{ marginTop: "20px" }}>
//         <Link href="/dashboard/" style={{ color: "#555" }}>
//           &larr; Voltar
//         </Link>
//       </div>
//     </div>
//   );
// }
