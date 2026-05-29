import ExamsForm from "@/components/forms/exams-form/examsForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateExamsPage() {
  return (
    <section className="h-full flex flex-col p-4 gap-6 bg-zinc-100 dark:bg-zinc-950">
      <div className="w-full flex justify-between">
        <Link href="/dashboard">
          <ArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl">Criar Nova Prova</h1>
      </div>
      <ExamsForm />
    </section>
  );
}
