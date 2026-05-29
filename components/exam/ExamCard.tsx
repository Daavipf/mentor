import { ExamCardDTO } from "@/lib/api/types/ExamCardDTO";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  exam: ExamCardDTO;
}

export default function ExamCard({ exam }: Props) {
  function getBadge(): ReactNode {
    if (exam.finishedAt !== null) {
      return (
        <Badge className="bg-emerald-500 dark:bg-emerald-800">
          <p className="text-emerald-800 dark:text-emerald-200">Concluído</p>
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-amber-500 dark:bg-amber-800">
          <p className="text-amber-800 dark:text-amber-200">Pendente</p>
        </Badge>
      );
    }
  }

  function formatDate(date: Date): string {
    if (!date) return "N/A";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${day}/${month}`;
  }

  function getUrl(): string {
    if (exam.finishedAt == null) {
      return `/dashboard/exams/${exam.id}`;
    } else {
      return `/dashboard/exams/result/${exam.id}`;
    }
  }

  return (
    <Link href={getUrl()}>
      <Card>
        <CardHeader>
          <CardTitle>{exam.title}</CardTitle>
          <CardDescription>{getBadge()}</CardDescription>
          <CardAction>
            <div className="flex gap-1 items-center">
              <Calendar size={20} />
              <p className="text-sm">{formatDate(new Date(exam.date))}</p>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div className="flex flex-wrap gap-1 max-w-4/5">
              {exam.areas.map((area) => (
                <Badge key={area} className="bg-zinc-300 dark:bg-zinc-700">
                  <p className="text-black dark:text-zinc-300">{area}</p>
                </Badge>
              ))}
            </div>
            <p className="text-lg">{exam.rightQuestions ? `${exam.rightQuestions}/${exam.questions}` : "N/A"}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
