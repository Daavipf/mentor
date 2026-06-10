"use client";

import { useState } from "react";
import { deleteExamAction } from "@/lib/api/actions/ExamActions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default function ConfirmDeleteDialog({ examId }: { examId: string }) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();

    setIsDeleting(true);

    try {
      const result = await deleteExamAction(examId);

      if (!result.success) {
        toast.error(result.error);
      }
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }

      console.error(error);
      toast.error("Ocorreu um erro ao deletar a prova.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Deletar Prova</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            {isDeleting ? "Deletando..." : "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
