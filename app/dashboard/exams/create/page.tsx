import ExamsForm from "@/components/forms/exams-form/examsForm";
import Link from "next/link";

export default function CreateExamsPage() {
  return (
    <div>
      <h1>Página de provas</h1>
      <ExamsForm />
      <Link href="/dashboard/exams">Voltar</Link>
    </div>
  );
}
