"use client";
import { handleLogin } from "@/lib/api/auth/actions";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Criando cont..." : "Entrar"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(handleLogin, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input type="email" name="email" placeholder="E-mail" required />
      <input type="password" name="password" placeholder="Senha" required />
      <SubmitButton />
    </form>
  );
}
