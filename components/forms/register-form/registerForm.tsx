"use client";
import { handleRegister } from "@/lib/api/auth/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Mail, Eye, User } from "lucide-react";
import SubmitButton from "../SubmitButton";

export default function RegisterForm() {
  const [state, formAction] = useActionState(handleRegister, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <InputGroup>
        <InputGroupInput name="name" type="text" placeholder="Seu nome" required />
        <InputGroupAddon align="inline-end">
          <User />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput name="email" type="email" placeholder="Seu e-mail" required />
        <InputGroupAddon align="inline-end">
          <Mail />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput name="password" type="password" placeholder="Sua senha" required />
        <InputGroupAddon align="inline-end">
          <Eye />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput name="confirmPassword" type="password" placeholder="Confirme a senha" required />
        <InputGroupAddon align="inline-end">
          <Eye />
        </InputGroupAddon>
      </InputGroup>
      <SubmitButton title="Entrar" alternative="Criando conta..." />
    </form>
  );
}
