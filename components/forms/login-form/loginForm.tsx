"use client";
import { handleLogin } from "@/lib/api/auth/actions";
import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";
import { Mail, Eye, EyeOff } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import StateButton from "@/components/buttons/StateButton";

export default function LoginForm() {
  const [state, formAction] = useActionState(handleLogin, null);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
      <StateButton type="submit" size="lg" title="Entrar" alternative="Fazendo Login..." />
    </form>
  );
}
